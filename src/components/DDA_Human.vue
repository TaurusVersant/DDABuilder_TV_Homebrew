/**
 * TODO: Temporary Wound Boxes, GM Page
 * on character delete, wound boxes, names, etc are behaving inconsistently
 */
<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<dda_input :textProperty='character.name' inputName='Name' @change='updateProperty($event, "name")'/>
				<dda_input :textProperty='character.type' inputName='Age Group' :disableFlag='true'/>
				<dda_span :textProperty='character.currentPoints + "/" + character.startingPoints' inputName='Creation Points'/>
				<dda_checkbox :textProperty='character.creationComplete' inputName='Creation Complete' @change='updateProperty($event, "creationComplete")'/>
				<dda_stat v-if='character.creationComplete' stat='XP' :value='character.bonusPoints' :total_stat='character.bonusTotal' @changeStat='changeBonus'/><br>
				<dda_span :textProperty='character["Wound Boxes"] + "/" + derivedWoundBoxes' inputName='Wound Boxes'/>
				<dda_woundbox :current='character["Wound Boxes"]' :total='derivedWoundBoxes' @changeHealth='changeHealth'/>
			</div>
			<div className='secondColumn'>
				<p><u>Human Picture</u></p>
				<input type='file' id='files' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image' />
			</div>
		</div>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Attributes</u><span v-if='!character.creationComplete'> | {{character.attributeTotal}}/{{character.areaCap}}</span></p>
				<dda_stat v-for='(value, attribute) in character.attributes' v-bind:key='attribute' :stat='attribute' :value='character.attributes[attribute]' :roll='true' @changeStat='changeAttribute' @rollStat='rollAttribute'/>
				<p><u>Derived Stats</u></p>
				<span v-for='(name, stat) in derivedStats' v-bind:key='name'>
					<dda_span :textProperty='getDerivedStat(stat)' :inputName='name'/>
					<span v-if='["derivedWoundBoxes","derivedAccuracy","derivedDodge"].includes(stat)' class='roller' @click='poolCheck(stat, name)'>🎲</span>
					<br>
				</span>
				<p><u>Special Stats</u></p>
				<dda_stat stat='Sanity Drain' :value='character["Sanity Drain"]' :total_stat='sanityCap' :roll='true' @changeStat='changeSanity' @rollStat='rollSanity'/>
				<dda_stat stat='Inspiration' :value='character.Inspiration' :total_stat='inspirationCap' @changeStat='changeInspiration'/>
			</div>
			<div class='secondColumn'>
				<p><u>Skills</u><span v-if='!character.creationComplete'> | {{character.skillTotal}}/{{character.areaCap}}</span></p>
				<dda_stat v-for='(value, skill) in character.skills' v-bind:key='skill' :stat='skill' :value='character.skills[skill]' :roll='true' @changeStat='changeSkill' @rollStat='rollSkill'/>
			</div>
		</div>
		<p><u>Aspects</u></p>
		<p>
			<label class='textareaLongTag' for='majorAspect'>Major Aspect (+4/-4):</label>
			<dda_textarea :textProperty='character.majorAspect' widthProperty='70' @change='updateProperty($event, "majorAspect")'/>
			<dda_box :current='character.majorUses' :total='1' @change='changeAspect($event, "majorUses")'/>
		</p>
		<p>
			<label class='textareaLongTag' for='minorAspect'>Minor Aspect (+2/-2):</label>
			<dda_textarea :textProperty='character.minorAspect' widthProperty='70' @change='updateProperty($event, "minorAspect")'/>
			<dda_box :current='character.minorUses' :total='2' @change='changeAspect($event, "minorUses")'/>
		</p>
		<p><u>Torments</u></p>
		<p>
			<button type='button' @click="addTorment('Minor')">Add Minor Torment</button>
			<button type='button' @click="addTorment('Major')">Add Major Torment</button>
			<button type='button' @click="addTorment('Terrible')">Add Terrible Torment</button>
		</p>
		<p v-for='(torment, index) in character.torments' v-bind:key='index'>
			<label class='textareaLongTag'>{{torment.type}} Torment:</label>
			<dda_textarea :textProperty='torment.text' widthProperty='70' @change='changeTorment($event, index)'/>
			<span class='deleteButton' @click='deleteTorment(index)'>X</span>
			<dda_box :current='torment.marked' :total='torment.total' :cap='character.creationComplete ? torment.total : character.currentPoints ? torment.startingCap : torment.marked' @change='markTorment($event, index)'/>
		</p>
		<p><u>Additional Details</u></p>
		<dda_textarea :textProperty='character.notes' widthProperty='91' @change='updateProperty($event, "notes")'/>
		<dda_modal ref='modal'/>
	</div>
</template>

<script>
import DDA_Stat from './DDA_Stat';
import DDA_Modal from './DDA_Modal';
import DDA_WoundBox from './DDA_WoundBox';
export default {
	name: 'DDA_Human',
	props: ['data'],
	data: function () {
		return {
			character: {
				name: null,
				creationComplete: false,
				bonusPoints: 0,
				bonusTotal: 0,
				attributes: {
					'Agility': 0,
					'Body': 0,
					'Charisma': 0,
					'Intelligence': 0,
					'Willpower': 0,
				},
				attributeTotal: 0,
				skills: {
					'Evade': 0,
					'Fight': 0,
					'Stealth': 0,
					'Athletics': 0,
					'Endurance': 0,
					'Feats of Strength': 0,
					'Manipulate': 0,
					'Perform': 0,
					'Persuade': 0,
					'Computer': 0,
					'Survival': 0,
					'Knowledge': 0,
					'Perception': 0,
					'Decipher Intent': 0,
					'Bravery': 0,
				},
				skillTotal: 0,
				'Wound Boxes': 2,
				'Sanity Drain': 0,
				'Inspiration': 1,
				majorAspect: null,
				majorUses: 0,
				minorAspect: null,
				minorUses: 0,
				torments: [],
				notes: null,
				image: null,
			},
			derivedStats: {
				derivedWoundBoxes: 'Wound Boxes',
				derivedMovement: 'Movement',
				derivedAccuracy: 'Accuracy',
				derivedDamage: 'Damage',
				derivedDodge: 'Dodge',
				derivedArmor: 'Armor',
			},
			skillMap: {
				'Evade': 'Agility',
				'Fight': 'Agility',
				'Stealth': 'Agility',
				'Athletics': 'Body',
				'Endurance': 'Body',
				'Feats of Strength': 'Body',
				'Manipulate': 'Charisma',
				'Perform': 'Charisma',
				'Persuade': 'Charisma',
				'Computer': 'Intelligence',
				'Survival': 'Intelligence',
				'Knowledge': 'Intelligence',
				'Perception': 'Willpower',
				'Decipher Intent': 'Willpower',
				'Bravery': 'Willpower',
			},
			sanityCheck: {
				humanChild: 9,
				humanTeen: 12,
				humanAdult: 15,
			},
			allowUpdate: true,
		}
	},
	computed: {
		derivedWoundBoxes: function () {
			let woundBoxes = this.character.attributes['Body'] + this.character.skills['Endurance'];
			let woundBoxTotal = woundBoxes > 2 ? woundBoxes : 2;
			return woundBoxTotal;
		},
		derivedMovement: function () {
			return this.character.attributes['Agility'] + this.character.skills['Survival'];
		},
		derivedAccuracy: function () {
			return this.character.attributes['Agility'] + this.character.skills['Fight'];
		},
		derivedDamage: function () {
			return this.character.attributes['Body'] + this.character.skills['Fight'];
		},
		derivedDodge: function () {
			return this.character.attributes['Agility'] + this.character.skills['Evade'];
		},
		derivedArmor: function () {
			return this.character.attributes['Body'] + this.character.skills['Endurance'];
		},
		maxAttribute: function () {
			if (this.character.creationComplete) {
				return this.character.finalCap;
			}

			for (let attribute in this.character.attributes) {
				if (this.character.attributes[attribute] === this.character.startingCap) {
					return this.character.startingCap - 1;
				}
			}
			return this.character.startingCap;
		},
		maxSkill: function () {
			if (this.character.creationComplete) {
				return this.character.finalCap;
			}

			for (let skill in this.character.skills) {
				if (this.character.skills[skill] === this.character.startingCap) {
					return this.character.startingCap - 1;
				}
			}
			return this.character.startingCap;
		},
		sanityCap: function () {
			let cap = (this.character.attributes['Willpower'] > this.character.skills['Bravery'] ? this.character.attributes['Willpower'] : this.character.skills['Bravery']) - 2;
			return cap > 1 ? cap : 1;
		},
		inspirationCap: function () {
			return this.character.attributes['Willpower'] > 1 ? this.character.attributes['Willpower'] : 1;
		},
	},
	watch: {
		character: {
			handler: function () {
				if (this.allowUpdate) {
					this.$emit('updateCharacter', this.character);
				}
				this.allowUpdate = true;
			},
			deep: true,
		},
		data: function () {
			this.allowUpdate = false;
			this.character = Object.assign(this.character, this.data);
		},
		derivedWoundBoxes: function () {
			if (!this.character.loadCharacter) {
				this.$set(this.character, 'Wound Boxes', this.derivedWoundBoxes);
			}
			this.loadCharacter = true;
		},
	},
	methods: {
		/**
		* http://www.onlywebpro.com/2012/01/24/create-thumbnail-preview-of-images-using-html5-api/
		*
		* Refreshes the Pane to display an image when it is uploaded to the screen
		*/
		handleFileSelect (event) {
			var files = event.target.files;
			if (files.length > 0) {
				var f = files[0];
				var reader = new FileReader();

				reader.onload = (function (theFile, character) {
					return function (e) {
						character.image = e.target.result;
					};
				})(f, this.character);

				reader.readAsDataURL(f);
			}
		},
		/**
		* Getters
		*/
		getDerivedStat: function (stat) {
			return this[stat];
		},
		rollAttribute: function (attribute) {
			this.$refs.modal.activateModal(attribute + ' Roll: 3d6+' + this.character.attributes[attribute]);
		},
		rollSkill: function (skill) {
			let modifier = this.character.skills[skill] + this.character.attributes[this.skillMap[skill]]
			this.$refs.modal.activateModal(skill + ' Roll: 3d6+' + modifier);
		},
		rollSanity: function () {
			let modifier = this.character.skills['Bravery'] + this.character.attributes['Willpower'];
			let targetNumber = this.sanityCheck[this.character.stage] + (this.character['Sanity Drain'] * 2);

			this.$refs.modal.activateModal('Sanity Roll: 3d6+' + modifier + ', Sanity TN: ' + targetNumber);
		},
		poolCheck: function (stat, name) {
			this.$refs.modal.activateModal(name + ' Pool Check: ' + this[stat] + 'd6, [Roll20: ' + this[stat] + 'd6>5]');
		},
		/**
		* Changers
		*/
		changeBonus: function (attribute, modifier) {
			if (modifier) {
				this.character.bonusPoints++;
				this.character.bonusTotal++;
			} else if (!modifier && this.character.bonusPoints > 0) {
				this.character.bonusPoints--;
				this.character.bonusTotal--;
			}
		},
		changeAttribute: function (attribute, modifier) {
			if (this.character.creationComplete) {
				let cost = 2 * (this.character.attributes[attribute] + modifier);
				if (
					modifier &&
					this.character.bonusPoints >= cost &&
					this.character.attributes[attribute] < this.maxAttribute
				) {
					this.character.attributes[attribute]++;
					this.character.bonusPoints -= cost;
				} else if (!modifier && this.character[attribute] > 0) {
					this.character.attributes[attribute]--;
					this.character.bonusPoints += cost;
				}
			} else {
				if (
					modifier &&
					this.character.currentPoints > 0 &&
					this.character.attributeTotal !== this.character.areaCap &&
					this.character.attributes[attribute] < this.maxAttribute
				) {
					this.character.attributes[attribute]++;
					this.character.attributeTotal++;
					this.character.currentPoints--;
				} else if (!modifier && this.character.attributes[attribute] > 0) {
					this.character.attributeTotal--;
					this.character.attributes[attribute]--;
					this.character.currentPoints++;
				}
			}
		},
		changeSkill: function (skill, modifier) {
			if (this.character.creationComplete) {
				let cost = this.character.skills[skill] + modifier;
				if (
					modifier &&
					this.character.bonusPoints >= cost &&
					this.character.skills[skill] < this.maxSkill
				) {
					this.character.skills[skill]++;
					this.character.bonusPoints -= cost;
				} else if (!modifier && this.character.skills[skill] > 0) {
					this.character.skills[skill]--;
					this.character.bonusPoints += cost;
				}
			} else {
				if (
					modifier &&
					this.character.currentPoints > 0 &&
					this.character.skillTotal !== this.character.areaCap &&
					this.character.skills[skill] < this.maxSkill
				) {
					this.character.skills[skill]++;
					this.character.skillTotal++;
					this.character.currentPoints--;
				} else if (!modifier && this.character.skills[skill] > 0) {
					this.character.skillTotal--;
					this.character.skills[skill]--;
					this.character.currentPoints++;
				}
			}
		},
		changeSanity: function (value, modifier) {
			if (modifier && this.character['Sanity Drain'] < this.sanityCap) {
				this.character['Sanity Drain']++;
			} else if (!modifier && this.character['Sanity Drain'] > 0) {
				this.character['Sanity Drain']--;
			}
		},
		changeInspiration: function (value, modifier) {
			if (modifier && this.character.Inspiration < this.inspirationCap) {
				this.character.Inspiration++;
			} else if (!modifier && this.character.Inspiration > 0) {
				this.character.Inspiration--;
			}
		},
		changeHealth: function (index) {
			this.character['Wound Boxes'] += index <= this.character['Wound Boxes'] ? -1 : 1;
		},
		updateProperty: function (value, property) {
			this.$set(this.character, property, value);
		},
		changeTorment: function (event, index) {
			this.$set(this.character.torments[index], 'text', event);
		},
		markTorment: function (mark, index) {
			let modifier = mark <= this.character.torments[index].marked ? -1 : 1;
			if (this.character.creationComplete) {
				this.$set(this.character.torments[index], 'marked', this.character.torments[index].marked + modifier);
			} else {
				if (modifier < 0 || (
					this.character.torments[index].marked <= this.character.torments[index].startingCap &&
					(this.character.currentPoints > 0)
				)) {
					this.character.currentPoints -= modifier;
					this.$set(this.character.torments[index], 'marked', this.character.torments[index].marked + modifier);
				}
			}
		},
		addTorment: function (type) {
			let totalBoxes = 0;
			let startingCap = 0;
			switch (type) {
				case 'Terrible':
					totalBoxes = 10;
					startingCap = 4;
					break;
				case 'Major':
					totalBoxes = 7;
					startingCap = 3;
					break;
				case 'Minor':
					totalBoxes = 5;
					startingCap = 2;
					break;
			}

			this.character.torments.push({
				type: type,
				marked: 0,
				total: totalBoxes,
				text: '',
				startingCap: startingCap,
			});
		},
		deleteTorment: function (index) {
			this.$delete(this.character.torments, index);
		},
		changeAspect: function (index, type) {
			this.character[type] += index <= this.character[type] ? -1 : 1;
		},
	},
	created: function () {
		this.character = Object.assign(this.character, this.data);
		this.$emit('updateCharacter', this.character);
	},
	components: {
		dda_stat: DDA_Stat,
		dda_modal: DDA_Modal,
		dda_woundbox: DDA_WoundBox,
	},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	h1#characterTitle {
		min-height: 37px;
		margin-top: -5px;
	}

	div.divRow {
		width: 850px;
		margin-left: 2px;
		display: flex;
	}

	div.firstColumn {
		width: 550px;
	}

	div.secondColumn {
		flex-grow: 1;
	}

	span.roller {
		cursor: pointer;
	}

	img.characterImage {
		max-width: 400px;
		max-height: 450px;
	}

	label.textareaLongTag {
		width: 200px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		float: left;
		position: relative;
		margin-top: 20px;
	}

	span.deleteButton {
		color: red;
		cursor: pointer;
		margin-top: 20px;
		margin-right: 50px;
		float: right;
		position: relative;
	}
</style>

<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<label class='labelTag' for='characterName'>Name:</label>
				<input class='labelInput' id='characterName' v-model='character.name'/>
				<br>
				<label class='labelTag' for='characterStage'>Age Group:</label>
				<input class='labelInput' id='characterStage' v-model='character.type' disabled/>
				<br>
				<label class='labelTag' for='creationPoints'>Creation Points:</label>
				<span class='labelValue' id='creationPoints'>{{character.currentPoints}}/{{character.startingPoints}}</span>
				<br>
				<label class='labelTag' for='creationComplete'>Creation Complete:</label>
				<input class='labelCheckbox' id='creationComplete' type='checkbox' v-model='character.creationComplete'/>
				<br>
				<dda_stat stat='XP' :value='character.bonusPoints' :total_stat='character.bonusTotal' v-on:changeStat='changeBonus' v-if='character.creationComplete'/>
			</div>
			<div className='secondColumn'>
				<p><u>Human Picture</u></p>
				<input type='file' id='files' @change='handleFileSelect'/>
				<br/>
				<img class='characterImage' :src='character.image' />
			</div>
		</div>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Attributes</u><span v-if='!character.creationComplete'> | {{character.attributeTotal}}/{{character.areaCap}}</span></p>
				<p><dda_stat stat='Agility' :value='character.Agility' v-on:changeStat='changeAttribute' :roll='true' v-on:rollStat='rollAttribute'/></p>
				<p><dda_stat stat='Body' :value='character.Body' v-on:changeStat='changeAttribute' :roll='true' v-on:rollStat='rollAttribute'/></p>
				<p><dda_stat stat='Charisma' :value='character.Charisma' v-on:changeStat='changeAttribute' :roll='true' v-on:rollStat='rollAttribute'/></p>
				<p><dda_stat stat='Intelligence' :value='character.Intelligence' v-on:changeStat='changeAttribute' :roll='true' v-on:rollStat='rollAttribute'/></p>
				<p><dda_stat stat='Willpower' :value='character.Willpower' v-on:changeStat='changeAttribute' :roll='true' v-on:rollStat='rollAttribute'/></p>
				<p><u>Derived Stats</u></p>
				<span v-for='(name, key) in derivedStats' v-bind:key='name'>
					<label class='labelTag' :for='key'>{{name}}:</label>
					<span class='labelValue' :id='key'>{{getDerivedStat(key)}}</span>
					<span class='roller' @click='poolCheck(key, name)' v-if='key === "derivedWoundBoxes" || key === "derivedAccuracy" || key === "derivedDodge"'>🎲</span>
					<br>
				</span>
				<p><u>Special Stats</u></p>
				<p><dda_stat stat='Sanity Drain' :value='character["Sanity Drain"]' :total_stat='sanityCap' v-on:changeStat='changeSanity' :roll='true' v-on:rollStat='rollSanity'/></p>
				<p><dda_stat stat='Inspiration' :value='character.Inspiration' :total_stat='inspirationCap' v-on:changeStat='changeInspiration'/></p>
			</div>
			<div class='secondColumn'>
				<p><u>Skills</u><span v-if='!character.creationComplete'> | {{character.skillTotal}}/{{character.areaCap}}</span></p>
				<p><dda_stat stat='Dodge' :value='character.Dodge' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Fight' :value='character.Fight' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Stealth' :value='character.Stealth' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Athletics' :value='character.Athletics' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Endurance' :value='character.Endurance' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Feats of Strength' :value='character["Feats of Strength"]' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Manipulate' :value='character.Manipulate' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Perform' :value='character.Perform' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Persuade' :value='character.Persuade' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Computer' :value='character.Computer' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Survival' :value='character.Survival' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Knowledge' :value='character.Knowledge' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Perception' :value='character.Perception' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Decipher Intent' :value='character["Decipher Intent"]' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
				<p><dda_stat stat='Bravery' :value='character.Bravery' v-on:changeStat='changeSkill' :roll='true' v-on:rollStat='rollSkill'/></p>
			</div>
		</div>
		<dda_modal ref='modal'/>
	</div>
</template>

<script>
import DDA_Stat from './DDA_Stat';
import DDA_Modal from './DDA_Modal';
export default {
	name: 'DDA_Human',
	props: ['character'],
	data: function () {
		return {
			derivedStats: {
				derivedWoundBoxes: 'Wound Boxes',
				derivedMovement: 'Movement',
				derivedAccuracy: 'Accuracy',
				derivedDamage: 'Damage',
				derivedDodge: 'Dodge',
				derivedArmor: 'Armor',
			},
			skillMap: {
				Dodge: 'Agility',
				Fight: 'Agility',
				Stealth: 'Agility',
				Athletics: 'Body',
				Endurance: 'Body',
				'Feats of Strength': 'Body',
				Manipulate: 'Charisma',
				Perform: 'Charisma',
				Persuade: 'Charisma',
				Computer: 'Intelligence',
				Survival: 'Intelligence',
				Knowledge: 'Intelligence',
				Perception: 'Willpower',
				'Decipher Intent': 'Willpower',
				Bravery: 'Willpower',
			},
			sanityCheck: {
				humanChild: 9,
				humanTeen: 12,
				humanAdult: 15,
			},
			attributes: [
				'Agility',
				'Body',
				'Charisma',
				'Intelligence',
				'Willpower',
			],
			skills: [
				'Dodge',
				'Fight',
				'Stealth',
				'Athletics',
				'Endurance',
				'Feats of Strength',
				'Manipulate',
				'Perform',
				'Persuade',
				'Computer',
				'Survival',
				'Knowledge',
				'Perception',
				'Decipher Intent',
				'Bravery',
			],
		}
	},
	computed: {
		derivedWoundBoxes: function () {
			let woundBoxes = this.character['Body'] + this.character['Endurance'];
			return woundBoxes > 2 ? woundBoxes : 2;
		},
		derivedMovement: function () {
			return this.character['Agility'] + this.character['Survival'];
		},
		derivedAccuracy: function () {
			return this.character['Agility'] + this.character['Fight'];
		},
		derivedDamage: function () {
			return this.character['Body'] + this.character['Fight'];
		},
		derivedDodge: function () {
			return this.character['Agility'] + this.character['Dodge'];
		},
		derivedArmor: function () {
			return this.character['Body'] + this.character['Endurance'];
		},
		maxAttribute: function () {
			if (this.character.creationComplete) {
				return this.character.finalCap;
			}

			for (let index in this.attributes) {
				if (this.character[this.attributes[index]] === this.character.startingCap) {
					return this.character.startingCap - 1;
				}
			}
			return this.character.startingCap;
		},
		maxSkill: function () {
			if (this.character.creationComplete) {
				return this.character.finalCap;
			}

			for (let index in this.skills) {
				if (this.character[this.skills[index]] === this.character.startingCap) {
					return this.character.startingCap - 1;
				}
			}
			return this.character.startingCap;
		},
		sanityCap: function () {
			let cap = (this.character['Willpower'] > this.character['Bravery'] ? this.character['Willpower'] : this.character['Bravery']) - 2;
			return cap > 1 ? cap : 1;
		},
		inspirationCap: function () {
			return this.character['Willpower'] > 1 ? this.character['Willpower'] : 1;
		},
	},
	watch: {},
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
				let cost = 2 * (this.character[attribute] + modifier);
				if (
					modifier &&
					this.character.bonusPoints >= cost &&
					this.character[attribute] < this.maxAttribute
				) {
					this.character[attribute]++;
					this.character.bonusPoints -= cost;
				} else if (!modifier && this.character[attribute] > 0) {
					this.character[attribute]--;
					this.character.bonusPoints += cost;
				}
			} else {
				if (
					modifier &&
					this.character.currentPoints > 0 &&
					this.character.attributeTotal !== this.character.areaCap &&
					this.character[attribute] < this.maxAttribute
				) {
					this.character[attribute]++;
					this.character.attributeTotal++;
					this.character.currentPoints--;
				} else if (!modifier && this.character[attribute] > 0) {
					this.character.attributeTotal--;
					this.character[attribute]--;
					this.character.currentPoints++;
				}
			}
		},
		changeSkill: function (skill, modifier) {
			if (this.character.creationComplete) {
				let cost = this.character[skill] + modifier;
				if (
					modifier &&
					this.character.bonusPoints >= cost &&
					this.character[skill] < this.maxSkill
				) {
					this.character[skill]++;
					this.character.bonusPoints -= cost;
				} else if (!modifier && this.character[skill] > 0) {
					this.character[skill]--;
					this.character.bonusPoints += cost;
				}
			} else {
				if (
					modifier &&
					this.character.currentPoints > 0 &&
					this.character.skillTotal !== this.character.areaCap &&
					this.character[skill] < this.maxSkill
				) {
					this.character[skill]++;
					this.character.skillTotal++;
					this.character.currentPoints--;
				} else if (!modifier && this.character[skill] > 0) {
					this.character.skillTotal--;
					this.character[skill]--;
					this.character.currentPoints++;
				}
			}
		},
		getDerivedStat: function (stat) {
			return this[stat];
		},
		rollAttribute: function (attribute) {
			this.$refs.modal.activateModal(attribute + ' Roll: 3d6+' + this.character[attribute]);
		},
		rollSkill: function (skill) {
			let modifier = this.character[skill] + this.character[this.skillMap[skill]]
			this.$refs.modal.activateModal(skill + ' Roll: 3d6+' + modifier);
		},
		changeSanity: function (value, modifier) {
			if (modifier && this.character['Sanity Drain'] < this.sanityCap) {
				this.character['Sanity Drain']++;
			} else if (!modifier && this.character['Sanity Drain'] > 0) {
				this.character['Sanity Drain']--;
			}
		},
		rollSanity: function () {
			let modifier = this.character['Bravery'] + this.character['Willpower'];
			let targetNumber = this.sanityCheck[this.character.stage] + (this.character['Sanity Drain'] * 2);

			this.$refs.modal.activateModal('Sanity Roll: 3d6+' + modifier + ', Sanity TN: ' + targetNumber);
		},
		changeInspiration: function (value, modifier) {
			if (modifier && this.character.Inspiration < this.inspirationCap) {
				this.character.Inspiration++;
			} else if (!modifier && this.character.Inspiration > 0) {
				this.character.Inspiration--;
			}
		},
		poolCheck: function (stat, name) {
			this.$refs.modal.activateModal(name + ' Pool Check: ' + this[stat] + 'd6, [Roll20: ' + this[stat] + 'd6>5]');
		},
	},
	created: function () {},
	components: {
		dda_stat: DDA_Stat,
		dda_modal: DDA_Modal,
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

	label.labelTag {
		width: 150px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		min-height: 30px;
	}

	input.labelInput {
		width: 169px;
		margin-bottom: 10px;
		text-align: center;
	}

	span.labelValue {
		margin: 26px;
	}

	div.firstColumn {
		width: 550px;
	}

	div.secondColumn {
		flex-grow: 1;
	}

	input.labelCheckbox {
		margin-left: 40px;
	}

	span.roller {
		cursor: pointer;
	}

	img.characterImage {
		max-width: 400px;
		max-height: 450px;
	}
</style>

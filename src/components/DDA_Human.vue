<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<!-- Character Name -->
				<dda_input
					:inputName='"Name"'
					:textProperty='character.name'
					@change='updateProperty($event, "name")'
				/>
				<!-- Character Age -->
				<dda_input
					:inputName='"Age Group"'
					:textProperty='character.type'
					:disableFlag='true'
				/>
				<!-- Creation Points -->
				<dda_span
					:inputName='"Creation Points"'
					:textProperty='character.currentPoints + "/" + character.startingPoints'
				/>
				<!-- Creation Complete Checkbox -->
				<dda_checkbox
					:inputName='"Creation Complete"'
					:textProperty='character.creationComplete'
					@change='updateProperty($event, "creationComplete")'
				/>
				<span v-if='character.creationComplete'>
					<!-- XP Points -->
					<dda_stat
						:stat='"XP"'
						:value='character.bonusPoints'
						:total_stat='character.bonusTotal'
						@changeStat='changeBonus'
					/>
					<!-- Final Stat Cap -->
					<dda_stat
						:stat='"Cap"'
						:value='character.finalCap'
						@changeStat='changeFinalCap'
					/>
				</span>
				<!-- Wound Boxes Count -->
				<dda_span
					:inputName='"Wound Boxes"'
					:textProperty='(this.character.woundBoxes + this.character.temporary) + "/" + this.derivedWoundBoxes'
				/>
				<!-- Add Temporary Wound Boxes Button -->
				<button :disabled='character.temporary > 0' @click='addTemporary'>Add Temporary Wound Boxes</button>
				<!-- Wound Boxes Display -->
				<dda_woundbox
					:current='character.woundBoxes'
					:total='derivedWoundBoxes'
					:temporary='character.temporary'
					@changeHealth='changeHealth'
					@markTemporary='markTemporary'
				/>
				<dda_stat
					:stat='"Health Below Zero"'
					:value='character.belowZero'
					@changeStat='changeBelowZero'
				/>
			</div>
			<div className='secondColumn'>
				<p><u>Human Picture</u></p>
				<input id='files' type='file' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image'/>
			</div>
		</div>
		<div class='divRow'>
			<div class='firstColumn'>
				<!-- Attribute Total shown when creation is not complete -->
				<p>
					<u>Attributes</u>
					<span v-if='!character.creationComplete'> | {{character.attributeTotal}}/{{character.areaCap}}</span>
				</p>
				<!-- Loop display of Attributes -->
				<dda_stat
					v-for='(value, attribute) in character.attributes'
					:key='attribute'
					:stat='attribute'
					:value='character.attributes[attribute]'
					:roll='true'
					@changeStat='changeAttribute'
					@rollStat='rollAttribute'
				/>
				<p><u>Derived Stats</u></p>
				<!-- Wound Boxes -->
				<dda_span
					:inputName='"Wound Boxes"'
					:textProperty='derivedWoundBoxes'
					:roll='true'
					@rollStat='poolCheck("derivedWoundBoxes")'
				/>
				<!-- Movement -->
				<dda_span
					:inputName='"Movement"'
					:textProperty='derivedMovement'
					:modifier='character.modifiers.derivedMovement'
					@changeMod='changeMod($event, "derivedMovement")'
				/>
				<!-- Accuracy -->
				<dda_span
					:inputName='"Accuracy"'
					:textProperty='derivedAccuracy'
					:modifier='character.modifiers.derivedAccuracy'
					:roll='true'
					@changeMod='changeMod($event, "derivedAccuracy")'
					@rollStat='poolCheck("derivedAccuracy")'/>
				<!-- Damage -->
				<dda_span
					:inputName='"Damage"'
					:textProperty='derivedDamage'
					:modifier='character.modifiers.derivedDamage'
					@changeMod='changeMod($event, "derivedDamage")'
				/>
				<!-- Dodge -->
				<dda_span
					:inputName='"Dodge"'
					:textProperty='derivedDodge'
					:modifier='character.modifiers.derivedDodge'
					:roll='true'
					@changeMod='changeMod($event, "derivedDodge")'
					@rollStat='poolCheck("derivedDodge")'
				/>
				<!-- Armor -->
				<dda_span
					:inputName='"Armor"'
					:textProperty='derivedArmor'
					:modifier='character.modifiers.derivedArmor'
					@changeMod='changeMod($event, "derivedArmor")'
				/>
				<p><u>Special Stats</u></p>
				<!-- Passive Perception -->
				<dda_span
					:inputName='"Passive Perception"'
					:textProperty='passivePerception'
				/>
				<!-- Directing Range -->
				<dda_span
					:inputName='"Direct Range"'
					:textProperty='directRange'
				/>
				<!-- Sanity Drain -->
				<dda_stat
					:stat='"Sanity Drain"'
					:value='character["Sanity Drain"]'
					:total_stat='sanityCap'
					:roll='true'
					@changeStat='changeSanity'
					@rollStat='rollSanity'
				/>
				<!-- Inspiration -->
				<dda_stat
					:stat='"Inspiration"'
					:value='character.Inspiration'
					:total_stat='inspirationCap'
					@changeStat='changeInspiration'
				/>
			</div>
			<div class='secondColumn'>
				<p>
					<u>Skills</u>
					<span v-if='!character.creationComplete'> | {{character.skillTotal}}/{{character.areaCap}}</span>
				</p>
				<!-- Loop display of Skills -->
				<dda_stat
					v-for='(value, skill) in character.skills'
					:key='skill'
					:stat='skill'
					:value='character.skills[skill]'
					:roll='true'
					@changeStat='changeSkill'
					@rollStat='rollSkill'
				/>
			</div>
		</div>
		<p><u>Current Effects</u></p>
		<dda_effects :effects='character.effects'/>
		<p><u>Aspects</u></p>
		<p>
			<!-- Major Aspect -->
			<label class='textareaLongTag' for='majorAspect'>Major Aspect (+4/-4):</label>
			<dda_textarea
				:textProperty='character.majorAspect'
				:widthProperty='70'
				@change='updateProperty($event, "majorAspect")'
			/>
			<dda_box
				:current='character.majorUses'
				:total='1'
				@change='changeAspect($event, "majorUses")'
			/>
		</p>
		<p>
			<!-- Minor Aspect -->
			<label class='textareaLongTag' for='minorAspect'>Minor Aspect (+2/-2):</label>
			<dda_textarea
				:textProperty='character.minorAspect'
				:widthProperty='70'
				@change='updateProperty($event, "minorAspect")'
			/>
			<dda_box
				:current='character.minorUses'
				:total='2'
				@change='changeAspect($event, "minorUses")'
			/>
		</p>
		<p><u>Torments</u></p>
		<p>
			<button type='button' @click='addTorment("Minor")'>Add Minor Torment</button>
			<button type='button' @click='addTorment("Major")'>Add Major Torment</button>
			<button type='button' @click='addTorment("Terrible")'>Add Terrible Torment</button>
		</p>
		<!-- Loop of all Torments -->
		<p v-for='(torment, index) in character.torments' :key='index'>
			<label class='textareaLongTag'>{{torment.type}} Torment:</label>
			<dda_textarea
				:textProperty='torment.text'
				widthProperty='70'
				@change='changeTorment($event, index)'
			/>
			<span class='deleteButton' @click='deleteTorment(index)'>X</span>
			<dda_box
				:current='torment.marked'
				:total='torment.total'
				:cap='tormentCap(torment)'
				@change='markTorment($event, index)'
			/>
		</p>
		<!--Details -->
		<p><u>Additional Details</u></p>
		<dda_textarea
			:textProperty='character.notes'
			:widthProperty='91'
			@change='updateProperty($event, "notes")'
		/>
		<!-- Inventory -->
		<section>
			<p><u>Inventory</u> | <button @click='addInventory'>Add Item</button></p>
			<p v-for='(item, index) in character.inventory' :key='index'>
				<dda_textarea
					:textProperty='item'
					:widthProperty='90'
					@change='updateInventory($event, index)'
				/>
			<span class='deleteButton' @click='removeInventory(index)'>X</span>
			</p>
		</section>
		<dda_modal ref='modal'/>
	</div>
</template>

<script>
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
				finalCap: 0,
				attributes: {
					'Agility': 0,
					'Body': 0,
					'Charisma': 0,
					'Intelligence': 0,
					'Willpower': 0,
				},
				modifiers: {
					derivedMovement: 0,
					derivedAccuracy: 0,
					derivedDamage: 0,
					derivedDodge: 0,
					derivedArmor: 0,
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
				woundBoxes: 2,
				temporary: 0,
				belowZero: 0,
				'Sanity Drain': 0,
				'Inspiration': 1,
				majorAspect: null,
				majorUses: 0,
				minorAspect: null,
				minorUses: 0,
				torments: [],
				notes: null,
				image: null,
				effects: {
					positive: [
						{ name: '', duration: 0 },
						{ name: '', duration: 0 },
						{ name: '', duration: 0 },
					],
					negative: [
						{ name: '', duration: 0 },
						{ name: '', duration: 0 },
						{ name: '', duration: 0 },
					],
				},
				inventory: [],
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
		};
	},
	computed: {
		derivedWoundBoxes: function () {
			let woundBoxes = this.character.attributes['Body'] + this.character.skills['Endurance'];
			let woundBoxTotal = woundBoxes > 2 ? woundBoxes : 2;
			return woundBoxTotal;
		},
		derivedMovement: function () {
			let value = this.character.attributes['Agility'] + this.character.skills['Survival'] + this.getModifier('derivedMovement');
			return value > 0 ? value : 0;
		},
		derivedAccuracy: function () {
			let value = this.character.attributes['Agility'] + this.character.skills['Fight'] + this.getModifier('derivedAccuracy');
			return value > 0 ? value : 0;
		},
		derivedDamage: function () {
			let value = this.character.attributes['Body'] + this.character.skills['Fight'] + this.getModifier('derivedDamage');
			return value > 0 ? value : 0;
		},
		derivedDodge: function () {
			let value = this.character.attributes['Agility'] + this.character.skills['Evade'] + this.getModifier('derivedDodge');
			return value > 0 ? value : 0;
		},
		derivedArmor: function () {
			let value = this.character.attributes['Body'] + this.character.skills['Endurance'] + this.getModifier('derivedArmor');
			return value > 0 ? value : 0;
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
		passivePerception: function () {
			return 9 + this.character.attributes['Intelligence'];
		},
		directRange: function () {
			return 3 + this.character.attributes['Charisma'];
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
				this.$set(this.character, 'woundBoxes', this.derivedWoundBoxes);
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
		rollAttribute: function (attribute) {
			let modifier = this.character.attributes[attribute];
			this.$refs.modal.activateModal(attribute + ' Roll: 3d6' + (modifier > 0 ? '+' + modifier : '-1'));
		},
		rollSkill: function (skill) {
			let modifier = this.character.skills[skill] + this.character.attributes[this.skillMap[skill]]
			this.$refs.modal.activateModal(skill + ' Roll: 3d6' + (modifier > 0 ? '+' + modifier : '-1'));
		},
		rollSanity: function () {
			let modifier = this.character.skills['Bravery'] + this.character.attributes['Willpower'];
			let targetNumber = this.sanityCheck[this.character.stage] + (this.character['Sanity Drain'] * 2);

			this.$refs.modal.activateModal('Sanity Roll: 3d6+' + modifier + ', Sanity TN: ' + targetNumber);
		},
		poolCheck: function (stat) {
			this.$refs.modal.activateModal(this.derivedStats[stat] + ' Pool Check: ' + this[stat] + 'd6, [Roll20: ' + this[stat] + 'd6>5]');
		},
		tormentCap: function (torment) {
			return this.character.creationComplete ? torment.total : this.character.currentPoints ? torment.startingCap : torment.marked;
		},
		getModifier: function (value) {
			return Number.isInteger(this.character.modifiers[value]) ? this.character.modifiers[value] : 0;
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
		changeFinalCap: function (cap, modifier) {
			this.character.finalCap += modifier ? 1 : -1;
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
				} else if (!modifier && this.character.attributes[attribute] > 0) {
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
			this.character.woundBoxes += (index <= this.character.woundBoxes ? -1 : 1);
		},
		addTemporary: function () {
			let input = Number.parseInt(prompt('Add X Temporary Wound Boxes:', 0));
			if (Number.isInteger(input) && input < 50) {
				this.$set(this.character, 'temporary', input);
			}
		},
		changeBelowZero: function (type, modifier) {
			if (modifier && this.character.belowZero < 0) {
				this.character.belowZero++;
			} else if (!modifier) {
				this.character.belowZero--;
			}
		},
		markTemporary: function () {
			this.character.temporary -= 1;
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
		changeMod: function (value, type) {
			let modifier = Number.parseInt(value);
			this.character.modifiers[type] = Number.isInteger(modifier) ? modifier : 0;
		},
		addInventory: function () {
			this.character.inventory.push('');
		},
		removeInventory: function (index) {
			this.$delete(this.character.inventory, index);
		},
		updateInventory: function (value, index) {
			this.$set(this.character.inventory, index, value);
		},
	},
	created: function () {
		this.character = Object.assign(this.character, this.data);
		this.$emit('updateCharacter', this.character);
	},
	components: {},
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

/*
 * Attack List
 * Quality List
 */
<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<dda_input :textProperty='character.name' inputName='Name' @change='updateProperty($event, "name")'/>
				<dda_input :textProperty='character.type' inputName='Stage' :disableFlag='true'/>
				<dda_select :textProperty='character.size' inputName='Size' :options='sizes' @change='updateProperty($event, "size")'/>
				<dda_select :textProperty='character.attribute' inputName='Attribute' :options='attributes' @change='updateProperty($event, "attribute")'/>
				<dda_select :textProperty='character.family' inputName='Family' :options='families' @change='updateProperty($event, "family")'/>
				<dda_input :textProperty='character.digimonType' inputName='Type' @change='updateProperty($event, "digimonType")'/>
				<dda_span :textProperty='character.currentPoints + "/" + character.startingPoints' inputName='Digi-Points'/>
				<dda_checkbox :textProperty='character.creationComplete' inputName='Creation Complete' @change='updateProperty($event, "creationComplete")'/>
				<dda_stat v-if='character.creationComplete' stat='XP' :value='character.bonusPoints' :total_stat='character.bonusTotal' @changeStat='changeBonus'/>
				<dda_span :textProperty='character["Wound Boxes"] + "/" + derivedWoundBoxes' inputName='Wound Boxes'/>
				<button :disabled='character.temporary > 0' @click='addTemporary'>Add Temporary Wound Boxes</button>
				<dda_woundbox :current='character["Wound Boxes"]' :total='derivedWoundBoxes' :temporary='character.temporary' @changeHealth='changeHealth' @markTemporary='markTemporary'/>
			</div>
			<div className='secondColumn'>
				<p><u>Digimon Picture</u></p>
				<input type='file' id='files' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image' />
			</div>
		</div><div class='divRow'>
			<div class='firstColumn'>
				<p><u>Movement</u></p>
				<dda_span :textProperty='getDerivedStat("derivedMovement")' inputName='Movement'/><br>
				<dda_span :textProperty='getDerivedStat("movementJumpHeight")' inputName='Jump Height'/><br>
				<dda_span :textProperty='getDerivedStat("movementJumpLength")' inputName='Jump Length'/><br>
				<dda_span :textProperty='getDerivedStat("movementSwimSpeed")' inputName='Swim Speed'/><br>
				<p><u>Stats</u></p>
				<dda_stat v-for='(value, stat) in character.stats' v-bind:key='stat' :stat='stat' :value='character.stats[stat]' @changeStat='changeStat'/>
			</div>
			<div class='secondColumn'>
				<p><u>Derived Stats</u></p>
				<dda_span :textProperty='getDerivedStat("derivedWoundBoxes")' inputName='Wound Boxes'/>
				<span class='roller' @click='poolCheck("derivedWoundBoxes")'>🎲</span><br>
				<dda_span :textProperty='getDerivedStat("derivedAgility")' inputName='Agility'/>
				<span class='roller' @click='rollStat("derivedAgility")'>🎲</span><br>
				<dda_span :textProperty='getDerivedStat("derivedBody")' inputName='Body'/>
				<span class='roller' @click='rollStat("derivedBody")'>🎲</span><br>
				<dda_span :textProperty='getDerivedStat("derivedBrains")' inputName='Brains'/>
				<span class='roller' @click='rollStat("derivedBrains")'>🎲</span><br>
				<p><u>Spec Stats</u></p>
				<dda_span :textProperty='getDerivedStat("specRAM")' inputName='RAM [Agility]'/>
				<span class='roller' @click='rollStat("specRAM")'>🎲</span><br>
				<dda_span :textProperty='getDerivedStat("specCPU")' inputName='CPU [Body]'/>
				<span class='roller' @click='rollStat("specCPU")'>🎲</span><br>
				<dda_span :textProperty='getDerivedStat("specBIT")' inputName='BIT [Brains]'/>
				<span class='roller' @click='rollStat("specBIT")'>🎲</span><br>
			</div>
		</div>
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
	name: 'DDA_Digimon',
	props: ['data'],
	data: function () {
		return {
			character: {
				name: null,
				creationComplete: false,
				bonusPoints: 0,
				bonusTotal: 0,
				size: null,
				attribute: null,
				family: null,
				digimonType: null,
				stats: {
					'Health': 0,
					'Accuracy': 0,
					'Damage': 0,
					'Dodge': 0,
					'Armor': 0,
				},
				'Wound Boxes': 0,
				temporary: 0,
				notes: null,
				image: null,
			},
			derivedStats: {
				derivedMovement: 'Movement',
				movementJumpHeight: 'Jump Height',
				movementJumpLength: 'Jump Length',
				movementSwimSpeed: 'Swim Speed',
				derivedWoundBoxes: 'Wound Boxes',
				derivedAgility: 'Agility',
				derivedBody: 'Body',
				derivedBrains: 'Brains',
				specRAM: 'RAM',
				specCPU: 'CPU',
				specBIT: 'BIT',
			},
			sizes: [
				'Tiny',
				'Small',
				'Medium',
				'Large',
				'Huge',
				'Gigantic',
			],
			sizeLookup: {
				'Tiny': {
					'agilityMod': 2,
					'bodyMod': -2,
				},
				'Small': {
					'agilityMod': 1,
					'bodyMod': -1,
				},
				'Medium': {
					'agilityMod': 0,
					'bodyMod': 0,
				},
				'Large': {
					'agilityMod': -1,
					'bodyMod': 1,
				},
				'Huge': {
					'agilityMod': -1,
					'bodyMod': 2,
				},
				'Gigantic': {
					'agilityMod': -2,
					'bodyMod': 3,
				},
			},
			attributes: [
				'Vaccine',
				'Virus',
				'Data',
				'Free',
			],
			families: [
				"Dragon's Roar",
				'Deep Savers',
				'Nature Spirits',
				'Wind Guardians',
				'Jungle Troopers',
				'Metal Empire',
				'Virus Busters',
				'Nightmare Soldiers',
				'Dark Area',
				'Unknown',
			],
			allowUpdate: true,
		}
	},
	computed: {
		derivedMovement: function () {
			return this.character.baseMovement;
		},
		movementJumpHeight: function () {
			return Math.floor(this.character.baseMovement / 2);
		},
		movementJumpLength: function () {
			return Math.floor(this.character.baseMovement / 2);
		},
		movementSwimSpeed: function () {
			return Math.floor(this.character.baseMovement / 2);
		},
		derivedWoundBoxes: function () {
			return this.character.startingWoundBoxes + this.character.stats['Health'];
		},
		derivedAgility: function () {
			let sizeMod = this.character.size in this.sizeLookup ? this.sizeLookup[this.character.size].agilityMod : 0;
			return Math.floor((this.character.stats['Accuracy'] + this.character.stats['Dodge']) / 2) + sizeMod;
		},
		derivedBody: function () {
			let sizeMod = this.character.size in this.sizeLookup ? this.sizeLookup[this.character.size].bodyMod : 0;
			return Math.floor((this.character.stats['Health'] + this.character.stats['Damage'] + this.character.stats['Armor']) / 3) + sizeMod;
		},
		derivedBrains: function () {
			return Math.floor(this.character.stats['Accuracy'] / 2) + this.character.brainsMod;
		},
		specRAM: function () {
			return Math.floor(this.derivedAgility / 10) + this.character.specMod;
		},
		specCPU: function () {
			return Math.floor(this.derivedBody / 10) + this.character.specMod;
		},
		specBIT: function () {
			return Math.floor(this.derivedBrains / 10) + this.character.specMod;
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
		rollStat: function (stat) {
			this.$refs.modal.activateModal(this.derivedStats[stat] + ' Roll: 3d6+' + this[stat]);
		},
		poolCheck: function (stat) {
			this.$refs.modal.activateModal(this.derivedStats[stat] + ' Pool Check: ' + this[stat] + 'd6, [Roll20: ' + this[stat] + 'd6>5]');
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
		changeHealth: function (index) {
			this.character['Wound Boxes'] += index <= this.character['Wound Boxes'] ? -1 : 1;
		},
		addTemporary: function () {
			let input = Number.parseInt(prompt('Add X Temporary Wound Boxes:', 0));
			if (Number.isInteger(input) && input < 50) {
				this.$set(this.character, 'temporary', input);
			}
		},
		markTemporary: function () {
			this.character.temporary -= 1;
		},
		updateProperty: function (value, property) {
			this.$set(this.character, property, value);
		},
		changeStat: function (stat, modifier) {
			if (this.character.creationComplete) {
				if (modifier && this.character.bonusPoints > 0) {
					this.character.stats[stat]++;
					this.character.bonusPoints -= 1;
				} else if (!modifier && this.character.stats[stat] > 0) {
					this.character.stats[stat]--;
					this.character.bonusPoints += 1;
				}
			} else {
				if (modifier && this.character.currentPoints > 0) {
					this.character.stats[stat]++;
					this.character.currentPoints--;
				} else if (!modifier && this.character.stats[stat] > 0) {
					this.character.stats[stat]--;
					this.character.currentPoints++;
				}
			}
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

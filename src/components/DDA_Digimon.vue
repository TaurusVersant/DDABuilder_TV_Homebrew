/*
 * Attack List
 * Quality List
 * Modifiers (Temporary/Permanent)
 * Rolling Attributes
 * Human Attack / Direct Range
 * Burst Dimensions?
 * Passive Perception
 * Elemental Terrain button
 * Negative Wound Box tracking
 */
<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<dda_input :textProperty='character.name' inputName='Name' @change='updateProperty($event, "name")'/>
				<dda_input :textProperty='character.type' inputName='Stage' :disableFlag='true'/>
				<dda_stat v-if='character.type === "Burst"' stat='Burst Modifier' :value='character.burstModifier' @changeStat='changeBurst'/>
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
				<p><u>Special Information</u></p>
				<dda_select :textProperty='character.specialDigivolution' inputName='Special Digivolution' :options='specialDigivolutions' @change='updateProperty($event, "specialDigivolution")'/>
				<p><u>Digimon Picture</u></p>
				<input type='file' id='files' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image' />
			</div>
		</div><div class='divRow'>
			<div class='firstColumn'>
				<p><u>Movement</u></p>
				<dda_span :textProperty='getDerivedStat("derivedMovement")' inputName='Movement'/>
				<dda_span :textProperty='getDerivedStat("movementJumpHeight")' inputName='Jump Height'/>
				<dda_span :textProperty='getDerivedStat("movementJumpLength")' inputName='Jump Length'/>
				<dda_span :textProperty='getDerivedStat("movementSwimSpeed")' inputName='Swim Speed'/>
				<p><u>Stats</u></p>
				<dda_stat stat='Health' :value='character.stats["Health"]' @changeStat='changeStat' :roll='true' @rollStat='poolCheck("Health")'/>
				<dda_stat stat='Accuracy' :value='character.stats["Accuracy"]' @changeStat='changeStat'/>
				<dda_stat stat='Damage' :value='character.stats["Damage"]' @changeStat='changeStat'/>
				<dda_stat stat='Dodge' :value='character.stats["Dodge"]' @changeStat='changeStat'/>
				<dda_stat stat='Armor' :value='character.stats["Armor"]' @changeStat='changeStat'/>
			</div>
			<div class='secondColumn'>
				<p><u>Derived Stats</u></p>
				<dda_span :textProperty='getDerivedStat("derivedWoundBoxes")' inputName='Wound Boxes'/>
				<dda_span :textProperty='getDerivedStat("derivedAgility")' inputName='Agility' :roll='true' @rollStat='rollStat("derivedAgility")'/>
				<dda_span :textProperty='getDerivedStat("derivedBody")' inputName='Body' :roll='true' @rollStat='rollStat("derivedBody")'/>
				<dda_span :textProperty='getDerivedStat("derivedBrains")' inputName='Brains' :roll='true' @rollStat='rollStat("derivedBrains")'/>
				<p><u>Spec Stats</u></p>
				<dda_span :textProperty='getDerivedStat("specRAM")' inputName='RAM [Agility]' :roll='true' @rollStat='rollStat("specRAM")'/>
				<dda_span :textProperty='getDerivedStat("specCPU")' inputName='CPU [Body]' :roll='true' @rollStat='rollStat("specCPU")'/>
				<dda_span :textProperty='getDerivedStat("specBIT")' inputName='BIT [Brains]' :roll='true' @rollStat='rollStat("specBIT")'/>
				<!--<p><u>Rolls</u></p>
				<dda_span textProperty='' inputName='Agility' :roll='true'/>
				<dda_span textProperty='' inputName='Body' :roll='true'/>
				<dda_span textProperty='' inputName='Charisma' :roll='true'/>
				<dda_span textProperty='' inputName='Intelligence' :roll='true'/>
				<dda_span textProperty='' inputName='Willpower' :roll='true'/>-->
			</div>
		</div>
		<p><u>Digimon Attacks</u></p>
		<table class='attackTable'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Damage</th>
					<th>Area</th>
					<th>Effect</th>
					<th>Features</th>
				</tr>
			</thead>
			<dda_attack v-for='attack in character.attackCount' v-bind:key='attack' :data='character.attacks[attack]' :range='2*getDerivedStat("specBIT")' @attackUpdated='updateAttack($event, attack)'/>
		</table>
		<p><u>Additional Details</u></p>
		<dda_textarea :textProperty='character.notes' widthProperty='91' @change='updateProperty($event, "notes")'/>
		<dda_modal ref='modal'/>
	</div>
</template>

<script>
import DDA_Stat from './DDA_Stat';
import DDA_Modal from './DDA_Modal';
import DDA_WoundBox from './DDA_WoundBox';
import DDA_Attack from './DDA_Attack';
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
				burstModifier: 0,
				specialDigivolution: '',
				startingWoundBoxes: 0,
				size: null,
				attribute: null,
				family: null,
				digimonType: null,
				stats: {
					'Health': 1,
					'Accuracy': 1,
					'Damage': 1,
					'Dodge': 1,
					'Armor': 1,
				},
				'Wound Boxes': 0,
				temporary: 0,
				attacks: {},
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
			burstScaling: {
				startingDP: 15,
				baseMovement: 2,
				woundBoxes: 4,
				brains: 3,
				specValues: 1,
			},
			specialDigivolutions: [
				'',
				'Dark',
				'DNA',
				'Hybrid',
				'Armor',
			],
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
			return this.character.baseMovement + (this.character.burstModifier * this.burstScaling.baseMovement);
		},
		movementJumpHeight: function () {
			return Math.floor(this.derivedMovement / 2);
		},
		movementJumpLength: function () {
			return Math.floor(this.derivedMovement / 2);
		},
		movementSwimSpeed: function () {
			return Math.floor(this.derivedMovement / 2);
		},
		derivedWoundBoxes: function () {
			return this.character.startingWoundBoxes + this.character.stats['Health'] + (this.character.burstModifier * this.burstScaling.woundBoxes);
		},
		derivedAgility: function () {
			let sizeMod = this.character.size in this.sizeLookup ? this.sizeLookup[this.character.size].agilityMod : 0;
			let agility = Math.floor((this.character.stats['Accuracy'] + this.character.stats['Dodge']) / 2) + sizeMod;
			return agility > 0 ? agility : 0;
		},
		derivedBody: function () {
			let sizeMod = this.character.size in this.sizeLookup ? this.sizeLookup[this.character.size].bodyMod : 0;
			let body = Math.floor((this.character.stats['Health'] + this.character.stats['Damage'] + this.character.stats['Armor']) / 3) + sizeMod;
			return body > 0 ? body : 0;
		},
		derivedBrains: function () {
			let brains = Math.floor(this.character.stats['Accuracy'] / 2) + this.character.brainsMod + (this.character.burstModifier * this.burstScaling.brains);
			return brains > 0 ? brains : 0;
		},
		specRAM: function () {
			return Math.floor(this.derivedAgility / 10) + this.character.specMod + (this.character.burstModifier * this.burstScaling.specValues);
		},
		specCPU: function () {
			return Math.floor(this.derivedBody / 10) + this.character.specMod + (this.character.burstModifier * this.burstScaling.specValues);
		},
		specBIT: function () {
			return Math.floor(this.derivedBrains / 10) + this.character.specMod + (this.character.burstModifier * this.burstScaling.specValues);
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
			let modifier = this[stat] > 0 ? '+' + this[stat] : '-1';
			this.$refs.modal.activateModal(this.derivedStats[stat] + ' Roll: 3d6' + modifier);
		},
		poolCheck: function (stat) {
			this.$refs.modal.activateModal(stat + ' Pool Check: ' + this.character.stats[stat] + 'd6, [Roll20: ' + this.character.stats[stat] + 'd6>5]');
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
		changeBurst: function (attribute, modifier) {
			if (modifier) {
				this.character.burstModifier++;
				this.character.currentPoints += this.burstScaling.startingDP;
				this.character.startingPoints += this.burstScaling.startingDP;
			} else if (!modifier && this.character.burstModifier > 0 && this.character.currentPoints >= this.burstScaling.startingDP) {
				this.character.currentPoints -= this.burstScaling.startingDP;
				this.character.startingPoints -= this.burstScaling.startingDP;
				this.character.burstModifier--;
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
		updateAttack: function (data, attack) {
			this.character.attacks[attack] = data;
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
		dda_attack: DDA_Attack,
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

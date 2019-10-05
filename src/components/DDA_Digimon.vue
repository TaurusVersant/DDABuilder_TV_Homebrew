/*
 * Quality List
 * Elemental Terrain button
 * Negative Wound Box tracking
 * Attribute Rolls
 */
<template>
	<div>
		<h1 id='characterTitle'>{{character.name}}</h1>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Details</u></p>
				<!-- Digimon Name -->
				<dda_input
					:inputName='"Name"'
					:textProperty='character.name'
					@change='updateProperty($event, "name")'
				/>
				<!-- Digimon Stage -->
				<dda_input
					:inputName='"Stage"'
					:textProperty='character.type'
					:disableFlag='true'
				/>
				<!-- Burst Modifier -->
				<dda_stat
					v-if='character.type === "Burst"'
					:stat='"Burst Modifier"'
					:value='character.burstModifier'
					@changeStat='changeBurst'
				/>
				<!-- Digimon Size -->
				<dda_select
					:inputName='"Size"'
					:textProperty='character.size'
					:options='sizes'
					@change='updateProperty($event, "size")'
				/>
				<!-- Digimon Attribute -->
				<dda_select
					:inputName='"Attribute"'
					:textProperty='character.attribute'
					:options='attributes'
					@change='updateProperty($event, "attribute")'
				/>
				<!-- Digimon Family -->
				<dda_select
					:inputName='"Family"'
					:textProperty='character.family'
					:options='families'
					@change='updateProperty($event, "family")'
				/>
				<!-- Digimon Type -->
				<dda_input
					:inputName='"Type"'
					:textProperty='character.digimonType'
					@change='updateProperty($event, "digimonType")'
				/>
				<!-- Digi-Points -->
				<dda_span
					:inputName='"Digi-Points"'
					:textProperty='character.currentPoints + "/" + character.startingPoints'
				/>
				<!-- Creation Complete Checkbox -->
				<dda_checkbox
					:inputName='"Creation Complete"'
					:textProperty='character.creationComplete'
					@change='updateProperty($event, "creationComplete")'
				/>
				<!-- XP Points -->
				<dda_stat
					v-if='character.creationComplete'
					:stat='"XP"'
					:value='character.bonusPoints'
					:total_stat='character.bonusTotal'
					@changeStat='changeBonus'
				/>
				<!-- Wound Boxes Count -->
				<dda_span
					:inputName='"Wound Boxes"'
					:textProperty='(character["Wound Boxes"] + character.temporary) + "/" + derivedWoundBoxes'
				/>
				<!-- Add Temporary Wound Boxes Button -->
				<button :disabled='character.temporary > 0' @click='addTemporary'>Add Temporary Wound Boxes</button>
				<!-- Wound Boxes Display -->
				<dda_woundbox
					:current='character["Wound Boxes"]'
					:total='derivedWoundBoxes'
					:temporary='character.temporary'
					@changeHealth='changeHealth'
					@markTemporary='markTemporary'
				/>
			</div>
			<div className='secondColumn'>
				<p><u>Digimon Picture</u></p>
				<input id='files' type='file' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image'/>
			</div>
		</div>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Movement</u></p>
				<!-- Movement -->
				<dda_span
					:inputName='"Movement"'
					:textProperty='getDerivedStat("derivedMovement")'
					:modifier='character.modifiers.derivedMovement'
					@changeMod='changeMod($event, "derivedMovement")'
				/>
				<!-- Jump Height -->
				<dda_span
					:inputName='"Jump Height"'
					:textProperty='getDerivedStat("movementJumpHeight")'
				/>
				<!-- Jump Length -->
				<dda_span
					:inputName='"Jump Length"'
					:textProperty='getDerivedStat("movementJumpLength")'
				/>
				<!-- Swim Speed -->
				<dda_span
					:inputName='"Swim Speed"'
					:textProperty='getDerivedStat("movementSwimSpeed")'
				/>
				<p><u>Stats</u></p>
				<!-- Health Stat -->
				<dda_stat
					:stat='"Health"'
					:value='statHealth'
					:roll='true'
					@changeStat='changeStat'
					@rollStat='poolCheck("Health")'
				/>
				<!-- Combat Stats -->
				<dda_stat
					v-for='(stat, value) in combatStats'
					:key='value'
					:stat='stat'
					:value='getDerivedStat(value)'
					:modifier='character.modifiers[value]'
					@changeStat='changeStat'
					@changeMod='changeMod($event, value)'
				/>
			</div>
			<div class='secondColumn'>
				<p><u>Special Information</u></p>
				<!-- Special Stage -->
				<dda_select
					:inputName='"Special Stage"'
					:textProperty='character.specialDigivolution'
					:options='specialDigivolutions'
					@change='updateProperty($event, "specialDigivolution")'
				/>
				<!-- Passive Perception -->
				<dda_span
					:inputName='"Passive Perception"'
					:textProperty='passivePerception'
				/>
				<!-- Burst Radius -->
				<dda_span
					:inputName='"Burst Radius"'
					:textProperty='burstRadius'
				/>
				<p><u>Derived Stats</u></p>
				<!-- Derived Stats -->
				<dda_span
					:textProperty='getDerivedStat("derivedWoundBoxes")'
					inputName='Wound Boxes'
				/>
				<dda_span
					v-for='(stat, value) in derivedStats'
					:key='value'
					:inputName='stat'
					:textProperty='getDerivedStat(value)'
					:roll='true'
					@rollStat='rollStat(value)'
				/>
				<p><u>Spec Stats</u></p>
				<!-- Spec Stats -->
				<dda_span
					v-for='(stat, value) in specStats'
					:key='value'
					:inputName='stat'
					:textProperty='getDerivedStat(value)'
					:roll='true'
					@rollStat='rollStat(value)'
				/>
				<!--<p><u>Rolls</u></p>
				<dda_span textProperty='' inputName='Agility' :roll='true'/>
				<dda_span textProperty='' inputName='Body' :roll='true'/>
				<dda_span textProperty='' inputName='Charisma' :roll='true'/>
				<dda_span textProperty='' inputName='Intelligence' :roll='true'/>
				<dda_span textProperty='' inputName='Willpower' :roll='true'/>-->
			</div>
		</div>
		<p><u>Current Effects</u></p>
		<dda_effects :effects='character.effects'/>
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
					<th></th>
				</tr>
			</thead>
			<dda_attack
				v-for='attack in character.attackCount'
				v-bind:key='attack'
				:attackData='character.attacks[attack]'
				:range='2*getDerivedStat("specBIT")'
				:areaTags='character.freeAreaTags'
				:effectTags='character.freeEffectTags'
				:featureTags='character.freeFeatureTags'
				@attackUpdated='updateAttack($event, attack)'
				@doAttack='doAttack(attack)'
			/>
		</table>
		<p><u>Special Features</u></p>
		<ul>
			<li v-for='(quality, index) in specialFeatures' class='specialList' :key='index'>{{quality}}</li>
		</ul>
		<p><u>Additional Details</u></p>
		<dda_textarea
			:textProperty='character.notes'
			:widthProperty='91'
			@change='updateProperty($event, "notes")'
		/>
		<p>
			<u>Qualities</u>
			<button @click='showQualities'>Add Quality</button>
			<table
				v-if='Object.keys(character.qualities).length'
				class='digimonQualityTable'
			>
				<thead>
					<tr class='qualityRow'>
						<th>Quality</th>
						<th>Rank</th>
						<th>Details</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-for='(rank, quality) in character.qualities' :key='quality'>
					<tr class='qualityRow'>
						<td>{{quality}}</td>
						<td>{{rank}}</td>
						<td>{{library.qualities[quality].text}}</td>
						<td><button @click='removeQuality(quality)'>Remove</button></td>
					</tr>
				</tbody>
			</table>
		</p>
		<dda_modal ref='modal'/>
		<dda_qualities ref='qualities' :qualities='availableQualities' @purchase='addQuality'/>
	</div>
</template>

<script>
import DDA_Attack from './DDA_Attack';
import DDA_Qualities from './DDA_Qualities';
let library = require('./library');
export default {
	name: 'DDA_Digimon',
	props: ['data'],
	data: function () {
		return {
			library: null,
			character: {
				name: null,
				creationComplete: false,
				currentPoints: 0,
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
				modifiers: {
					derivedMovement: 0,
					statAccuracy: 0,
					statDamage: 0,
					statDodge: 0,
					statArmor: 0,
				},
				'Wound Boxes': 0,
				temporary: 0,
				attacks: {},
				freeAreaTags: {},
				freeEffectTags: {},
				freeFeatureTags: {},
				qualities: {},
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
			},
			combatStats: {
				statAccuracy: 'Accuracy',
				statDamage: 'Damage',
				statDodge: 'Dodge',
				statArmor: 'Armor',
			},
			derivedStats: {
				derivedAgility: 'Agility',
				derivedBody: 'Body',
				derivedBrains: 'Brains',
			},
			specStats: {
				specRAM: 'RAM [Agility]',
				specCPU: 'CPU [Body]',
				specBIT: 'BIT [Brains]',
			},
			statsLookup: {
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
		};
	},
	computed: {
		derivedMovement: function () {
			let value = this.character.baseMovement + (this.character.burstModifier * this.burstScaling.baseMovement) + this.getModifier('derivedMovement');
			return value > 0 ? value : 0;
		},
		statHealth: function () {
			return this.character.stats['Health'];
		},
		statAccuracy: function () {
			let value = this.character.stats['Accuracy'] + this.character.modifiers['statAccuracy'];
			return value > 0 ? value : 0;
		},
		statDamage: function () {
			let value = this.character.stats['Damage'] + this.character.modifiers['statDamage'];
			return value > 0 ? value : 0;
		},
		statDodge: function () {
			let value = this.character.stats['Dodge'] + this.character.modifiers['statDodge'];
			return value > 0 ? value : 0;
		},
		statArmor: function () {
			let value = this.character.stats['Armor'] + this.character.modifiers['statArmor'];
			return value > 0 ? value : 0;
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
		passivePerception: function () {
			return 9 + this.derivedBrains;
		},
		burstRadius: function () {
			return 1.5 + Math.floor(this.specBIT / 2);
		},
		availableQualities: function () {
			let availableQualities = {};
			for (let quality in this.library.qualities) {
				if (
					!this.character.qualities.hasOwnProperty(quality) ||
					this.character.qualities[quality] < this.library.qualities[quality].ranks
				) {
					let approved = true;
					for (let prerequisite in this.library.qualities[quality].prerequisites) {
						let qualityRank = this.character.qualities.hasOwnProperty(prerequisite) ? this.character.qualities[prerequisite] : 0;
						if (this.library.qualities[quality].prerequisites[prerequisite] > qualityRank) {
							approved = false;
						}
					}

					if (approved) {
						availableQualities[quality] = this.library.qualities[quality];
					}
				}
			}
			return availableQualities;
		},
		specialFeatures: function () {
			let features = [];
			for (let quality in this.character.qualities) {
				let qualityObject = this.library.qualities[quality];
				if (qualityObject.type === 'special') {
					features.push('[' + quality + '] | ' + qualityObject.text);
				}
			}
			return features;
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
			this.$refs.modal.activateModal(this.statsLookup[stat] + ' Roll: 3d6' + modifier);
		},
		poolCheck: function (stat) {
			this.$refs.modal.activateModal(stat + ' Pool Check: ' + this.character.stats[stat] + 'd6, [Roll20: ' + this.character.stats[stat] + 'd6>5]');
		},
		showQualities: function () {
			this.$refs.qualities.activateModal();
		},
		getModifier: function (value) {
			return Number.isInteger(this.character.modifiers[value]) ? this.character.modifiers[value] : 0;
		},
		doAttack: function (attack) {
			let details = [];
			let attackObject = this.character.attacks[attack];

			if (attackObject) {
				details.push('<b><u>' + attackObject.name + '</u></b>');

				// Accuracy Information
				details.push('<u>Accuracy:</u> ' + this.statAccuracy);

				// Damage Information
				if (attackObject.damage) {
					details.push('<u>Damage:</u> ' + this.statDamage);
				}

				// Range Information
				if (attackObject.type) {
					let range = '';
					if (attackObject.area) {
						let args = [];
						let quality = this.library.qualities[attackObject.area];
						for (let i in quality.args) {
							if (quality.args[i] in this) {
								args.push(this[quality.args[i]]);
							} else if (quality.args[i] in this.character) {
								args.push(this.character[quality.args[i]]);
							}
						}
						range = quality.method(attackObject.type, args);
					} else if (attackObject.type === 'Range') {
						range = 'Single target. 2 to ' + (2 * this.specBIT) + ' Units';
					} else {
						range = 'Single target. ' + 1 + ' Unit';
					}

					details.push('<u>Range:</u> ' + range);
				}

				// Effect Information
				if (attackObject.effect) {
					let args = [];
					let quality = this.library.qualities[attackObject.effect];
					for (let i in quality.args) {
						if (quality.args[i] in this) {
							args.push(this[quality.args[i]]);
						} else if (quality.args[i] in this.character) {
							args.push(this.character[quality.args[i]]);
						}
					}
					let note = attackObject.damage && quality.type === 'effect' ? ' Apply at least 2 damage to trigger. ' : ' ';
					details.push('<u>' + attackObject.effect + ':</u>' + note + ' ' + quality.method(args));
				}

				// Feature Information
				for (let i in attackObject.features) {
					if (attackObject.features[i]) {
						let args = [];
						let quality = this.library.qualities[attackObject.features[i]];
						for (let j in quality.args) {
							if (quality.args[j] === 'ranks') {
								args.push(this.character.qualities[attackObject.features[i]]);
							} else if (quality.args[j] in this) {
								args.push(this[quality.args[j]]);
							} else if (quality.args[j] in this.character) {
								args.push(this.character[quality.args[j]]);
							}
						}
						details.push('<u>' + attackObject.features[i] + ':</u> ' + quality.method(args));
					}
				}
				this.$refs.modal.activateModal(details.join('<br><br>'));
			}
		},
		/**
		* Setters
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
			// Check if area tag is in use
			if (data.area && this.character.freeAreaTags.hasOwnProperty(data.area)) {
				this.character.freeAreaTags[data.area] = true;
			}

			// Check if area tag is not in use
			if (this.character.attacks[attack] && this.character.attacks[attack].area !== data.area) {
				this.character.freeAreaTags[this.character.attacks[attack].area] = false;
			}

			// Check if effect tag is in use
			if (data.effect && this.character.freeEffectTags.hasOwnProperty(data.effect)) {
				this.character.freeEffectTags[data.effect] = true;
			}

			// Check if effect tag is not in use
			if (this.character.attacks[attack] && this.character.attacks[attack].effect !== data.effect) {
				this.character.freeEffectTags[this.character.attacks[attack].effect] = false;
			}

			for (let i in data.features) {
				// Check if feature tag is in use
				if (data.features[i] && this.character.freeFeatureTags.hasOwnProperty(data.features[i])) {
					this.character.freeFeatureTags[data.features[i]] = true;
				}

				// Check if feature tag is not in use
				if (this.character.attacks[attack] && this.character.attacks[attack].features[i] !== data.features[i]) {
					this.character.freeFeatureTags[this.character.attacks[attack].features[i]] = false;
				}
			}

			this.character.attacks[attack] = Object.assign({}, data);
		},
		addQuality: function (quality) {
			let qualityObject = this.library.qualities[quality];

			if (this.character.creationComplete) {
				if (qualityObject.cost > this.character.bonusPoints) {
					alert('Could not afford Quality: ' + quality);
					return;
				}
				this.character.bonusPoints -= qualityObject.cost;
			} else {
				if (qualityObject.cost > this.character.currentPoints) {
					alert('Could not afford Quality: ' + quality);
					return;
				}
				this.character.currentPoints -= qualityObject.cost;
			}

			if (this.character.qualities.hasOwnProperty(quality)) {
				this.$set(this.character.qualities, quality, this.character.qualities[quality] + 1);
			} else {
				this.$set(this.character.qualities, quality, 1);
			}

			// Adds quality to freeAreaTags
			if (qualityObject.type === 'area') {
				this.$set(this.character.freeAreaTags, quality, false);
			}

			// Adds quality to freeEffectTags
			if (qualityObject.type === 'effect' || qualityObject.type === 'stance') {
				this.$set(this.character.freeEffectTags, quality, false);
			}

			// Adds quality to freeFeatureTags
			if (qualityObject.type === 'feature') {
				this.$set(this.character.freeFeatureTags, quality, false);
			}

			// Signature Move handler
			if (quality === 'Signature Move') {
				if (!this.character.attacks[1]) {
					this.character.attacks[1] = {
						name: null,
						type: null,
						damage: false,
						area: '',
						effect: '',
						features: ['', ''],
					}
				} else {
					this.character.attacks[1].features.push('');
				}
			}

			this.$refs.qualities.closeModal();
		},
		removeQuality: function (quality) {
			let qualityObject = this.library.qualities[quality];

			if (qualityObject.unlocks.length) {
				for (let index in qualityObject.unlocks) {
					if (this.character.qualities.hasOwnProperty(qualityObject.unlocks[index])) {
						alert('Cannot remove ' + quality + ' while Digimon has dependant quality: ' + qualityObject.unlocks[index]);
						return;
					}
				}
			}

			// Prevents area tag in use from being removed
			if (qualityObject.type === 'area' && this.character.freeAreaTags[quality] && this.character.qualities[quality] === 1) {
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			}

			// Prevents effect tag in use from being removed
			if ((qualityObject.type === 'effect' || qualityObject.type === 'stance') && this.character.freeEffectTags[quality] && this.character.qualities[quality] === 1) {
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			}

			// Prevents feature tag in use from being removed
			if (qualityObject.type === 'feature' && this.character.freeFeatureTags[quality] && this.character.qualities[quality] === 1) {
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			}

			// Signature Move handler
			if (quality === 'Signature Move') {
				let feature = this.character.attacks[1].features.pop();
				if (feature) {
					this.$set(this.character.freeFeatureTags, feature, false);
				}
			}

			if (this.character.qualities[quality] === 1) {
				this.$delete(this.character.qualities, quality);

				// Removes area tag from freeAreaTags
				if (qualityObject.type === 'area') {
					this.$delete(this.character.freeAreaTags, quality);
				}

				// Removes effect tag from freeEffectTags
				if (qualityObject.type === 'effect' || qualityObject.type === 'stance') {
					this.$delete(this.character.freeEffectTags, quality);
				}

				// Removes effect tag from freeFeatureTags
				if (qualityObject.type === 'feature') {
					this.$delete(this.character.freeFeatureTags, quality);
				}
			} else {
				this.$set(this.character.qualities, quality, this.character.qualities[quality] - 1);
			}

			if (this.character.creationComplete) {
				this.character.bonusPoints += qualityObject.cost;
			} else {
				this.character.currentPoints += qualityObject.cost;
			}
		},
		changeMod: function (value, type) {
			let modifier = Number.parseInt(value);
			this.character.modifiers[type] = Number.isInteger(modifier) ? modifier : 0;
		},
	},
	created: function () {
		this.library = library;
		this.character = Object.assign(this.character, this.data);
		this.$emit('updateCharacter', this.character);
	},
	components: {
		dda_attack: DDA_Attack,
		dda_qualities: DDA_Qualities,
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

	table.digimonQualityTable {
		display: block;
		border-style: dotted solid;
		border-color: #dddddd;
		overflow: auto;
		max-height: 500px;
	}

	tr.qualityRow>td {
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
		min-width: 100px;
	}

	li.specialList {
		padding-bottom: 10px;
	}
</style>

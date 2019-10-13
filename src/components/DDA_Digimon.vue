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
					:options='library.sizes'
					@change='updateProperty($event, "size")'
				/>
				<!-- Digimon Attribute -->
				<dda_select
					:inputName='"Attribute"'
					:textProperty='character.attribute'
					:options='library.attributes'
					@change='updateProperty($event, "attribute")'
				/>
				<!-- Digimon Family -->
				<dda_select
					:inputName='"Family"'
					:textProperty='character.family'
					:options='library.families'
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
					:textProperty='(character.currentWoundBoxes + character.temporaryWoundBoxes) + "/" + derivedWoundBoxes'
				/>
				<!-- Add Temporary Wound Boxes Button -->
				<button :disabled='character.temporaryWoundBoxes > 0' @click='addTemporary'>Add Temporary Wound Boxes</button>
			</div>
			<div className='secondColumn'>
				<p><u>Digimon Picture</u></p>
				<input id='files' type='file' @change='handleFileSelect'/><br/>
				<img class='characterImage' :src='character.image'/>
			</div>
		</div>
		<div class='divRow'>
			<!-- Wound Boxes Display -->
			<dda_woundbox
				:current='character.currentWoundBoxes'
				:total='derivedWoundBoxes'
				:temporary='character.temporaryWoundBoxes'
				@changeHealth='changeHealth'
				@markTemporary='markTemporary'
			/>
		</div>
		<hr>
		<section>
			<div class='divRow'>
				<p><u>Special Digivolutions</u></p>
				<p>
				<!-- Digivolution Flags -->
				<dda_checkbox
					:inputName='"Dark"'
					:textProperty='character.darkDigivolution'
					@change='updateProperty($event, "darkDigivolution")'
				/>
				<dda_checkbox
					:inputName='"Armor"'
					:textProperty='character.armorDigivolution'
					@change='updateProperty($event, "armorDigivolution")'
				/>
				<dda_checkbox
					:inputName='"Boss"'
					:textProperty='character.bossDigivolution'
					@change='updateProperty($event, "bossDigivolution")'
				/>
				<dda_checkbox
					:inputName='"DNA"'
					:textProperty='character.dnaDigivolution'
					@change='updateProperty($event, "dnaDigivolution")'
				/>
				<dda_checkbox
					:inputName='"Hybrid"'
					:textProperty='character.hybridDigivolution'
					@change='updateProperty($event, "hybridDigivolution")'
				/>
				</p>
			</div>
		<hr>
		</section>
		<div class='divRow'>
			<div class='firstColumn'>
				<p><u>Movement</u></p>
				<!-- Movement -->
				<dda_span
					:inputName='"Movement"'
					:textProperty='getDerivedStat("derivedMovement")'
					:modifier='getModifier("derivedMovement")'
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
				<!-- Flight Speed -->
				<dda_span
					v-if='movementFlightSpeed > 0'
					:inputName='"Flight Speed"'
					:textProperty='getDerivedStat("movementFlightSpeed")'
				/>
				<!-- Teleport Speed -->
				<dda_span
					v-if='movementTeleportSpeed > 0'
					:inputName='"Teleport Speed"'
					:textProperty='getDerivedStat("movementTeleportSpeed")'
				/>
				<!-- Dig Speed -->
				<dda_span
					v-if='movementDigSpeed > 0'
					:inputName='"Digging Speed"'
					:textProperty='getDerivedStat("movementDigSpeed")'
				/>
				<!-- Climb Speed -->
				<dda_span
					v-if='movementClimbSpeed > 0'
					:inputName='"Climbing Speed"'
					:textProperty='getDerivedStat("movementClimbSpeed")'
				/>
				<p><u>Stats</u></p>
				<!-- Health Stat -->
				<dda_stat
					:stat='"Health"'
					:value='qualityHealth'
					:roll='true'
					@changeStat='changeStat'
					@rollStat='poolCheck("Health")'
				/>
				<!-- Combat Stats -->
				<dda_stat
					v-for='(stat, value) in library.combatStats'
					:key='value'
					:stat='stat'
					:value='getDerivedStat(value)'
					:modifier='getModifier(value)'
					:disabled='character.modeChangeActive || character.modeChangeActiveX0'
					@changeStat='changeStat'
					@changeMod='changeMod($event, value)'
				/>
			</div>
			<div class='secondColumn'>
				<p><u>Special Information</u></p>
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
				<!-- Elemental Terrain -->
				<dda_select
					:inputName='"Elemental Terrain"'
					:textProperty='character.terrainStatus'
					:options='elementalTerrain'
					@change='updateProperty($event, "terrainStatus")'
				/>
				<p><u>Derived Stats</u></p>
				<!-- Derived Stats -->
				<dda_span
					:textProperty='getDerivedStat("derivedWoundBoxes")'
					inputName='Wound Boxes'
				/>
				<dda_span
					v-for='(stat, value) in library.derivedStats'
					:key='value'
					:inputName='stat'
					:textProperty='getDerivedStat(value)'
					:roll='true'
					@rollStat='rollStat(value)'
				/>
				<p><u>Spec Stats</u></p>
				<!-- Spec Stats -->
				<dda_span
					v-for='(stat, value) in library.specStats'
					:key='value'
					:inputName='stat'
					:textProperty='getDerivedStat(value)'
					:roll='true'
					@rollStat='rollStat(value)'
				/>
			</div>
		</div>
		<hr>
		<p><u>Current Effects</u></p>
		<!-- Current Effects -->
		<dda_effects :effects='character.effects'/>
		<hr>
		<!-- Mode Change -->
		<section v-if='"Mode Change" in character.qualities'>
			<p><u>Mode Change</u></p>
			<span id='modeChangeSpan'>
				Swap
				<select class='labelInput' v-model='character.modeChange[0]'>
					<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
				</select>
				with
				<select class='labelInput' v-model='character.modeChange[1]'>
					<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
				</select>
				<button v-if='character.modeChangeActive' @click='doModeChange'>Deactivate Mode Change</button>
				<button v-else @click='doModeChange'>Activate Mode Change</button>
			</span>
			<section v-if='"Mode Change X.0" in character.qualities'>
				<p><u>Mode Change X.0</u></p>
				<p>
					<label class='labelTag'>Change Accuracy with:</label>
					<select class='labelInput' v-model='character.modeChangeX0["Accuracy"]'>
						<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
					</select>
				</p>
				<p>
					<label class='labelTag'>Change Damage with:</label>
					<select class='labelInput' v-model='character.modeChangeX0["Damage"]'>
						<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
					</select>
				</p>
				<p>
					<label class='labelTag'>Change Dodge with:</label>
					<select class='labelInput' v-model='character.modeChangeX0["Dodge"]'>
						<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
					</select>
				</p>
				<p>
					<label class='labelTag'>Change Armor with:</label>
					<select class='labelInput' v-model='character.modeChangeX0["Armor"]'>
						<option v-for='stat in combatStats' :key='stat'>{{stat}}</option>
					</select>
				</p>
				<button v-if='character.modeChangeActiveX0' @click='doModeChangeX0'>Deactivate Mode Change X.0</button>
				<button v-else @click='doModeChangeX0'>Activate Mode Change X.0</button>
			</section>
			<hr>
		</section>
		<!-- Rage -->
		<section v-if='"Rage" in character.qualities'>
			<p><u>Rage Meter</u> | {{character.currentRage}}/{{totalRage}}</p>
			<dda_box
				:current='character.currentRage'
				:total='totalRage'
				@change='changeRage($event)'
			/>
			<hr>
		</section>
		<section v-if='Object.keys(modifierNegatives).length'>
			<p><u>Modifier Negatives</u></p>
			<ul>
				<li v-for='(qualityText, quality) in modifierNegatives' class='specialList' :key='quality'>
					<span><b>[{{quality}}]</b> | {{qualityText}}</span>
				</li>
			</ul>
			<hr>
		</section>
		<!-- Conjurer -->
		<section v-if='"Conjurer" in character.qualities'>
			<p><u>Conjurer</u> | {{character.summoning.currentPoints}}/{{summonPool}} | <button @click='conjure'>Conjure Object</button></p>
			<div v-for='(object, index) in this.character.summoning.objects' :key='index' class='summonDiv'>
				<p>
					<u><b>Conjured Object {{intToChar(object.identifier)}}</b></u>
					<span class='deleteButton' @click='destroySummon("objects", index)'>X</span>
				</p>
				<dda_span
					:inputName='"Cost"'
					:textProperty='object.cost'
				/>
				<dda_span
					:inputName='"Wound Boxes"'
					:textProperty='object.currentWoundBoxes + "/" + object.totalWoundBoxes'
				/>
				<dda_span
					:inputName='"Dodge"'
					:textProperty='object.Dodge'
				/>
				<dda_span
					:inputName='"Armor"'
					:textProperty='object.Armor'
				/>
				<dda_span
					:inputName='"Size"'
					:textProperty='object.size'
				/>
				<!-- Wound Boxes Display -->
				<dda_woundbox
					:current='object.currentWoundBoxes'
					:total='object.totalWoundBoxes'
					@changeHealth='changeSummonHealth($event, "objects", index)'
				/>
			</div>
			<br>
			<hr>
		</section>
		<!-- Summoner -->
		<section v-if='"Summoner" in character.qualities'>
			<p><u>Summoner</u> | {{character.summoning.currentPoints}}/{{summonPool}} | <button @click='summon'>Summon Minion</button></p>
			<div v-for='(minion, index) in this.character.summoning.minions' :key='index' class='summonDiv'>
				<p>
					<u><b>Summoned Minion {{intToChar(minion.identifier)}}</b></u>
					<span class='deleteButton' @click='destroySummon("minions", index)'>X</span>
				</p>
				<dda_span
					:inputName='"Cost"'
					:textProperty='minion.cost'
				/>
				<dda_span
					:inputName='"Wound Boxes"'
					:textProperty='minion.currentWoundBoxes + "/" + minion.totalWoundBoxes'
				/>
				<dda_span
					:inputName='"Accuracy"'
					:textProperty='minion.Accuracy'
					:roll='true'
					@rollStat='minionAttack(index)'
				/>
				<dda_span
					:inputName='"Damage"'
					:textProperty='minion.Damage'
				/>
				<dda_span
					:inputName='"Dodge"'
					:textProperty='minion.Dodge'
				/>
				<dda_span
					:inputName='"Armor"'
					:textProperty='minion.Armor'
				/>
				<dda_span
					:inputName='"Flight Speed"'
					:textProperty='minion.movement'
				/>
				<dda_span
					:inputName='"Size"'
					:textProperty='minion.size'
				/>
				<!-- Wound Boxes Display -->
				<dda_woundbox
					:current='minion.currentWoundBoxes'
					:total='minion.totalWoundBoxes'
					@changeHealth='changeSummonHealth($event, "minions", index)'
				/>
			</div>
			<br>
			<hr>
		</section>
		<p><u>Digimon Attacks</u></p>
		<!-- Digimon Attacks -->
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
		<hr>
		<!-- Attack Modifiers -->
		<section v-if='Object.keys(attackModifiers).length'>
			<p><u>Attack Modifiers</u></p>
			<ul>
				<li v-for='(qualityText, quality) in attackModifiers' class='specialList' :key='quality'>
					<input type='checkbox' :name='quality' @change='applyModifier($event)'/>
					<span><b>[{{quality}}]</b> | {{character.qualities[quality]}} | {{qualityText}}</span>
				</li>
			</ul>
			<hr>
		</section>
		<!-- Special Actions -->
		<section v-if='Object.keys(specialActions).length'>
			<p><u>Special Actions</u></p>
			<ul>
				<li v-for='(qualityText, quality) in specialActions' class='specialList' :key='quality'>
					<span><b>[{{quality}}]</b> | {{character.qualities[quality]}} | {{qualityText}}</span>
				</li>
			</ul>
			<hr>
		</section>
		<!-- Passive Abilities -->
		<section v-if='Object.keys(passiveQualities).length'>
			<p><u>Passive Abilities</u></p>
			<ul>
				<li v-for='(qualityText, quality) in passiveQualities' class='specialList' :key='quality'>
					<span><b>[{{quality}}]</b> | {{character.qualities[quality]}} | {{qualityText}}</span>
				</li>
			</ul>
			<hr>
		</section>
		<!-- Additional Details -->
		<p><u>Additional Details</u></p>
		<dda_textarea
			:textProperty='character.notes'
			:widthProperty='91'
			@change='updateProperty($event, "notes")'
		/>
		<hr>
		<!-- Qualities -->
		<p><u>Qualities</u></p>
		<p>
			<button @click='showQualities()'>Add Quality</button>
			<button @click='showQualities("optimization")'>Add Optimization+ Quality</button>
			<button @click='showQualities("area")'>Add Area Attack Quality</button>
			<button @click='showQualities("effect")'>Add Attack Effect Quality</button>
			<button @click='showQualities("feature")'>Add Attack Feature Quality</button>
			<button @click='showQualities("modifier")'>Add Attack Modifier Quality</button>
			<button v-if='character.darkDigivolution' @click='showQualities("dark")'>Add Dark Digivolution Quality</button>
			<button v-if='character.dnaDigivolution' @click='showQualities("dna")'>Add DNA Digivolution Quality</button>
			<button v-if='character.hybridDigivolution' @click='showQualities("hybrid")'>Add Hybrid Digivolution Quality</button>
			<button v-if='character.armorDigivolution' @click='showQualities("armor")'>Add Armor Digivolution Quality</button>
		</p>
		<table v-if='Object.keys(character.qualities).length' class='digimonQualityTable'>
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
					<td>{{library.getQuality(quality).text}}</td>
					<td><button @click='removeQuality(quality)'>Remove</button></td>
				</tr>
			</tbody>
		</table>
		<!-- Custom Qualities -->
		<section v-if='character.bossDigivolution'>
			<p><u>Custom Qualities</u> | <button @click='addCustomQuality'>Add Quality</button></p>
			<p v-for='(quality, index) in character.customQualities' :key='index'>
				<dda_textarea
					:textProperty='quality'
					:widthProperty='90'
					@change='updateCustomQuality($event, index)'
				/>
			<span class='deleteButton' @click='removeCustomQuality(index)'>X</span>
			</p>
		</section>
		<!-- Modals -->
		<dda_modal ref='modal'/>
		<dda_qualities ref='qualities' @purchase='addQuality'/>
	</div>
</template>

<script>
import DDA_Attack from './DDA_Attack';
import DDA_Qualities from './DDA_Qualities';
export default {
	name: 'DDA_Digimon',
	props: ['digimon_data'],
	data: function () {
		return {
			library: null,
			character: {
				// Basic character information
				name: null,
				size: null,
				attribute: null,
				digimonType: null,
				family: null,
				notes: null,
				image: null,
				creationComplete: false,
				// XP tracking
				currentPoints: 0,
				bonusPoints: 0,
				bonusTotal: 0,
				burstModifier: 0,
				// Health tracking
				startingWoundBoxes: 0,
				currentWoundBoxes: 0,
				temporaryWoundBoxes: 0,
				// Combat Stats
				stats: {
					'Health': 1,
					'Accuracy': 1,
					'Damage': 1,
					'Dodge': 1,
					'Armor': 1,
				},
				// Stat Modifiers
				modifiers: {
					// Modifiers that users can change
					statAccuracy: 0,
					statDamage: 0,
					statDodge: 0,
					statArmor: 0,
					derivedMovement: 0,
					// Invisible modifiers provided by qualities
					qualityWoundBoxes: 0,
					baseMovement: 0,
					derivedAgility: 0,
					derivedBody: 0,
					derivedBrains: 0,
					specRAM: 0,
					specCPU: 0,
					specBIT: 0,
					qualityMovement: 0,
					qualityAccuracy: 0,
					qualityDamage: 0,
					qualityDodge: 0,
					qualityArmor: 0,
				},
				// Attacks and tags for Attacks
				attacks: {},
				freeAreaTags: {},
				freeEffectTags: {},
				freeFeatureTags: {},
				// Qualities and quality flags
				qualities: {},
				digizoidWeapon: false,
				digizoidArmor: false,
				optimization: false,
				specialization: 0,
				hybridPoints: 0,
				// List of effects on the character
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
				// Flag for whether we are on beneficial terrain
				terrainStatus: 'No',
				// Rage Tracker
				currentRage: 0,
				// Mode Change Tracker
				modeChangeActive: false,
				modeChangeActiveX0: false,
				modeChange: ['', ''],
				modeChangeX0: {
					'Accuracy': '',
					'Damage': '',
					'Dodge': '',
					'Armor': '',
				},
				// Summoner Tracker
				summoning: {
					minions: [],
					objects: [],
					currentPoints: null,
					summoner: false,
					conjurer: false,
					mixed: false,
					elemental: false,
				},
				// Digivolution flags
				darkDigivolution: false,
				dnaDigivolution: false,
				hybridDigivolution: false,
				armorDigivolution: false,
				bossDigivolution: false,
				// Custom Qualities
				customQualities: [],
			},
			// Lookup array of the proper names of each of these stats
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
			// Bool options for Elemental Terrain
			elementalTerrain: [
				'No',
				'Yes',
			],
			// Flag for whether to allow character to propagate to DDA_Container
			allowUpdate: true,
			// List of currently selected attack modifiers
			currentAttackModifiers: [],
			// Combat Stats Array
			combatStats: [
				'Accuracy',
				'Damage',
				'Dodge',
				'Armor',
			],
		};
	},
	computed: {
		baseMovement: function () {
			// Base Movement is composed of the baseMovement property
			// the baseMovement modifier
			// and an extra amount dependant on the burstModifier
			let value = (
				this.character.baseMovement +
				this.getModifier('baseMovement') +
				(this.character.burstModifier * this.library.burstScaling.baseMovement)
			);

			return value;
		},
		derivedMovement: function () {
			// Derived Movement is the baseMovement plus temporary (derivedMovement) and quality (qualityMovement) modifiers
			let value = this.baseMovement + this.getModifier('derivedMovement') + this.getModifier('qualityMovement');

			return value;
		},
		movementJumpHeight: function () {
			// If we have the Extra Movement - Jumper quality
			if (this.character.qualities['Extra Movement - Jumper']) {
				// If we have the Advanced Mobility - Jumper quality, we add 3*CPU to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Jumper'] ? (3 * this.specCPU) : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return half of our Movement (rounded down)
			return Math.floor(this.derivedMovement / 2);
		},
		movementJumpLength: function () {
			// If we have the Extra Movement - Jumper quality
			if (this.character.qualities['Extra Movement - Jumper']) {
				// If we have the Advanced Mobility - Jumper quality, we add CPU to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Jumper'] ? this.specCPU : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return half of our Movement (rounded down)
			return Math.floor(this.derivedMovement / 2);
		},
		movementSwimSpeed: function () {
			// If we have the Extra Movement - Swimmer quality
			if (this.character.qualities['Extra Movement - Swimmer']) {
				// If we have the Advanced Mobility - Swimmer quality, we add RAM to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Swimmer'] ? this.specRAM : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return half of our Movement (rounded down)
			return Math.floor(this.derivedMovement / 2);
		},
		movementFlightSpeed: function () {
			// If we have the Extra Movement - Flight quality
			if (this.character.qualities['Extra Movement - Flight']) {
				// If we have the Advanced Mobility - Flight quality, we add RAM to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Flight'] ? this.specRAM : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return 0
			return 0;
		},
		movementDigSpeed: function () {
			// If we have the Extra Movement - Digger quality
			if (this.character.qualities['Extra Movement - Digger']) {
				// If we have the Advanced Mobility - Digger quality, we add RAM to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Digger'] ? this.specRAM : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return 0
			return 0;
		},
		movementClimbSpeed: function () {
			// If we have the Extra Movement - Wallclimber quality
			if (this.character.qualities['Extra Movement - Wallclimber']) {
				// If we have the Advanced Mobility - Wallclimber quality, we add RAM to the return value
				let advancedMod = this.character.qualities['Advanced Mobility - Wallclimber'] ? this.specRAM : 0
				return this.derivedMovement + advancedMod;
			}
			// Otherwise return 0
			return 0;
		},
		movementTeleportSpeed: function () {
			// If we have the Teleport quality
			if (this.character.qualities['Teleport']) {
				// If we have the Transporter quality, we add 4 to the return value, otherwise 2
				let modifier = this.character.qualities['Transporter'] ? 4 : 2
				return this.baseMovement + modifier;
			}
			// Otherwise return 0
			return 0;
		},
		qualityHealth: function () {
			// the Health stat is the character Health stat plus quality (qualityWoundBoxes)
			return this.character.stats['Health'] + this.getModifier('qualityWoundBoxes');
		},
		qualityAccuracy: function () {
			// It is beneficial to have a computed property of the Accuracy stat without user modifiers (statAccuracy)
			return this.character.stats['Accuracy'] + this.getModifier('qualityAccuracy');
		},
		qualityDamage: function () {
			// It is beneficial to have a computed property of the Damage stat without user modifiers (statDamage)
			return this.character.stats['Damage'] + this.getModifier('qualityDamage');
		},
		qualityDodge: function () {
			// It is beneficial to have a computed property of the Dodge stat without user modifiers (statDodge)
			return this.character.stats['Dodge'] + this.getModifier('qualityDodge');
		},
		qualityArmor: function () {
			// It is beneficial to have a computed property of the Armor stat without user modifiers (statArmor)
			return this.character.stats['Armor'] + this.getModifier('qualityArmor');
		},
		statAccuracy: function () {
			return this.qualityAccuracy + this.getModifier('statAccuracy') + (this.character.terrainStatus === 'Yes' ? 2 : 0) - this.rageModifier('Rage', false);
		},
		statDamage: function () {
			return this.qualityDamage + this.getModifier('statDamage') + (this.character.terrainStatus === 'Yes' ? 2 : 0) + this.rageModifier('Rage', true);
		},
		statDodge: function () {
			return this.qualityDodge + this.getModifier('statDodge') + (this.character.terrainStatus === 'Yes' ? 2 : 0) - this.rageModifier('Berserker', false);
		},
		statArmor: function () {
			return this.qualityArmor + this.getModifier('statArmor') + (this.character.terrainStatus === 'Yes' ? 2 : 0) + this.rageModifier('Berserker', true);
		},
		derivedWoundBoxes: function () {
			// The sum total of Wound Boxes is the startingWoundBoxes count
			// plus the Health stat
			// plus the qualityWoundBoxes modiifer
			// plus an extra amount dependant on the burstModifier
			return (
				this.character.startingWoundBoxes +
				this.character.stats['Health'] +
				this.getModifier('qualityWoundBoxes') +
				(this.library ? (this.character.burstModifier * this.library.burstScaling.woundBoxes) : 0)
			);
		},
		derivedAgility: function () {
			// Get the size modifier for Agility
			let sizeMod = this.character.size in this.library.sizeLookup ? this.library.sizeLookup[this.character.size].agilityMod : 0;
			// Base Agility is (Accuracy + Dodge) / 2 (rounded down)
			let baseAgility = Math.floor((this.character.stats['Accuracy'] + this.character.stats['Dodge']) / 2);
			// Agility is baseAgility plus sizeMod plus the quality (derivedAgility) modifier
			return baseAgility + sizeMod + this.getModifier('derivedAgility');
		},
		derivedBody: function () {
			// Get the size modifier for Body
			let sizeMod = this.character.size in this.library.sizeLookup ? this.library.sizeLookup[this.character.size].bodyMod : 0;
			// Base Body is (Health + Damage + Armor) / 3 (rounded down)
			let baseBody = Math.floor((this.character.stats['Health'] + this.character.stats['Damage'] + this.character.stats['Armor']) / 3);
			// Body is baseBody plus sizeMod plus the quality (derivedBody) modifier
			return baseBody + sizeMod + this.getModifier('derivedBody');
		},
		derivedBrains: function () {
			// Base Brains is Accuracy / 2 (rounded down)
			let baseBrains = Math.floor(this.character.stats['Accuracy'] / 2);
			// Burst Brains is the burstModifier * the burstScaling brains
			let burstBrains = this.library ? (this.character.burstModifier * this.library.burstScaling.brains) : 0;
			// Brains is baseBrains + the character brainsMod (stage) + the burst brains modifier + the quality (derivedBrains) modifier
			return baseBrains + this.character.brainsMod + burstBrains + this.getModifier('derivedBrains');
		},
		specRAM: function () {
			// Base RAM is Agility / 10
			let baseRAM = Math.floor(this.derivedAgility / 10);
			// Burst RAM is the burstModifier * the burstScaling specValues
			let burstRAM = (this.character.burstModifier * this.library.burstScaling.specValues);
			// RAM is baseRAM + the character specMod (stage) + the burst RAM modifier + the quality (specRAM) modifier
			return baseRAM + this.character.specMod + burstRAM + this.getModifier('specRAM');
		},
		specCPU: function () {
			// Base CPU is Body / 10
			let baseCPU = Math.floor(this.derivedBody / 10);
			// Burst CPU is the burstModifier * the burstScaling specValues
			let burstCPU = (this.character.burstModifier * this.library.burstScaling.specValues);
			// CPU is baseCPU + the character specMod (stage) + the burst CPU modifier + the quality (specCPU) modifier
			return baseCPU + this.character.specMod + burstCPU + this.getModifier('specCPU');
		},
		specBIT: function () {
			// Base BIT is Brains / 10
			let baseBIT = Math.floor(this.derivedBrains / 10);
			// Burst BIT is the burstModifier * the burstScaling specValues
			let burstBIT = this.library ? (this.character.burstModifier * this.library.burstScaling.specValues) : 0;
			// BIT is baseBIT + the character specMod (stage) + the burst BIT modifier + the quality (specBIT) modifier
			return baseBIT + this.character.specMod + burstBIT + this.getModifier('specBIT');
		},
		passivePerception: function () {
			// We have to hard-code a Tracker check here, I don't think there's a good way to update this otherwise
			let base = this.character.qualities.hasOwnProperty('Tracker') ? 12 : 9;
			// Passive perception is base + BIT
			return base + this.specBIT;
		},
		burstRadius: function () {
			// Burst radius is the radius of the Burst Area circle from user
			// 0.5 for user, 1 for adjacent, half BIT (rounded down) for bonus length
			return 1.5 + Math.floor(this.specBIT / 2);
		},
		attackModifiers: function () {
			// The attack modifiers list is a quality => text object detailing the available attack modifiers
			let modifiers = {};
			// We loop all qualities on the character
			for (let quality in this.character.qualities) {
				// get the object for each and check the type
				let qualityObject = this.library.getQuality(quality);
				if (qualityObject.type === 'modifier') {
					// and if the type is modifier, add it to the list (object)
					modifiers[quality] = qualityObject.text;
				}
			}
			return modifiers;
		},
		modifierNegatives: function () {
			// The negatives list is the list of negative effects on a character from their modifiers
			let negatives = {};
			// Loop qualities
			for (let quality in this.character.qualities) {
				let qualityObject = this.library.getQuality(quality);
				// If the quality is a modifier and has a negative
				if (qualityObject.type === 'modifier' && qualityObject.hasOwnProperty('negative')) {
					// We add the negative to the list
					negatives[quality] = qualityObject.negative;
				}
			}
			return negatives;
		},
		specialFeatures: function () {
			// The special features list is the list of unique abilities a Digimon has
			let features = {};
			// Loop qualities
			for (let quality in this.character.qualities) {
				let qualityObject = this.library.getQuality(quality);
				// If it's a special quality
				if (qualityObject.type === 'special') {
					// Add it to the list
					features[quality] = qualityObject.text;
				}
			}
			return features;
		},
		passiveQualities: function () {
			// The passive qualities list is the list of qualities that always affect a Digimon
			let passives = {};
			// Loop qualities
			for (let quality in this.character.qualities) {
				let qualityObject = this.library.getQuality(quality);
				// If it's a passive quality
				if (qualityObject.type === 'passive') {
					// Add it to the list
					passives[quality] = qualityObject.text;
				}
			}
			return passives;
		},
		specialActions: function () {
			// The special actions list is all of the unique actions a Digimon can take
			let actions = {};
			// Loop
			for (let quality in this.character.qualities) {
				let qualityObject = this.library.getQuality(quality);
				// Action
				if (qualityObject.type === 'action') {
					// Add
					actions[quality] = qualityObject.text;
				}
			}
			return actions;
		},
		totalRage: function () {
			// Determines the maximum rage a Digimon can have
			return 'Berserker' in this.character.qualities ? 12 : 6;
		},
		summonPool: function () {
			let modifier = 'Mixed Summoner' in this.character.qualities ? 2 : 3;
			return this.specBIT * modifier;
		},
	},
	watch: {
		character: {
			handler: function () {
				// If allowUpdate is true, we send the character data to the DDA_Container component
				if (this.allowUpdate) {
					this.$emit('updateCharacter', this.character);
				}
				// We set allowUpdate to true after this check, so it can only be false once
				this.allowUpdate = true;
			},
			deep: true,
		},
		'character.stats.Health': function () {
			// If the health stat changes (a quality has been purchased), we refill currentWoundBoxes
			this.$set(this.character, 'currentWoundBoxes', this.derivedWoundBoxes);
		},
		digimon_data: function () {
			// If digimon_data is changed, we have received it from the DDA_Container parent
			// We do not want to update the parent when we assign digimon_data to the character object
			this.allowUpdate = false;
			// Assigning is to set this data from the parent
			this.character = Object.assign(this.character, this.digimon_data);
		},
		derivedWoundBoxes: function () {
			// If we are not loading the character, when derivedWoundBoxes (total health) changes, we refill currentWoundBoxes
			if (!this.character.loadCharacter) {
				this.$set(this.character, 'currentWoundBoxes', this.derivedWoundBoxes);
			}
			// Then we specify that the character is loaded
			this.loadCharacter = false;
		},
		'character.modifiers.qualityWoundBoxes': function () {
			// If the qualityWoundBoxes modifier changes (a quality has been purchased), we refill currentWoundBoxes
			this.$set(this.character, 'currentWoundBoxes', this.derivedWoundBoxes);
		},
		summonPool: function () {
			// When the summonPool total changes, we unmake and refund all existing summons
			let summonTypes = ['minions', 'objects'];
			for (let index in summonTypes) {
				for (let i in this.character.summoning[summonTypes[index]]) {
					this.character.summoning.currentPoints += this.character.summoning[summonTypes[index]][i].cost;
				}
				this.character.summoning[summonTypes[index]] = [];
			}

			this.character.summoning.currentPoints = this.summonPool;
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
			// Necessary for lookups of computed properties in loops
			return this[stat];
		},
		rollStat: function (stat) {
			// If the modifier is 0, we instead use -1
			let modifier = this[stat] > 0 ? '+' + this[stat] : '-1';
			// Send the roll details to the modal
			this.$refs.modal.activateModal(this.statsLookup[stat] + ' Roll: 3d6' + modifier);
		},
		poolCheck: function (stat) {
			// Send the pool check details to the modal
			this.$refs.modal.activateModal(stat + ' Pool Check: ' + this.character.stats[stat] + 'd6, [Roll20: ' + this.character.stats[stat] + 'd6>5]');
		},
		showQualities: function (qualityType) {
			// Get Quality List based on type requested
			let qualitiesList = this.library.qualities;
			switch (qualityType) {
				case 'optimization':
					qualitiesList = this.library.optimizationQualities;
					break;
				case 'area':
					qualitiesList = this.library.areaQualities;
					break;
				case 'effect':
					qualitiesList = this.library.effectQualities;
					break;
				case 'feature':
					qualitiesList = this.library.featureQualities;
					break;
				case 'modifier':
					qualitiesList = this.library.modifierQualities;
					break;
				case 'dark':
					qualitiesList = this.library.darkQualities;
					break;
				case 'dna':
					qualitiesList = this.library.dnaQualities;
					break;
				case 'hybrid':
					qualitiesList = this.library.hybridQualities;
					break;
				case 'armor':
					qualitiesList = this.library.armorQualities;
					break;
			}

			// We will build a list of the qualities available for purchase
			let availableQualities = {};
			for (let quality in qualitiesList) {
				// Get the quality object
				let qualityObject = qualitiesList[quality];
				// If we do not have the quality already
				// or the quality has unlimited ranks
				// or the quality has more ranks than we have purchased of it, it is okay to buy
				if (
					!this.character.qualities.hasOwnProperty(quality) ||
					qualityObject.ranks === 0 ||
					this.character.qualities[quality] < qualityObject.ranks
				) {
					// We approve by default, then filter out approvals based on certain conditions
					let approved = true;

					// If the digizoidWeapon flag is true and this quality is a digizoidWeapon, approved is marked as false
					// If the digizoidArmor flag is true and this quality is a digizoidArmor, approved is marked as false
					// If the quality is an optimization and we have already purchased an optimization, approved is marked as false
					// If the quality is a specialization and we have already purchased a specialization
					// we check if the character can purchase a specialization
					if (
						(qualityObject.digizoidWeapon && this.character.digizoidWeapon) ||
						(qualityObject.digizoidArmor && this.character.digizoidArmor) ||
						(qualityObject.optimization && this.character.optimization) ||
						(qualityObject.specialization && this.checkSpecialization())
					) {
						approved = false;
					} else if (qualityObject.specialization && this.character.optimization && this.character.hybridPoints) {
						// If we have an optimization, and any hybridPoints
						// we consider ourselves to be Ultimate stage because that is needed to buy hybrid drive
						// and so we waive the specialization requirements
						approved = !this.checkSpecialization();
					} else if (['Summoner', 'Conjurer'].indexOf(quality) !== -1) {
						// let option = quality === 'Summoner' ? 'conjurer' : 'summoner';
						approved = !this.character.summoning[quality === 'Summoner' ? 'conjurer' : 'summoner'];
					} else if (
						(qualityObject.digizoidWeapon && 'Digizoid Weapon' in this.character.qualities) ||
						(qualityObject.digizoidArmor && 'Digizoid Armor' in this.character.qualities)
					) {
						approved = true;
					} else {
						// convert to array of objects so we can do OR checks
						let prerequisites = Array.isArray(qualityObject.prerequisites) ? qualityObject.prerequisites : [qualityObject.prerequisites];
						let orFlag = false;
						for (let index in prerequisites) {
							// If approval does not fail via flags, we check all the prerequisities for purchasing this quality
							for (let prerequisite in prerequisites[index]) {
								// If the prerequisite is a stage
								if (prerequisite === 'Stage') {
									let stage = prerequisites[index][prerequisite];
									// We check that the index of our stage is equal to or greater than the index of the required stage
									approved = this.library.stages.indexOf(this.character.type) >= this.library.stages.indexOf(stage);
								} else {
									// Otherwise, we get the number of ranks we have in that prerequisite quality
									let qualityRank = this.character.qualities.hasOwnProperty(prerequisite) ? this.character.qualities[prerequisite] : 0;
									// and if we have less ranks than is required of that prerequisite quality, approved is marked as false
									if (prerequisites[index][prerequisite] > qualityRank) {
										approved = false;
									} else {
										orFlag = true;
									}
								}
							}
						}
						approved = approved || orFlag;
					}

					// If after all of these checks approved is still true, we add this quality to the list of available qualities
					if (approved) {
						availableQualities[quality] = qualityObject;
					}
				}
			}

			// Send the list of available qualities to the qualities modal
			this.$refs.qualities.activateModal(availableQualities);
		},
		getModifier: function (value) {
			// Returns the requested modifier if it is a number, otherwise 0
			return Number.isInteger(this.character.modifiers[value]) ? this.character.modifiers[value] : 0;
		},
		doAttack: function (attack) {
			// This method prepares a text description of a Digimon Attack
			// Each line will be stored in the details array
			let details = [];
			// The attackObject is a shorthand for referring to the attack defined in the character
			let attackObject = this.character.attacks[attack];

			if (attackObject) {
				// First add the Attack Name
				details.push('<b><u>' + attackObject.name + '</u></b>');

				// Then the general Accuracy for the Digimon
				details.push('<u>Accuracy:</u> ' + this.statAccuracy);

				// Then the general Damage for the Digimon
				if (attackObject.damage) {
					details.push('<u>Damage:</u> ' + this.statDamage);
				}

				// Next we detail the Attack's range.
				if (attackObject.type) {
					// We will build a range string to append to the details array
					let range = '';
					let rangeModifier = this.character.qualities['Data Specialization - Sniper'] ? 2 : 1;
					let meleeModifier = this.character.qualities['Data Specialization - Fistful of Force'] ? 1 : 0;
					// If the attack has an area tag
					if (attackObject.area) {
						// We need to prepare arguments for that quality's special method
						let args = [];
						// We get the quality object
						let qualityObject = this.library.getQuality(attackObject.area);
						// loop through its arguments
						for (let i in qualityObject.args) {
							// Then append the value to the args
							args.push(this.getAttackArgument(qualityObject.args[i]));
						}
						// Add the range modifier so we can calculate forSniper
						args.push(rangeModifier);
						// Add the melee modifier so we can calculate for Fistful of Force
						args.push(meleeModifier);

						// With our args list complete, we pass the attack type (melee/range) and args to the quality's method
						// and get back a string defining the Attack dimensions
						range = qualityObject.method(attackObject.type, args);
					} else if (attackObject.type === 'Range') {
						// if there is no area attack and the attack type is Range, we append the following
						range = 'Single target. ' + (1 + rangeModifier) + ' to ' + (2 * this.specBIT * rangeModifier) + ' Units';
					} else if (this.character.qualities['Reach']) {
						// If there is no area attack and the attack type is Melee and we have the Reach quality
						// we append the following
						range = 'Single target. ' + 1 + ' to ' + (1 + this.character.qualities['Reach']) + ' Units';
					} else {
						// if we do not have the Reach Quality, we return this
						range = 'Single target. ' + 1 + ' Unit';
					}

					// Add the range string to the details array
					details.push('<u>Range:</u> ' + range);
				}

				// Next we need to fill out the attack effect if there is one
				if (attackObject.effect) {
					// As with area attack, we prepare a list of arguments and pass them to the quality method
					let args = [];
					let qualityObject = this.library.getQuality(attackObject.effect);
					for (let i in qualityObject.args) {
						args.push(this.getAttackArgument(qualityObject.args[i]));
					}
					// If the attack does damage and the quality is not a stance, we append extra information
					let note = (attackObject.damage && !qualityObject.stance) ? ' Apply at least 2 damage to trigger. ' : ' ';
					// Then we use the arguments to send all this info to the quality method and add the response to details
					details.push('<u>' + attackObject.effect + ':</u>' + note + qualityObject.method(args));
				}

				// We can have multiple features, due to signature move, so we must loop through them
				for (let i in attackObject.features) {
					// But once inside the loop, things play out the same as for area attack and attack effect
					if (attackObject.features[i]) {
						let args = [];
						let qualityObject = this.library.getQuality(attackObject.features[i]);
						for (let j in qualityObject.args) {
							if (qualityObject.args[j] === 'ranks') {
								// If the argument is ranks, we check how many ranks of that quality we have
								args.push(this.character.qualities[attackObject.features[i]]);
							} else {
								args.push(this.getAttackArgument(qualityObject.args[j]));
							}
						}
						// Each feature is added to the details array
						details.push('<u>' + attackObject.features[i] + ':</u> ' + qualityObject.method(args));
					}
				}

				// We can have up to three modifiers applied to an attack as well
				// Uses select modifiers from a list by checking boxes on each modifier to be used
				// We loop through the modifiers in currentAttackModifiers
				for (let i in this.currentAttackModifiers) {
					// And play out the same logic as preparing a quality's method call as before
					let args = [];
					let qualityObject = this.library.getQuality(this.currentAttackModifiers[i]);
					for (let j in qualityObject.args) {
						args.push(this.getAttackArgument(qualityObject.args[j]));
					}
					details.push('<u>' + this.currentAttackModifiers[i] + ':</u> ' + qualityObject.method(args));
				}

				// Special Qualities are qualities that grant abilities that change attacks
				for (let quality in this.specialFeatures) {
					details.push('<u>' + quality + ':</u> ' + this.specialFeatures[quality]);
				}

				// Finally, we join the details array with two linebreaks per line and send this block to the modal
				this.$refs.modal.activateModal(details.join('<br><br>'));
			}
		},
		minionAttack: function (index) {
			let minion = this.character.summoning.minions[index];
			let details = [];

			// First add the Attack Name
			details.push('<b><u>Minion ' + this.intToChar(minion.identifier) + ' Attack</u></b>');

			// Then the general Accuracy for the Minion
			details.push('<u>Accuracy:</u> ' + minion.Accuracy);

			// Then the general Damage for the Minion
			details.push('<u>Damage:</u> ' + minion.Damage);

			let range = '';
			if (this.character.qualities['Reach']) {
				// If there is no area attack and the attack type is Melee and we have the Reach quality
				// we append the following
				range = 'Single target. ' + 1 + ' to ' + (1 + this.character.qualities['Reach']) + ' Units';
			} else {
				// if we do not have the Reach Quality, we return this
				range = 'Single target. ' + 1 + ' Unit';
			}

			// Add the range string to the details array
			details.push('<u>Range:</u> ' + range);

			// We can have up to three modifiers applied to an attack as well
			// Uses select modifiers from a list by checking boxes on each modifier to be used
			// We loop through the modifiers in currentAttackModifiers
			for (let i in this.currentAttackModifiers) {
				// And play out the same logic as preparing a quality's method call as before
				let args = [];
				let qualityObject = this.library.getQuality(this.currentAttackModifiers[i]);
				for (let j in qualityObject.args) {
					args.push(this.getAttackArgument(qualityObject.args[j]));
				}
				details.push('<u>' + this.currentAttackModifiers[i] + ':</u> ' + qualityObject.method(args));
			}

			// Special Qualities are qualities that grant abilities that change attacks
			for (let quality in this.specialFeatures) {
				details.push('<u>' + quality + ':</u> ' + this.specialFeatures[quality]);
			}

			// Finally, we join the details array with two linebreaks per line and send this block to the modal
			this.$refs.modal.activateModal(details.join('<br><br>'));
		},
		getAttackArgument: function (arg) {
			if (arg in this) {
				// If the argument request is in the DDA_Digimon container, we set it as the value
				return this[arg];
			} else if (arg in this.character) {
				// If the argument request is in the character object, we set it as the value
				return this.character[arg];
			} else if (arg in this.character.qualities) {
				// If the argument request is in the character's qualities, return the ranks of that Quality
				return this.character.qualities[arg];
			}

			return false;
		},
		checkSpecialization: function () {
			let stageIndex = this.library.stages.indexOf(this.character.type);
			// If the character's stage is below Burst, they can only purchase one specialization
			if (this.character.specialization) {
				return this.character.specialization === 2 || (stageIndex < this.library.stages.indexOf('Burst'));
			}
			return stageIndex < this.library.stages.indexOf('Ultimate');
		},
		rageModifier: function (rageType, modifier) {
			if (this.currentAttackModifiers.indexOf('Rage') !== -1) {
				let focusedRage = 'Focused Rage' in this.character.qualities;
				if (rageType in this.character.qualities) {
					return focusedRage && !modifier ? Math.floor(this.character.currentRage / 2) : this.character.currentRage;
				}
			}
			return 0;
		},
		/**
		* Setters
		*/
		changeBonus: function (attribute, modifier) {
			// Modifier can be 0 or 1. 0 for reduce, 1 for increase
			if (modifier) {
				this.character.bonusPoints++;
				this.character.bonusTotal++;
			} else if (this.character.bonusPoints > 0) {
				// If we're lowering the modifier, we must have at least one bonusPoint to reduce with it
				this.character.bonusPoints--;
				this.character.bonusTotal--;
			}
		},
		changeBurst: function (attribute, modifier) {
			// Modifier can be 0 or 1. 0 for reduce, 1 for increase
			if (modifier) {
				// When raising the burstModifier, we must raise the currentPoints and startingPoints for the character
				this.character.burstModifier++;
				this.character.currentPoints += this.library.burstScaling.startingDP;
				this.character.startingPoints += this.library.burstScaling.startingDP;
			} else if (
				this.character.burstModifier > 0 &&
				this.character.currentPoints >= this.library.burstScaling.startingDP
			) {
				// If we're lowering the modifier, we must have as many startingDP granted by it free to reduce
				this.character.currentPoints -= this.library.burstScaling.startingDP;
				this.character.startingPoints -= this.library.burstScaling.startingDP;
				this.character.burstModifier--;
			}
		},
		changeHealth: function (index) {
			// Index indicates which wound box was clicked on
			// If the index is less than or equal to the currentWoundBoxes, we reduce currentWoundBoxes, otherwise increase
			this.character.currentWoundBoxes += (index <= this.character.currentWoundBoxes ? -1 : 1);
		},
		addTemporary: function () {
			// we prompt the user for a number of temporary wound boxes to enter
			// and use parseInt to insist it is a number
			let input = Number.parseInt(prompt('Add X Temporary Wound Boxes:', 0));
			// if it is a number, and the input is less than 50 (arbitary maximum)
			if (Number.isInteger(input) && input < 50) {
				// We set the temporaryWoundBoxes for the character to this value
				this.$set(this.character, 'temporaryWoundBoxes', input);
			}
		},
		markTemporary: function () {
			// When a temporary wound box is clicked, we simply reduce the total by 1
			this.character.temporaryWoundBoxes -= 1;
		},
		updateProperty: function (value, property) {
			// basic updater. We receive a property of the character and a value to change it to, and then we do
			this.$set(this.character, property, value);
		},
		changeStat: function (stat, modifier) {
			// If character has been completed, we change stats using bonusPoints
			// If character has not been completed, we change stats using currentPoints
			let pointsToUse = this.character.creationComplete ? 'bonusPoints' : 'currentPoints';

			// Modifier can be 0 or 1. 0 for reduce, 1 for increase
			if (modifier && this.character[pointsToUse] > 0) {
				// Must have points to raise stats
				this.character.stats[stat]++;
				this.character[pointsToUse]--;
			} else if (!modifier && this['quality' + stat] > 0 && this.character.stats[stat] > 0) {
				// Stat must be above 0 to lower stat
				this.character.stats[stat]--;
				this.character[pointsToUse]++;
			}
		},
		changeMod: function (value, type) {
			// We ensure the modifier is an integer
			let modifier = Number.parseInt(value);
			// If the modifier is an integer, we set it as this modifier, otherwise 0
			this.character.modifiers[type] = (Number.isInteger(modifier) ? modifier : 0);
		},
		addQuality: function (quality) {
			// When adding a new quality, first we get the qualityObject from the library
			let qualityObject = this.library.getQuality(quality);

			// If creation is complete, we buy qualities with bonusPoints
			// If creation is not complete, we buy qualities with currentPoints
			let pointsToUse = this.character.creationComplete ? 'bonusPoints' : 'currentPoints';
			// If the quality cost is higher than our remaining points
			if (qualityObject.cost > this.character[pointsToUse]) {
				// We alert a failure to buy and return
				alert('Could not afford Quality: ' + quality);
				return;
			}

			// If the qualityObject has statMods (changes stats)
			// we loop over them first to ensure that none of these mods would bring a stat below 0
			// If they do, it's a fail
			if (qualityObject.hasOwnProperty('statMods')) {
				// We loop over the statMods
				for (let stat in qualityObject.statMods) {
					if (this[stat] + qualityObject.statMods[stat] < 0) {
						alert('A Quality that would lower a Stat below 0 cannot be taken.');
						return;
					}
				}
			}

			// Otherwise we subtract the cost from our points
			this.character[pointsToUse] -= qualityObject.cost;

			// Next, if the quality is in our list of qualities already
			// We increase the rank of that quality by 1
			// Otherwise we set the rank of the quality to 1
			let qualityRank = this.character.qualities.hasOwnProperty(quality) ? this.character.qualities[quality] + 1 : 1;
			this.$set(this.character.qualities, quality, qualityRank);

			// If the quality is an area quality, we add it to freeAreaTags
			// If the quality is an effect quality, we add it to freeEffectTags
			// If the quality is a feature quality, we add it to freeFeatureTags
			if (qualityObject.type === 'area') {
				this.$set(this.character.freeAreaTags, quality, false);
			} else if (qualityObject.type === 'effect') {
				this.$set(this.character.freeEffectTags, quality, false);
			} else if (qualityObject.type === 'feature') {
				this.$set(this.character.freeFeatureTags, quality, false);
			}

			// If the quality is Signature Move
			if (quality === 'Signature Move') {
				// If the character's first attack does not exist
				if (!this.character.attacks[1]) {
					// We create a blank attack with 2 features
					this.character.attacks[1] = {
						name: null,
						type: null,
						damage: false,
						area: '',
						effect: '',
						features: ['', ''],
					}
				} else {
					// Otherwise we add a feature to the character's first attack
					this.character.attacks[1].features.push('');
				}
			} else if (qualityObject.digizoidWeapon) {
				// If the qualityObject has the digizoidWeapon flag, we set the character digizoidWeapon flag
				this.character.digizoidWeapon = true;
			} else if (qualityObject.digizoidArmor) {
				// If the qualityObject has the digizoidArmor flag, we set the character digizoidArmor flag
				this.character.digizoidArmor = true;
			} else if (qualityObject.optimization) {
				// If the qualityObject has the optimization flag, we set the character optimization flag
				this.character.optimization = quality;
			} else if (qualityObject.specialization) {
				// if the quality is a specialization not of the optimization we purchased decrement hybridPoints
				if (!(this.character.optimization in qualityObject.prerequisites)) {
					this.character.hybridPoints--;
				}
				// if the quality has the specialization flag, we increment the specialization count
				this.character.specialization++;
			} else if (quality === 'Hybrid Drive') {
				// if the quality is Hybrid Drive, we increment the hybridPoints count
				this.character.hybridPoints++;
			} else if (qualityObject.summoning) {
				// if the quality is a summoning quality, we set the relevant flag to true
				this.character.summoning[qualityObject.summoning] = true;

				if (quality === 'Mixed Summoner') {
					// If we are adding Mixed Summoner, we acquire Conjurer/Summoner for free if we have the other
					this.$set(this.character.qualities, this.character.summoning.summoner ? 'Conjurer' : 'Summoner', 1);
					this.character.summoning[this.character.summoning.summoner ? 'conjurer' : 'summoner'] = true;
				}
			}

			// If the qualityObject has statMods (changes stats)
			if (qualityObject.hasOwnProperty('statMods')) {
				// We loop over the statMods
				for (let stat in qualityObject.statMods) {
					// and add each mod to their appropriate stat
					this.character.modifiers[stat] += qualityObject.statMods[stat];
				}
			}

			// Finally we close the qualities modal we purchased this quality from
			this.$refs.qualities.closeModal();
		},
		removeQuality: function (quality) {
			// When removing a quality, first we get the qualityObject from the library
			let qualityObject = this.library.getQuality(quality);

			// If creation is complete, we refund bonusPoints
			// If creation is not complete, we refund currentPoints
			let pointsToUse = this.character.creationComplete ? 'bonusPoints' : 'currentPoints';

			// Special handling for Summoning Qualities
			let pass = false;
			if ((quality === 'Conjurer' || quality === 'Summoner') && 'Elemental Summoner' in this.character.qualities) {
				// Summoner and Conjurer can be removed if the other exists while we have Elemental Summoner
				pass = this.character.summoning.summoner && this.character.summoning.conjurer;
			} else if ((quality === 'Conjurer' || quality === 'Summoner') && 'Mixed Summoner' in this.character.qualities) {
				// Summoner and Conjurer can be removed if the other exists while we have Mixed Summoner
				pass = this.character.summoning.summoner && this.character.summoning.conjurer;
				// We also lower the DP to balance out the refund of removing it as it was a free purchase with Mixed Summoner
				this.character[pointsToUse] -= qualityObject.cost;
			} else if (quality === 'Mixed Summoner' && (this.character.summoning.summoner && this.character.summoning.conjurer)) {
				alert('Cannot remove ' + quality + ' while Digimon has both Conjurer and Summoner');
				return;
			}

			// Next we check if the qualityObject has any unlocks
			if (!pass && qualityObject.unlocks.length) {
				// If it does, we loop over those
				for (let index in qualityObject.unlocks) {
					// and if the character has any of those qualities dependant on this one, removing fails
					if (this.character.qualities.hasOwnProperty(qualityObject.unlocks[index])) {
						// We alert the failure and return
						alert('Cannot remove ' + quality + ' while Digimon has dependant quality: ' + qualityObject.unlocks[index]);
						return;
					}
				}
			}

			if (qualityObject.type === 'area' && this.character.freeAreaTags[quality] && this.character.qualities[quality] === 1) {
				// If an area quality, we check whether that area quality is in use, and if so prevent removal
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			} else if (qualityObject.type === 'effect' && this.character.freeEffectTags[quality] && this.character.qualities[quality] === 1) {
				// If an effect quality, we check whether that effect quality is in use, and if so prevent removal
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			} else if (qualityObject.type === 'feature' && this.character.freeFeatureTags[quality] && this.character.qualities[quality] === 1) {
				// If a feature quality, we check whether that feature quality is in use, and if so prevent removal
				alert('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
				return;
			} else if (quality === 'Hybrid Drive' && this.character.hybridPoints === 0) {
				// If the Hybrid Drive quality and we are using all our Hybrid Drives, we cannot remove
				alert('Cannot remove ' + quality + ' as we are using it to purchase a Data Specialization. Remove the Specialization before removing this Quality.');
				return;
			} else if (qualityObject.optimization && this.character.specialization) {
				// If we are removing an optimization, and we have any data specializations, prevent doing so
				alert('Cannot remove ' + quality + ' while character has any Data Specializations. Remove the Specialization before removing this Quality.');
				return;
			}

			if (quality === 'Signature Move') {
				// If the quality is signature move, we remove the last feature in the first attack features array
				let feature = this.character.attacks[1].features.pop();
				if (feature) {
					// and if we did remove an existing feature, we allow it to be chosen again via the freeFeatureTag
					this.$set(this.character.freeFeatureTags, feature, false);
				}
			} else if (quality === 'Hybrid Drive') {
				// if the quality is Hybrid Drive, we decrement the hybridPoints count
				this.character.hybridPoints--;
			} else if (qualityObject.summoning) {
				// if the quality is a summoning quality, we set the relevant flag to false
				this.character.summoning[qualityObject.summoning] = false;

				let summonType = qualityObject.summoning === 'summoner' ? 'minions' : 'objects';
				for (let i in this.character.summoning[summonType]) {
					this.character.summoning.currentPoints += this.character.summoning[summonType][i].cost;
				}
				this.character.summoning[summonType] = [];
			}

			// If the quality changed stat modifiers
			if (qualityObject.hasOwnProperty('statMods')) {
				// Loop over those stat modifiers
				for (let stat in qualityObject.statMods) {
					// And remove each from the character's modifiers
					this.character.modifiers[stat] -= qualityObject.statMods[stat];
				}
			}

			// If the character only has one rank of this quality, they are removing it entirely
			if (this.character.qualities[quality] === 1) {
				// Remove the quality from the qualities list
				this.$delete(this.character.qualities, quality);

				if (qualityObject.type === 'area') {
					// if the quality is area, remove it from freeAreaTags
					this.$delete(this.character.freeAreaTags, quality);
				} else if (qualityObject.type === 'effect') {
					// if the quality is effect, remove it from freeEffectTags
					this.$delete(this.character.freeEffectTags, quality);
				} else if (qualityObject.type === 'feature') {
					// if the quality is feature, remove it from freeEffectTags
					this.$delete(this.character.freeFeatureTags, quality);
				}

				if (qualityObject.digizoidWeapon) {
					// if the quality has the digizoidWeapon flag, we set the character digizoidWeapon flag to false
					this.character.digizoidWeapon = false;
				} else if (qualityObject.digizoidArmor) {
					// if the quality has the digizoidArmor flag, we set the character digizoidArmor flag to false
					this.character.digizoidArmor = false;
				} else if (qualityObject.optimization) {
					// if the quality has the optimization flag, we set the character optimization flag to false
					this.character.optimization = false;
				} else if (qualityObject.specialization) {
					// if the quality is a specialization not of the optimization we purchased increment hybridPoints
					if (!(this.character.optimization in qualityObject.prerequisites)) {
						this.character.hybridPoints++;
					}
					// if the quality has the specialization flag, we decrement the specialization count
					this.character.specialization--;
				}

				// if the quality exists in the ecurrentAttackModifiers list
				let attackModIndex = this.currentAttackModifiers.indexOf(quality);
				if (attackModIndex !== -1) {
					// We remove it from that list
					this.currentAttackModifiers.splice(attackModIndex, 1);
				}
			} else {
				// If we're not removing the quality entirely, we just reduce its rank by 1
				this.$set(this.character.qualities, quality, this.character.qualities[quality] - 1);
			}

			// Refund cost of quality
			this.character[pointsToUse] += qualityObject.cost;
		},
		updateAttack: function (newAttackData, attack) {
			// If the changed attack has an area tag and this tag is specified in freeAreaTags, we set it to used (true)
			if (newAttackData.area && this.character.freeAreaTags.hasOwnProperty(newAttackData.area)) {
				this.character.freeAreaTags[newAttackData.area] = true;
			}

			// If the current attack exists, and its area tag is different to the new attack's area tag
			if (
				this.character.attacks[attack] &&
				this.character.attacks[attack].area &&
				(this.character.attacks[attack].area !== newAttackData.area)
			) {
				// we set the current area tag as unused (false)
				this.character.freeAreaTags[this.character.attacks[attack].area] = false;
			}

			// If the changed attack has an effect tag and this tag is specified in freeEffectTags, we set it to used (true)
			if (newAttackData.effect && this.character.freeEffectTags.hasOwnProperty(newAttackData.effect)) {
				this.character.freeEffectTags[newAttackData.effect] = true;
			}

			// If the current attack exists, and its effect tag is different to the new attack's effect tag
			if (
				this.character.attacks[attack] &&
				this.character.attacks[attack].effect &&
				(this.character.attacks[attack].effect !== newAttackData.effect)
			) {
				// we set the current effect tag as unused (false)
				this.character.freeEffectTags[this.character.attacks[attack].effect] = false;
			}

			// For each feature on the changed attack
			for (let i in newAttackData.features) {
				// If the changed attack has a feature tags and this tag is specified in freeFeaturesTag, we set it to used (true)
				if (newAttackData.features[i] && this.character.freeFeatureTags.hasOwnProperty(newAttackData.features[i])) {
					this.character.freeFeatureTags[newAttackData.features[i]] = true;
				}

				// If the current attack exists, and this feature tag is different to the new attack's feature tag
				if (
					this.character.attacks[attack] &&
					this.character.attacks[attack].features[i] &&
					(this.character.attacks[attack].features[i] !== newAttackData.features[i])
				) {
					// we set the current feature tag as unused (false)
					this.character.freeFeatureTags[this.character.attacks[attack].features[i]] = false;
				}
			}

			// Finally we assign the newAttackData over the existing attack
			this.character.attacks[attack] = Object.assign({}, newAttackData);
		},
		applyModifier: function (evt) {
			// If the checkbox for the modifier was checked
			if (evt.target.checked) {
				// We see if we have a total of 3 modifiers already
				if (this.currentAttackModifiers.length === 3) {
					// If we do, we alert this, and reset the checkbox and return
					alert('No more than 3 Attack Modifiers can be applied at one time.');
					evt.target.checked = false;
					return;
				}
				// Otherwise we add the modifier to the currentAttackModifiers list
				this.currentAttackModifiers.push(evt.target.name);
			} else {
				// if the checkbox is unchecked we get the index of the modifier in currentAttackModifiers
				let index = this.currentAttackModifiers.indexOf(evt.target.name);
				if (index > -1) {
					// and if the index exists, we just remove that modifier from the list
					this.currentAttackModifiers.splice(index, 1);
				}
			}
		},
		changeRage: function (index) {
			this.character.currentRage += (index <= this.character.currentRage ? -1 : 1);
		},
		doModeChange: function () {
			let statOne = this.character.stats[this.character.modeChange[0]];
			let statTwo = this.character.stats[this.character.modeChange[1]];
			if (this.character.modeChangeActive) {
				this.character.modifiers['quality' + this.character.modeChange[0]] += (statOne - statTwo);
				this.character.modifiers['quality' + this.character.modeChange[1]] += (statTwo - statOne);
			} else {
				this.character.modifiers['quality' + this.character.modeChange[0]] += (statTwo - statOne);
				this.character.modifiers['quality' + this.character.modeChange[1]] += (statOne - statTwo);
			}

			this.character.modeChangeActive = !this.character.modeChangeActive;
		},
		doModeChangeX0: function () {
			let reassignments = {
				'Accuracy': 0,
				'Damage': 0,
				'Dodge': 0,
				'Armor': 0,
			};
			for (let stat in reassignments) {
				if (this.character.modeChangeX0[stat] && this.character.modeChangeX0[stat] !== stat) {
					let statOne = this.character.stats[stat];
					let statTwo = this.character.stats[this.character.modeChangeX0[stat]];
					if (this.character.modeChangeActiveX0) {
						reassignments[stat] = (statOne - statTwo);
					} else {
						reassignments[stat] = (statTwo - statOne);
					}
				}
			}

			for (let stat in reassignments) {
				this.character.modifiers['quality' + stat] += reassignments[stat];
			}

			this.character.modeChangeActiveX0 = !this.character.modeChangeActiveX0;
		},
		conjure: function () {
			let points = Number.parseInt(prompt('Enter a number of Summoning Points to spend between 1 and ' + (1 + this.specBIT)));
			if (!Number.isInteger(points) || !(points > 0 && points <= (1 + this.specBIT))) {
				alert('Incorrect number of Summoning Points spent');
				return;
			} else if (points > this.character.summoning.currentPoints) {
				alert('More than remaining Summoning Points spent');
				return;
			}

			this.character.summoning.currentPoints -= points;

			let bonus = points - 1;
			let size = 1 + Math.floor(bonus / 2);

			// Building an identifier
			let options = Object.keys(this.character.summoning.objects);
			options.push(options.length);
			for (let i in this.character.summoning.objects) {
				let optIndex = options.indexOf(this.character.summoning.objects[i].identifier.toString());
				if (optIndex !== -1) {
					options.splice(optIndex, 1);
				}
			}

			// Adding the conjured object
			this.character.summoning.objects.push({
				identifier: options[0],
				cost: points,
				currentWoundBoxes: this.specBIT + (2 * bonus),
				totalWoundBoxes: this.specBIT + (2 * bonus),
				Armor: (this.specBIT * 2),
				Dodge: 0,
				size: size + ' x ' + size,
			});
		},
		summon: function () {
			let points = Number.parseInt(prompt('Enter a number of Summoning Points to spend between 2 and ' + (2 + this.specBIT)));
			if (!Number.isInteger(points) || !(points > 1 && points <= (2 + this.specBIT))) {
				alert('Incorrect number of Summoning Points spent');
				return;
			} else if (points > this.character.summoning.currentPoints) {
				alert('More than remaining Summoning Points spent');
				return;
			}

			this.character.summoning.currentPoints -= points;

			let bonus = points - 2;

			// Building an identifier
			let options = Object.keys(this.character.summoning.minions);
			options.push(options.length);
			for (let i in this.character.summoning.minions) {
				let optIndex = options.indexOf(this.character.summoning.minions[i].identifier.toString());
				if (optIndex !== -1) {
					options.splice(optIndex, 1);
				}
			}

			// Adding the summoned minion
			this.character.summoning.minions.push({
				identifier: options[0],
				cost: points,
				currentWoundBoxes: this.specBIT + bonus,
				totalWoundBoxes: this.specBIT + bonus,
				Armor: this.specBIT,
				Dodge: 0,
				Accuracy: this.specBIT + bonus,
				Damage: 1 + bonus,
				size: '1 x 1',
				movement: this.derivedBrains,
			});
		},
		changeSummonHealth (value, type, index) {
			this.character.summoning[type][index].currentWoundBoxes += (value <= this.character.summoning[type][index].currentWoundBoxes ? -1 : 1);
		},
		destroySummon: function (type, index) {
			this.character.summoning.currentPoints += this.character.summoning[type][index].cost;
			this.$delete(this.character.summoning[type], index);
		},
		intToChar: function (n) {
			return String.fromCharCode(65 + Number.parseInt(n));
		},
		addCustomQuality: function () {
			this.character.customQualities.push('');
		},
		removeCustomQuality: function (index) {
			this.$delete(this.character.customQualities, index);
		},
		updateCustomQuality: function (value, index) {
			this.$set(this.character.customQualities, index, value);
		},
	},
	created: function () {
		// retrieve the library data
		this.library = require('./library');
		// set the character for the first time
		this.character = Object.assign(this.character, this.digimon_data);
		// send an update signal to the parent to standardise this data on btoh sides
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

	img.characterImage {
		max-width: 400px;
		max-height: 450px;
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

	label.labelTag {
		min-width: 200px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		min-height: 30px;
	}

	select.labelInput {
		min-width: 169px;
		margin-bottom: 10px;
		text-align: center;
	}

	span.deleteButton {
		color: red;
		cursor: pointer;
		float: right;
		position: relative;
		margin-right: 20px;
		margin-top: 10px;
	}

	div.summonDiv {
		min-width: 250px;
		display: inline-block;
		margin-right: 10px;
		margin-left: 30px;
		margin-bottom: 30px;
		padding: 10px;
		border-style: solid;
	}

	span.roller {
		cursor: pointer;
		float: right;
		position: relative;
	}
</style>

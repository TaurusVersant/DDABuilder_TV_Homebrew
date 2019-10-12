module.exports.burstScaling = {
	startingDP: 15,
	baseMovement: 2,
	woundBoxes: 4,
	brains: 3,
	specValues: 1,
};

module.exports.specialDigivolutions = [
	'Dark',
	'DNA',
	'Hybrid',
	'Armor',
	'Boss',
];

module.exports.families = [
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
];

module.exports.attributes = [
	'Vaccine',
	'Virus',
	'Data',
	'Free',
];

module.exports.stages = [
	'Fresh',
	'In-Training',
	'Rookie',
	'Champion',
	'Ultimate',
	'Mega',
	'Burst',
];

module.exports.sizes = [
	'Tiny',
	'Small',
	'Medium',
	'Large',
	'Huge',
	'Gigantic',
];

module.exports.combatStats = {
	statAccuracy: 'Accuracy',
	statDamage: 'Damage',
	statDodge: 'Dodge',
	statArmor: 'Armor',
};

module.exports.derivedStats = {
	derivedAgility: 'Agility',
	derivedBody: 'Body',
	derivedBrains: 'Brains',
};

module.exports.specStats = {
	specRAM: 'RAM [Agility]',
	specCPU: 'CPU [Body]',
	specBIT: 'BIT [Brains]',
};

module.exports.sizeLookup = {
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
};

module.exports.getQuality = function (quality) {
	if (quality in this.qualities) {
		return this.qualities[quality];
	}
	if (quality in this.areaQualities) {
		return this.areaQualities[quality];
	}
	if (quality in this.effectQualities) {
		return this.effectQualities[quality];
	}
	if (quality in this.featureQualities) {
		return this.featureQualities[quality];
	}
	if (quality in this.modifierQualities) {
		return this.modifierQualities[quality];
	}
	if (quality in this.optimizationQualities) {
		return this.optimizationQualities[quality];
	}

	return {};
};

/* Quality Types
 *
 * quality - default type, does nothing special
 * modifier - appears as a list under the digimon's attacks, with checkboxes for selecting modifiers
 * special - qualities that can affect attack rolls
 * passive - qualities that can affect non-attack rolls
 * action - qualities that grant special actions that can be made in combat
 * area - area effect qualities
 * effect - attack effect qualities
 * feature - attack feature qualities
 */

module.exports.optimizationQualities = {
	'Data Optimization - Close Combat': {
		type: 'modifier',
		optimization: true,
		cost: 1,
		ranks: 1,
		text: 'The Digimon gains a +2 bonus to its Accuracy when using a [Melee] tagged Attack, but takes a -1 Armor penalty.',
		unlocks: ['Data Specialization - Fistful of Force', 'Data Specialization - Flurry'],
		prerequisites: {},
		args: [],
		method: function (args) {
			return '[Melee] Atacks only. Add 2 to the Accuracy of this Attack.';
		},
		statMods: {
			qualityArmor: -1,
		},
	},
	'Data Specialization - Fistful of Force': {
		type: 'special',
		specialization: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon’s [Melee] tagged [Area] Attacks now scale for area size as if they were [Range] Attacks. The [Range] deadzone of adjacent Units does not apply.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Close Combat': 1,
		},
	},
	'Data Specialization - Flurry': {
		type: 'passive',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon may make an additional [Melee] [Damage] Attack once per Round for free. This Attack has no Tags applied to it, and cannot benefit from Attack Modifiers.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Close Combat': 1,
		},
	},
	'Data Optimization - Ranged Striker': {
		type: 'modifier',
		optimization: true,
		cost: 1,
		ranks: 1,
		text: 'The Digimon gains a +2 bonus to its Accuracy when using a [Range] tagged Attack, but takes a -1 Dodge penalty.',
		unlocks: ['Data Specialization - Sniper', 'Data Specialization - Mobile Artillery'],
		prerequisites: {},
		args: [],
		method: function (args) {
			return '[Range] Atacks only. Add 2 to the Accuracy of this Attack.';
		},
		statMods: {
			qualityDodge: -1,
		},
	},
	'Data Specialization - Sniper': {
		type: 'special',
		specialization: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon’s maximum range for [Range] Attacks is considered doubled. The Digimon takes a -1 Base Movement Penalty, and can no longer target foes within two Units of it. Scale [Area Attack] dimensions accordingly.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Ranged Striker': 1,
		},
		statMods: {
			baseMovement: -1,
		},
	},
	'Data Specialization - Mobile Artillery': {
		type: 'modifier',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon adds its CPU value to the damage dealt by [Range][Area] tagged Attacks. The Digimon takes a -1 Base Movement Penalty.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Ranged Striker': 1,
		},
		statMods: {
			baseMovement: -1,
		},
		args: ['specCPU'],
		method: function (args) {
			return '[Range][Area] Attacks only. Add ' + args[0] + ' to the Damage of this Attack.';
		},
	},
	'Data Optimization - Guardian': {
		type: 'quality',
		optimization: true,
		cost: 1,
		ranks: 1,
		text: 'The Digimon gains a +2 Armor bonus, but takes a -1 penalty to its Base Movement score.',
		unlocks: ['Data Specialization - What Goes Around', 'Data Specialization - True Guardian'],
		prerequisites: {},
		statMods: {
			qualityArmor: 2,
			baseMovement: -1,
		},
	},
	'Data Specialization - What Goes Around': {
		type: 'passive',
		specialization: true,
		cost: 2,
		ranks: 1,
		text: 'Whenever the Digimon is hit by a [Melee] Attack, it deals damage equal to its CPU Value to the opponent. This damage is reduced by Armor but cannot be Dodged. The damage dealt by this Quality, however, cannot be brought below 2.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Guardian': 1,
		},
	},
	'Data Specialization - True Guardian': {
		type: 'passive',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'Whenever the Digimon Intercedes, it gains a bonus to Armor equal to the distance traveled to Intercede, and the Digimon is not affected by any [Effect] tags on the Attack. Additionally, once per round the Digimon does not lose a Simple Action in the next round for interceding. The Digimon takes a -2 Accuracy Penalty.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Guardian': 1,
		},
		statMods: {
			qualityAccuracy: -2,
		},
	},
	'Data Optimization - Brawler': {
		type: 'passive',
		optimization: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon gains a +4 bonus to Body Skill Checks it makes when Clashing.',
		unlocks: ['Data Specialization - Power Throw', 'Data Specialization - Wrestlemania'],
		prerequisites: {},
	},
	'Data Specialization - Power Throw': {
		type: 'passive',
		specialization: true,
		cost: 2,
		ranks: 1,
		text: 'Whenever the Digimon throws a target, it adds its CPU value to its Damage.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Brawler': 1,
		},
	},
	'Data Specialization - Wrestlemania': {
		type: 'action',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon may use a [Clash] Tagged Attack as a free Action against a target it is not Clashing with once per Round.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Brawler': 1,
		},
	},
	'Data Optimization - Speed Striker': {
		type: 'quality',
		optimization: true,
		cost: 1,
		ranks: 1,
		text: 'The Digimon gains a +2 bonus to its Base Movement score.',
		unlocks: ['Data Specialization - Hit and Run', 'Data Specialization - Uncatchable Target'],
		prerequisites: {},
		statMods: {
			baseMovement: 2,
		},
	},
	'Data Specialization - Hit and Run': {
		type: 'modifier',
		specialization: true,
		cost: 2,
		ranks: 1,
		text: 'Whenever the Digimon moves before using a [Melee] Attack, they may add their RAM stat to the Damage. If the Digimon moves as part of a [Pass] or [Charge], this effect will still apply.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Speed Striker': 1,
		},
		args: ['specRAM'],
		method: function (args) {
			return '[Melee] Attacks only. When moving before using an Attack (whether by action or a quality like [Pass] or [Charge]) add ' + args[0] + ' to Damage.';
		},
	},
	'Data Specialization - Uncatchable Target': {
		type: 'passive',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon gains a +3 Dodge bonus. The Digimon gains a +4 to Agility Skill Checks made when Clashing. If the Digimon succeeds an Agility Skill Check to escape a Clash, the Digimon may move up to its RAM stat in any direction as a free action. The Digimon’s Dodge Stat cannot be lowered by any means in combat.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Speed Striker': 1,
		},
		statMods: {
			qualityDodge: 3,
		},
	},
	'Data Optimization - Effect Warrior': {
		type: 'quality',
		optimization: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon gains a +1 bonus to its base Spec Values, but takes a -2 Armor penalty.',
		unlocks: ['Data Specialization - White Mage', 'Data Specialization - Black Mage'],
		prerequisites: {},
		statMods: {
			specRAM: 1,
			specCPU: 1,
			specBIT: 1,
			qualityArmor: -2,
		},
	},
	'Data Specialization - White Mage': {
		type: 'special',
		specialization: true,
		cost: 1,
		ranks: 1,
		text: 'This Digimon can freely choose the targets of Positive [Effect] Tagged [Area] Attacks regardless of the number of targets within its [Area] dimensions.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Effect Warrior': 1,
		},
	},
	'Data Specialization - Black Mage': {
		type: 'special',
		specialization: true,
		cost: 1,
		ranks: 1,
		text: 'This Digimon can freely choose the targets of Negative [Effect] Tagged [Area] Attacks regardless of the number of targets within its [Area] dimensions.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Effect Warrior': 1,
		},
	},
	'Data Optimization - Stealth Attacker': {
		type: 'action',
		optimization: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon takes a -1 penalty to its Body Stat. Once per Round, a Digimon with this Quality may make a Stealth Check as a free Action during their turn.',
		unlocks: ['Data Specialization - Ninja', 'Data Specialization - Assassin'],
		prerequisites: {},
		statMods: {
			derivedBody: -1,
		},
	},
	'Data Specialization - Ninja': {
		type: 'modifier',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'This Digimon may treat all of its Attacks as having the [Sneak Attack] Feature tag. This does not prevent the Attack from having a purchased Attack Feature tag. This does not stack with a purchased [Sneak Attack] Tag. Applying this Feature counts as using an Attack Modifier.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Stealth Attacker': 1,
		},
		args: ['specRAM'],
		method: function (args) {
			return 'When attacking from Stealth, increase the Accuracy of this Attack by ' + args[0] + '.';
		},
	},
	'Data Specialization - Assassin': {
		type: 'special',
		specialization: true,
		cost: 3,
		ranks: 1,
		text: 'This Digimon may treat all of its Attacks as having the [Critical] Feature tag. This does not prevent the Attack from having a purchased Attack Feature tag. This does not stack with a purchased [Critical] Tag. Applying this Feature does not count as using an Attack Modifier.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
			'Data Optimization - Stealth Attacker': 1,
		},
		args: ['specRAM'],
		method: function (args) {
			return 'When the difference between your rolled Accuracy and your opponent\'s rolled Dodge is ' + args[0] + ' or higher, add ' + args[0] + ' to the Damage of this Attack.';
		},
	},
	'Hybrid Drive': {
		type: 'quality',
		cost: 2,
		ranks: 2,
		text: 'For each rank of Hybrid Drive taken, instead of a Data Specialization that requires your Data Optimization, you may instead taken a Data Specialization from another branch. You must still pay the cost of the Data Specialization after purchasing a rank in Hybrid Drive and obey the Stage limitations.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
		},
	},
};

module.exports.areaQualities = {
	'Area Attack - Blast': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Range] attack. Creates a Circle of radius 1 + half BIT (rounded down), with its midpoint within the user’s range (BITx2).',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let radius = ((1 + Math.floor(args[0] / 2)) * args[1]) + '.5 Units';
				let range = (2 * args[0] * args[1]) + ' Units';
				return 'Circle with radius ' + radius + ' centered within ' + (1 + args[1]) + ' to ' + range + '.';
			}
			return 'Cannot apply Area Attack - Blast to [Melee] Attacks.';
		},
	},
	'Area Attack - Burst': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Melee] or [Range] attack. Creates a Circle with its midpoint as the user. If [Melee], the Circle touches every adjacent Unit to the user. If [Range], its radius is 1 + half BIT (rounded down) with the user as the midpoint, but does not affect the user or adjacent Units.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let radius = ((1 + Math.floor(args[0] / 2)) * args[1]) + '.5 Units';
				let origin = args[1] === 2 ? ' from 2 Units' : ' from adjacent Unit';
				return 'Circle with radius ' + radius + origin + ' centered around user. Does not affect adjacent Units.';
			}

			if (args[2]) {
				let radius = ((1 + Math.floor(args[0] / 2)) * args[1]) + '.5 Units';
				return 'Circle with radius ' + radius + ' from adjacent Unit centered around user.';
			}

			return 'All adjacent Units to user.';
		},
	},
	'Area Attack - Close Blast': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Melee] or [Range] attack. Creates a Circle extending out from a Unit diagonally adjacent to the user. The diameter of the circle is 3 [Melee] or 3 + half BIT (rounded down)  [Range]. If the attack is [Range] it will not affect the adjacent Unit.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let diameter = ((3 + Math.floor(args[0] / 2)) * args[1]) + ' Units';
				let origin = args[1] === 2 ? '2 Units.' : 'Unit.';
				return 'Circle with diameter ' + diameter + ' from diagonal adjacent to user. Does not affect adjacent ' + origin;
			}

			if (args[2]) {
				let diameter = ((3 + Math.floor(args[0] / 2)) * args[1]) + ' Units';
				return 'Circle with diameter ' + diameter + ' from diagonal adjacent to user.';
			}

			return 'Circle with diameter 3 Units from diagonal adjacent to user.';
		},
	},
	'Area Attack - Cone': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Melee] or [Range] attack. Creates a Cone extending out from a Unit vertically or horizontally adjacent to the user. The length of the cone is 3 [Melee] or 3 + half BIT (rounded down) [Range]. If the attack is [Range], it will not affect the adjacent Unit.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let length = ((3 + Math.floor(args[0] / 2)) * args[1]) + ' Units';
				let origin = args[1] === 2 ? '2 Units.' : 'Unit.';
				return 'Cone with length ' + length + '  horizontally/vertically from user. Does not affect adjacent ' + origin;
			}

			if (args[2]) {
				let length = ((3 + Math.floor(args[0] / 2)) * args[1]) + ' Units';
				return 'Cone with length ' + length + '  horizontally/vertically from user.';
			}

			return 'Cone with length 3 Units horizontally/vertically from user.';
		},
	},
	'Area Attack - Line': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Melee] or [Range] attack. reates a Line extending out from a Unit vertically or horizontally adjacent to the user. The length of the line is 5 [Melee] or 5 + BIT [Range]. The width of the line is 1 by default, but increases to 2 for Huge Size characters, and 3 for Gigantic Size. If the line makes impact with a wall or any flat surface, it may “bounce” at an appropriate angle and continue on.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT', 'size'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			let width = (args[1] === 'Gigantic' ? 3 : args[1] === 'Huge' ? 2 : 1) + ' Units';
			if (type === 'Range') {
				let length = ((5 + args[0]) * args[2]) + ' Units';
				let origin = args[2] === 2 ? '2 Units.' : 'Unit.';
				return 'Line with length ' + length + ', width ' + width + ' horizontally/vertically from user. Does not affect adjacent ' + origin;
			}

			if (args[2]) {
				let length = ((5 + args[0]) * args[2]) + ' Units';
				return 'Line with length ' + length + ', width ' + width + ' horizontally/vertically from user.';
			}

			return 'Line with length 5 Units, width ' + width + ' horizontally/vertically from user.';
		},
	},
	'Area Attack - Linger': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Range] attack. Creates a Circle of Radius 1 + half [BIT - 1] (rounded down) within the user’s range (BITx2). The Linger will last 3 Rounds. When a character enters or ends their turn inside of this circle (only apply this effect once per character per round), make an Accuracy Roll at Accuracy-(number of times this Linger Circle has triggered). Then play out the Attack as normal. If the Accuracy of the Linger reaches 0 before the 3 Rounds are up, the Linger disappears.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let radius = ((1 + Math.floor((args[0] - 1) / 2)) * args[1]) + '.5 Units';
				let range = (2 * args[0]) + ' Units';
				return 'Circle with radius ' + radius + ' centered within ' + (1 + args[1]) + ' to ' + range + '.';
			}
			return 'Cannot apply Area Attack - Linger to [Melee] Attacks.';
		},
	},
	'Area Attack - Missile': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Range] attack. Select up to three targets within [Burst][Range] range [1 + half BIT (rounded down) radius around user, adjacent not included]. Make Accuracy Rolls against only these targets.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Range') {
				let radius = ((1 + Math.floor((args[0]) / 2)) * args[1]) + '.5 Units';
				let origin = args[1] === 2 ? '2 Units.' : 'Unit.';
				return 'Three targets within circle with radius ' + radius + ' centered around user. Does not affect adjacent ' + origin;
			}
			return 'Cannot apply Area Attack - Missile to [Melee] Attacks.';
		},
	},
	'Area Attack - Pass': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Move in a single straight line for a distance between your RAM and Movement Scores. You cannot end this attack in the same square as a target - if you cannot pass over them, end before them. This attack still applies to that target. Each target in the line you moved is attacked by this attack. This attack must be made as a Complex Action, unless the Charge or Retreat Attack Features are also applied to this attack.',
		unlocks: [],
		prerequisites: {},
		args: ['specRAM', 'derivedMovement'],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Melee') {
				return 'Move in a straight line between ' + args[0] + ' and ' + args[1] + ' Units. Each target in this line is affected by this attack. This uses a Complex Action without Charge or Retreat.';
			}
			return 'Cannot apply Area Attack - Pass to [Range] Attacks.';
		},
	},
	'Area Attack - Suppress': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'The user must be adjacent to an Elemental Terrain Unit to use this attack. The Elemental Terrain Unit, and all connected Elemental Terrain Units, are the dimensions of this attack. Each Elemental Terrain Unit returns to a neutral Unit after the attack. The Accuracy of this Attack increases by 1 for each Unit affected.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (type, args) {
			// the last entries in args will always be the Range Modifier (1 or 2) and Melee Modifier (0 or 1)
			if (type === 'Melee') {
				return 'The dimensions of this attack are all connected Elemental Terrain Units to the Elemental Terrain Unit adjacent to the user. Increase Accuracy by 1 per Unit affected.';
			}
			return 'Cannot apply Area Attack - Suppress to [Range] Attacks.';
		},
	},
};

module.exports.effectQualities = {
	'Positive Effect - Cleanse': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The user may reduce the duration of a number of Effects equal to the leftover Accuracy Dice (for example, if there were 3 Leftover Accuracy dice, it may target up to 3 Effects), and reduce their duration by a number of turns equal to their BIT Value. Even if applied to an [Area] Attack, Cleanse may only target a total number of Effects equal to the highest number of leftover accuracy dice from among the targets. See the DDA-TV Homebrew manual for more information.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'No duration. Reduce as many Effects as there are leftover Accuracy Dice on targets by ' + args[0] + ' Rounds.';
		},
	},
	'Positive Effect - Courageous Charge': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'Increase all Movement scores by BITx2.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Movement scores by ' + (args[0] * 2) + '.';
		},
	},
	'Positive Effect - Fury': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target gains a bonus to their Accuracy and Damage scores equal to the user’s BIT value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Accuracy and Damage by ' + args[0] + '.';
		},
	},
	'Positive Effect - Haste': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target of the Attack gains an additional Simple Action to use for one round. This Effect has no Duration. An Area Attack with the Haste Effect must be used as a Complex Action.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'No Duration. The target gains an additional Simple Action on their next turn. If an Area Attack, this Attack requires a Complex Action.';
		},
	},
	'Positive Effect - Intensify': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'This Attack Effect does not have a duration. Instead, immediately increase the Potency of all Attack Effects of affected targets by 1.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'No Duration. Increase the Potency of all Attack Effects of affected targets by 1.';
		},
	},
	'Positive Effect - Lengthen': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'This Attack Effect does not have a duration. Instead, immediately increase the Duration of all Attack Effects of affected targets by 1.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'No Duration. Increase the Duration of all Attack Effects of affected targets by 1.';
		},
	},
	'Positive Effect - Lifesteal': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'This Attack heals a number of the user’s Wound Boxes equal to the user’s CPU value. If the Attack deals damage less than the user’s CPU value, it instead heals for that amount instead. Lifesteal has no Duration.',
		unlocks: [],
		prerequisites: {},
		args: ['specCPU'],
		method: function (args) {
			return 'No Duration. Requires Damage to activate. Heal Wound Boxes equal to the damage dealt, maximum ' + args[0] + '.';
		},
	},
	'Positive Effect - Power of David': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'Increase Accuracy and Dodge by 2 for every size class you are below an attacking opponent.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Accuracy and Dodge by 2 for every size class they are below an attacking opponent.';
		},
	},
	'Positive Effect - Power of Goliath': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'Increase Damage and Armor by 1 for every size class you are above an opponent you are attacking.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Damage and Armor by 1 for every size class they are above an attacking opponent.';
		},
	},
	'Positive Effect - Regenerate': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target regains Wound Boxes at the end of their turn equal to the user’s BIT Value for the duration of this Effect. While under the effects of Regenerate, the target reduces the duration of all incoming effects by 4 Rounds (to their minimum).',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			let boxes = args[0] === 1 ? 'Wound Box' : 'Wound Boxes';
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. At the end of target\'s turn, recover ' + args[0] + ' ' + boxes + '. Target also reduces all incoming effects by 4 (to their minimum).';
		},
	},
	'Positive Effect - Shield': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target gains an amount of Temporary Wound Boxes equal to the user’s BIT value. Temporary Wound Boxes cannot be added to a target that already has any Temporary Wound Boxes. You cannot use an Attack that applies the [Shield] Effect more than once per Round. Temporary Wound Boxes are removed either when the duration of the effect runs out, or at the end of combat.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			let boxes = args[0] === 1 ? 'Temporary Wound Box' : 'Temporary Wound Boxes';
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. The target gains ' + args[0] + ' ' + boxes + ' if they do not have any currently. These Temporary Wound Boxes are removed when the effect ends.';
		},
	},
	'Positive Effect - Strengthen': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target gains a bonus to its Damage and Armor equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Damage and Armor by ' + args[0] + '.';
		},
	},
	'Positive Effect - Swiftness': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target gains a bonus to its Accuracy and Dodge equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Accuracy and Dodge by ' + args[0] + '.';
		},
	},
	'Positive Effect - Vigilance': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target gains a bonus to its Dodge and Armor equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Dodge and Armor by ' + args[0] + '.';
		},
	},
	'Positive Effect - Vigor': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target gains a bonus to their Dodge score and Movement scores equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Increase target Dodge and Movement scores by ' + args[0] + '.';
		},
	},
	'Negative Effect - Blind': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target takes a penalty to their Accuracy and Dodge equal to the user’s BIT Value. Additionally, the target automatically fails sight-based Perception checks for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Accuracy and Dodge scores by ' + args[0] + '. Target fails all sight-based Perception checks for the duration of this Effect.';
		},
	},
	'Negative Effect - Bomb': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'When a target affected by the [Bomb] Effect suffers Damage, remove the [Bomb] Effect and add your BIT to the Damage the target suffers. This Damage is still reduced by Armor. If the Attack Effect ends before it is triggered, it does nothing. You cannot activate the [Bomb] Effect on the turn you apply it.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. After the turn applied, increase the next damage dealt during the duration of this effect by ' + args[0] + ' then end the effect.';
		},
	},
	'Negative Effect - Charm': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The user takes control of the target’s actions for the duration of this Effect. However, for the duration of the Effect, at the start of a Charmed target’s turn, the user must spend a Complex Action from their next turn to maintain the Charm. If they do not, the Charm Effect ends. The Charmed target(s) are still treated as enemies for the purposes of Qualities which affect allies or enemies. If the Charmed target(s) would be hit by the user’s allies, the effect ends. Once an Enemy has been Charmed, it cannot be Charmed again by the same source until combat ends.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. User takes control of target\'s actions at the cost of a complex action from their next turn. Effect ends when damaged by user\'s allies. Check Quality for more details.';
		},
	},
	'Negative Effect - Confuse': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a penalty to Accuracy and Dodge equal to the target’s CPU value or BIT value (whichever is higher), for the duration of the Effect.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Accuracy and Dodge scores by the higher of its CPU and BIT.';
		},
	},
	'Negative Effect - Destroy Shield': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'This Attack Effect does not have a duration. Instead, upon effect, immediately remove all Temporary Wound Boxes from the target.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'No Duration. Remove all Temporary Wound Boxes from the target.';
		},
	},
	'Negative Effect - Disable': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'You are given a list of the target’s Attack names. You are not told what the features of these Attacks are. Select one Attack. The target cannot use that Attack for the duration of this Effect. This Effect cannot disable more than one Attack, or a Target’s last Attack. A Target with only one Attack not disabled may use that Attack multiple times per turn.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Select an Attack by name from a list of the target\'s Attacks. The target cannot use that Attack for the duration of this Effect.';
		},
	},
	'Negative Effect - Distract': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a penalty to its Accuracy and Dodge equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Accuracy and Dodge scores by ' + args[0] + '.';
		},
	},
	'Negative Effect - Exploit': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a penalty to its Dodge and Armor equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Dodge and Armor scores by ' + args[0] + '.';
		},
	},
	'Negative Effect - Fear': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'The target takes an Accuracy penalty for attacking the user of this Effect equal to the user’s BIT Value for the duration of this Effect. If the target was Clashing with the user, the Clash ends, and it may not Initiate Clashes with the user for the duration.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease Accuracy by ' + args[0] + ' when targeting User. If the target was Clashing with the user, the Clash ends, and it may not initiate clashes with the user for the duration.';
		},
	},
	'Negative Effect - Immobilize': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'The target takes a penalty to their Movement equal to the user’s BIT Value x2 for the duration of the Effect. This Effect may lower a target’s Movement to 0.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease Movement by ' + (2 * args[0]) + '.';
		},
	},
	'Negative Effect - Knockback': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'The target is forcibly pushed away from the user a number of Units equal to the user’s CPU Value. This Effect has no Duration. If the target would be pushed into a solid object such as a wall, use the Falling Subsection under the Combat Section for the damage it takes. If it would be pushed into a group of enemy Digimon, use the Throwing Subsection under the Combat Section for the damage each party takes.',
		unlocks: [],
		prerequisites: {},
		args: ['specCPU'],
		method: function (args) {
			return 'No Duration. Move target ' + args[0] + ' Units away from user. If the target strikes a solid object, use falling rules for damage. If the target strikesa nother character, use the throwing rules for damage.';
		},
	},
	'Negative Effect - Pacify': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a penalty to its Accuracy and Damage equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Accuracy and Damage scores by ' + args[0] + '.';
		},
	},
	'Negative Effect - Paralysis': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target treats all terrain as Difficult Terrain for the duration of the effect and takes a penalty to their Dodge equal to the user’s BIT value. If the target was Clashing, the Clash ends.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Dodge by ' + args[0] + '. The target treats all terrain as Difficult Terrain, and if it was Clashing, the Clash ends.';
		},
	},
	'Negative Effect - Poison': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a set amount of unalterable Wound Box Damage equal to the user’s BIT Value at the end of their turn. Poison’s minimum duration is 3 rounds.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			let boxes = args[0] === 1 ? 'Wound Box' : 'Wound Boxes';
			return 'Duration = Remaining Accuracy Dice, minimum 3 Rounds. At the end of target\'s turn, deal ' + args[0] + ' ' + boxes + ' damage.';
		},
	},
	'Negative Effect - Stun': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target loses a Simple Action each round for the duration of the Effect. If the target was Clashing, the Clash ends.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. The target loses 1 Simple Action each round. If the target was Clashing, the Clash ends.';
		},
	},
	'Negative Effect - Taunt': {
		type: 'effect',
		cost: 1,
		ranks: 1,
		text: 'The target takes an Accuracy penalty for attacking anyone who is not the user of the Taunt Effect equal to the user’s CPU Value x2 for the duration of this Effect. If the Attacker uses an Area Attack which has the user as a target, it instead takes a penalty of the user’s CPU-2 for the Accuracy roll.',
		unlocks: [],
		prerequisites: {},
		args: ['specCPU'],
		method: function (args) {
			let areaMod = args[0] > 2 ? args[0] - 2 : 0;
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Accuracy by ' + (2 * args[0]) + ' whenever target attacks anyone but the user. If the target uses an Area Attack with the user as a target, decrease target Accuracy by ' + areaMod + ' instead.';
		},
	},
	'Negative Effect - Weaken': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target takes a penalty to its Damage and Armor equal to the user’s BIT Value for the duration of this Effect.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease target Damage and Armor scores by ' + args[0] + '.';
		},
	},
	'Stance - Offensive Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Offensive Stance]. While in Offensive Stance, increase your Accuracy by BIT and decrease your Dodge by BIT.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Increase your Accuracy by ' + args[0] + ' and decrease your Dodge by ' + args[0] + '.';
		},
	},
	'Stance - Neutral Stance': {
		type: 'effect',
		stance: true,
		cost: 0,
		ranks: 1,
		text: 'Before the Attack resolves, apply [Neutral Stance]. While in Neutral Stance, remove all effects granted by other Stances.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Remove current Stance.';
		},
	},
	'Stance - Defensive Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Defensive Stance]. While in Defensive Stance, increase your Dodge by BIT and decrease your Accuracy by BIT.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Increase your Dodge by ' + args[0] + ' and decrease your Accuracy by ' + args[0] + '.';
		},
	},
	'Stance - Courageous Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Courageous Stance]. While in Courageous Stance, increase your Accuracy and Dodge by 1 for each Positive Attack Effect applied to you. This Stance does not count for this calculation.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Increase your Accuracy and Dodge by 1 for each Positive Attack Effect applied to you. This Stance does not count for this calculation.';
		},
	},
	'Stance - Gutsy Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Gutsy Stance]. While in Gutsy Stance, increase your Damage and Armor by 1 for each Negative Attack Effect applied to you.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Increase your Damage and Armor by 1 for each Negative Attack Effect applied to you.';
		},
	},
	'Stance - Swollen Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Swollen Stance]. While in Swollen Stance, increase your Size Class by one, and use this Size for the purpose of Qualities. Increase your Damage and Armor by 1, and decrease your Accuracy and Dodge by 1. This Stance cannot be used if your Size Class is Gigantic.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Increase your Size Class, Damage, and Armor by 1, and decrease your Accuracy and Dodge by 1.';
		},
	},
	'Stance - Shrunken Stance': {
		type: 'effect',
		stance: true,
		cost: 1,
		ranks: 1,
		text: 'After the Attack resolves, apply [Shrunken Stance]. While in Shrunken Stance, decrease your Size Class by one, and use this Size for the purpose of Qualities. Increase your Accuracy and Dodge by 1, and decrease your Damage and Armor by 1. This Stance cannot be used if your Size Class is Tiny.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Increase your Accuracy and Dodge by 1, and decrease your Size Class, Damage, and Armor by 1.';
		},
	},
};

module.exports.featureQualities = {
	'Signature Move': {
		type: 'quality',
		cost: 3,
		ranks: 2,
		text: 'For each Rank of Signature Move a Digimon has, it may apply one extra Attack Feature Quality to a single Attack. Only a single Attack can be modified by Signature Move. NOTE: in the DDA Builder, Signature Move applies to the FIRST Attack in the Attack list.',
		unlocks: [],
		prerequisites: {},
	},
	'Feature - Certain Strike': {
		type: 'feature',
		cost: 2,
		ranks: 3,
		text: 'An Attack with the [Certain Strike] tag will negate X successful Dodge dice from an opponent’s Dodge roll, where X is the Ranks you have of Certain Strike.',
		unlocks: [],
		prerequisites: {},
		args: ['ranks'],
		method: function (args) {
			return 'Negate ' + args[0] + ' successful Dodge dice from opponent\'s Dodge roll.';
		},
	},
	'Feature - Charge': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'Apply to a [Melee] Attack. An Attack with the [Charge] Tag when used allows the user to move up to their Movement in the same Simple Action. Movement must be made before performing the Attack. An Attack with the [Charge] tag cannot be performed in the same turn as an Attack with the [Retreat] tag.',
		unlocks: [],
		prerequisites: {},
		args: ['derivedMovement'],
		method: function (args) {
			return '[Melee] Attack only. Move up to ' + args[0] + ' Units for free before making this Attack.';
		},
	},
	'Feature - Clash I': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'Apply to a [Melee] Attack. When using an Attack with the [Clash] Tag on an opponent you are not currently Clashing with, instead of rolling Accuracy, perform a Clash Check with that opponent (see the Clashing Subsection under the Combat Section). When Clashing with an opponent, you may use a [Clash] Tagged attack to attack that opponent when controlling the Clash. You cannot apply a [Clash] Tag to an Attack with an [Area Attack] Tag. For each rank of [Clash] you take, you may apply a [Clash] tag to a different [Melee] Attack.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Either initiate a Clash, or perform a Clash Attack. See the full Quality for more details.';
		},
	},
	'Feature - Clash II': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'Apply to a [Melee] Attack. When using an Attack with the [Clash] Tag on an opponent you are not currently Clashing with, instead of rolling Accuracy, perform a Clash Check with that opponent (see the Clashing Subsection under the Combat Section). When Clashing with an opponent, you may use a [Clash] Tagged attack to attack that opponent when controlling the Clash. You cannot apply a [Clash] Tag to an Attack with an [Area Attack] Tag. For each rank of [Clash] you take, you may apply a [Clash] tag to a different [Melee] Attack.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Either initiate a Clash, or perform a Clash Attack. See the full Quality for more details.';
		},
	},
	'Feature - Clash III': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'Apply to a [Melee] Attack. When using an Attack with the [Clash] Tag on an opponent you are not currently Clashing with, instead of rolling Accuracy, perform a Clash Check with that opponent (see the Clashing Subsection under the Combat Section). When Clashing with an opponent, you may use a [Clash] Tagged attack to attack that opponent when controlling the Clash. You cannot apply a [Clash] Tag to an Attack with an [Area Attack] Tag. For each rank of [Clash] you take, you may apply a [Clash] tag to a different [Melee] Attack.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Either initiate a Clash, or perform a Clash Attack. See the full Quality for more details.';
		},
	},
	'Feature - Counter': {
		type: 'feature',
		cost: 2,
		ranks: 1,
		text: 'An Attack with the [Counter] Tag can be used once per round whenever this Digimon is missed by an Attack. The Digimon uses this Attack against the attacker, with the target reducing their Dodge Stat by this Digimon’s RAM. When using this Attack as a Counter, do not apply an Area Attack Quality if one is set. In the next round, this Digimon will have one less Simple Action. A [Counter] Tagged Attack cannot be used if this Digimon has no Simple Actions remaining in the next Round.',
		unlocks: ['Counterblow'],
		prerequisites: {},
		args: ['specRAM', 'Counterblow', 'specCPU'],
		method: function (args) {
			let counterblow = args[1] ? ' Also reduce your opponent\'s Armor Stat by ' + args[2] + '.' : '';
			return 'Spend one Simple Action from your next turn when an opponent misses you with an Attack. Make this Attack against that opponent, reducing their Dodge Stat by ' + args[0] + ' for the length of this Attack. Do not apply an Area Attack Quality if this Attack has one.' + counterblow;
		},
	},
	'Counterblow': {
		type: 'quality',
		cost: 2,
		ranks: 1,
		text: 'When using a [Counter] tagged attack through the Counter quality, reduce the target\'s Armor stat by the attacker\'s CPU.',
		unlocks: [],
		prerequisites: {
			'Feature - Counter': 1
		},
	},
	'Feature - Critical': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'An Attack with the [Critical] Tag increases the Damage of the Attack by RAM when the difference between the rolled Accuracy of the Attack, and rolled Dodge of the target, is equal to your RAM score or higher.',
		unlocks: [],
		prerequisites: {},
		args: ['specRAM'],
		method: function (args) {
			return 'When the difference between your rolled Accuracy and your opponent\'s rolled Dodge is ' + args[0] + ' or higher, add ' + args[0] + ' to the Damage of this Attack.';
		},
	},
	'Feature - Cruelty': {
		type: 'feature',
		cost: 2,
		ranks: 1,
		text: 'An Attack with the [Cruelty] Tag increases the Accuracy and Damage of the Attack by CPU when the target is affected by at least three rounds (sum total) of Negative Attack Effects.',
		unlocks: [],
		prerequisites: {},
		args: ['specCPU'],
		method: function (args) {
			return 'When the target is affected by at least three rounds (sum total) of Negative Attack Effects, increase Accuracy and Damage by ' + args[0] + '.';
		},
	},
	'Feature - Elementalist': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'An Attack with the [Elementalist] Tag made when on beneficial Elemental Terrain will extend this Elemental Terrain from the attacker to the target.',
		unlocks: [],
		prerequisites: {},
		args: ['family'],
		method: function (args) {
			return 'When standing on beneficial Elemental Terrain, create ' + args[0] + ' Elemental Tiles in a line from you to your target.';
		},
	},
	'Feature - Finisher': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'An Attack with the [Finisher] Tag increases the Accuracy and Damage of the Attack by 1 for each Attack to successfully damage the target since your last turn.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Increase the Accuracy and Damage of this Attack by 1 for each Attack that damaged the target since your last turn.';
		},
	},
	'Feature - Penetrate': {
		type: 'feature',
		cost: 2,
		ranks: 1,
		text: 'An Attack with the [Penetrate] Tag ignores all cover, and can affect opponents beneath the ground. Certain materials may be resistant to the [Penetrate] tag.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Ignore all cover unless specified by the GM between you and the target of this Attack.';
		},
	},
	'Feature - Pierce': {
		type: 'feature',
		cost: 1,
		ranks: 3,
		text: 'An Attack with the [Pierce] Tag ignores up to X points that any defending Digimon has in Armor, where X is double the Ranks you have of Pierce.',
		unlocks: [],
		prerequisites: {},
		args: ['ranks'],
		method: function (args) {
			return 'Ignore up to ' + (2 * args[0]) + ' points of the target Digimon\'s Armor.';
		},
	},
	'Feature - Retreat': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'Apply to a [Melee] Attack. An Attack with the [Retreat] Tag when used allows the user to move up to their Movement in the same Simple Action. Movement must be made after performing the Attack. An Attack with the [Charge] tag cannot be performed in the same turn as an Attack with the [Retreat] tag.',
		unlocks: [],
		prerequisites: {},
		args: ['derivedMovement'],
		method: function (args) {
			return '[Melee] Attack only. Move up to ' + args[0] + ' Units for free after making this Attack.';
		},
	},
	'Feature - Slow Roller': {
		type: 'feature',
		cost: 2,
		ranks: 1,
		text: 'An attack with the [Slow Roller] Tag changes its Damage by the amount your Movement Stat is less than your target’s. This Damage bonus has a maximum of 6. If your Movement Stat is greater than your target’s, reduce the Damage by that amount instead.',
		unlocks: [],
		prerequisites: {},
		args: ['derivedMovement'],
		method: function (args) {
			return 'Increase your Damage by the amount your target\'s Movement Stat is higher than ' + args[0] + ', up to a maximum of 6. If their Movement is lower than this, reduce your Damage by that amount instead.';
		},
	},
	'Feature - Snatch': {
		type: 'feature',
		cost: 2,
		ranks: 1,
		text: 'An Attack with the [Snatch] Tag removes one Attack Effect from a target, and grants that Attack Effect at the same potency to the Attacker for the duration the Attack Effect had left (maximum 3 Rounds).',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Remove one Attack Effect from your target, and apply that Effect to yourself at the same potency for the duration the Effect had left (maximum 3 Rounds).';
		},
	},
	'Feature - Sneak Attack': {
		type: 'feature',
		cost: 1,
		ranks: 1,
		text: 'An Attack with the [Sneak Attack] Tag increases the Accuracy of the Attack by RAM when attacking an opponent while in the Stealth condition.',
		unlocks: [],
		prerequisites: {},
		args: ['specRAM'],
		method: function (args) {
			return 'When attacking from Stealth, increase the Accuracy of this Attack by ' + args[0] + '.';
		},
	},
};

module.exports.modifierQualities = {
	'Burn Health': {
		type: 'modifier',
		cost: 1,
		ranks: 1,
		text: 'A Digimon with the Burn Health Quality may increase its Damage Stat for an Attack by 1 for each Wound Box you mark. For an Area Attack, this increase will only apply to one of the targets.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'Mark a number of your Wound Boxes and increase the Damage of this Attack by that number.';
		},
	},
	'Chrome Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 1,
		ranks: 1,
		text: 'This modifier can only be used once per round. The Digimon adds 2 to Accuracy and 1 to Damage to an Attack.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 2 to the Accuracy and 1 to the Damage of this Attack.';
		},
	},
	'Black Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon’s Attack gains 2 Accuracy. When using this Attack, before rolling Accuracy this Digimon may choose to gain either 4 Accuracy or 4 Damage for the length of attack calculation.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 2 to the Accuracy of this Attack. Additionally, before rolling Accuracy, this Digimon may choose to add 4 to either the Accuracy or Damage of this Attack.';
		},
	},
	'Blue Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Attack gains 2 bonus Accuracy when used and 1 bonus Damage. Additionally, treat the Attack as having an Attack Feature of an extra rank in Certain Strike, even if the Attack already had Certain Strike.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 2 to the Accuracy and 1 to the Damage of this Attack. Additionally, reduce the number of successfully Dodge dice rolled against this Attack by 1.';
		},
	},
	'Gold Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Attack gains 4 extra Damage and 1 extra Accuracy. If the Attack is [Range], the maximum range increases by 5 Units.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 1 to the Accuracy and 4 to the Damage of this Attack. Additionally, if the Attack is [Range], the maximum range increases by 5 Units.';
		},
	},
	'Obsidian Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Attack gains 2 bonus Damage when used and 1 bonus Accuracy. Additionally, treat the Attack as having an Attack Feature of an extra rank in Pierce, even if the Attack already had Pierce.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 1 to the Accuracy and 2 to the Damage of this Attack. Additionally, ignore 2 Armor when calculating the Damage of this Attack.';
		},
	},
	'Red Digizoid Weapon': {
		type: 'modifier',
		digizoidWeapon: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Attack gains +7 Damage.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		args: [],
		method: function (args) {
			return 'This modifier can only be used once per round. The Digimon adds 7 to the Damage of this Attack.';
		},
	},
	'Flying Hunter': {
		type: 'modifier',
		cost: 2,
		ranks: 1,
		text: 'A Digimon with Flying Hunter takes double damage from falling and throwing. When attacking while spending your entire Turn 1 or higher Units in the air, this Digimon may add its RAM Value to its Accuracy.',
		negative: 'A Digimon with Flying Hunter takes double damage from falling and throwing.',
		unlocks: [],
		prerequisites: {},
		args: ['specRAM'],
		method: function (args) {
			return 'While spending your entire turn 1 or higher Units in the air, this Digimon may add ' + args[0] + ' to the Accuracy of this Attack.';
		},
	},
	'Hunter': {
		type: 'modifier',
		cost: 1,
		ranks: 1,
		text: 'When you take this Quality, select and record a Digimon Family and Type. You automatically know if any Digimon you encounter is of that Family or relative Type. When making an Attack Roll against a target, if the target’s Family or Type matches one of your selected Family and Type, add your RAM to your Accuracy. If both match, add RAM+CPU to your Accuracy. Digimon of this Family or Type will feel innately unsettled by a Digimon with the Hunter Quality tuned to their Family or Type.',
		unlocks: ['Slayer'],
		prerequisites: {},
		args: ['specRAM', 'specCPU', 'Slayer', 'specBIT'],
		method: function (args) {
			let slayer = args[2] ? ' If your target\'s Attribute matches your chosen Attribute for Slayer, add ' + args[3] + ' to this Attack\'s Accuracy. This can stack with the bonus for matching Family and/or Type. If Attribute, Family, and Type are all matched, and this Attack leaves the target with less than half its health remaining, the target is immediately destroyed, unless it is a Boss Stage Digimon.' : '';
			return 'If your target\'s Family or Type matches your chosen Family and Type, add ' + args[0] + ' to this Attack\'s Accuracy. If both match, add ' + (args[0] + args[1]) + '.' + slayer;
		},
	},
	'Slayer': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'When you take this Quality, select and record a Digimon Attribute. You automatically know if any Digimon you encounter is of that Attribute. When making an Attack Roll against a target with that Attribute, add your BIT to your Accuracy. This Attack Modifier stacks with Hunter: you may apply both these Qualities as one Attack Modifier. If the combination of Hunter and Slayer matches exactly to a target Digimon (Attribute, Family, and Type match), and after this attack deals damage the target has less than half health remaining, the target is immediately destroyed. Digimon with any Boss Qualities are immune to this specific effect. Digimon of the target Attribute will react extremely negatively to the presence of this Digimon.',
		unlocks: [],
		prerequisites: {
			'Hunter': 1,
		},
	},
	'Pack Tactics': {
		type: 'modifier',
		cost: 3,
		ranks: 1,
		text: 'Whenever an ally is adjacent to an enemy, you can add your RAM Value to your Accuracy when attacking that enemy.',
		unlocks: ['Coordinated Assault'],
		prerequisites: {},
		args: ['specRAM'],
		method: function (args) {
			return 'When an ally is adjacent to the target, add ' + args[0] + ' to the Accuracy of this Attack.';
		},
	},
	'Rage': {
		type: 'modifier',
		cost: 2,
		ranks: 1,
		text: 'The Digimon gains a Rage Meter, measured by a singular D6 (1 to 6). As a Simple Action, the Digimon may activate its Rage Meter, starting its Rage at 1. The Rage Meter deactivates when it reaches Rage 0. It can only be activated once per Short Rest. Rage increases by 1 whenever the Digimon takes Damage, or misses an Attack. Rage decreases by 4 at the end of a turn if the Digimon has not taken Damage or used an Attack since the end of its last turn. You cannot use a [Clash] Tagged Attack while Raging. Increase your Damage Stat by the number of points of Rage you have, and decrease your Accuracy by the same. At the end of its turn after this Digimon reaches 6 Rage, the Rage Meter deactivates and the Digimon must use a Complex Action in its next turn to recover.',
		unlocks: ['Berserker'],
		prerequisites: {},
		args: ['currentRage'],
		method: function (args) {
			return 'The Damage of this Attack has been increased by ' + args[0] + ' and the Accuracy of this Attack has been decreased by ' + args[0] + ' due to the effects of Rage.';
		},
	},
	'Berserker': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'Increase the number of dice used to measure the Digimon’s Rage Meter to 2D6 (2 to 12). The Digimon’s Rage now begins at 2. Instead of deactivating, when the Digimon reaches maximum Rage, it will go on a rampage, and become GM-controlled. The Rage Meter may then be deactivated as a Simple Action involving a TN 5+(Rage) Persuade Check from the Tamer or another Ally. The Rage Meter will decrease as normal during GM-control. In addition to the bonus to Damage and penalty to Accuracy, a Digimon with the Berserker Quality adds its Rage points to Armor, and subtracts them from Dodge.',
		unlocks: ['Focused Rage'],
		prerequisites: {
			'Rage': 1,
		},
	},
	'Focused Rage': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'The Digimon will only take a penalty of half its Rage (rounded down) to Accuracy and Dodge.',
		unlocks: [],
		prerequisites: {
			'Berserker': 1,
		},
	},
	'Reckless': {
		type: 'modifier',
		cost: 3,
		ranks: 1,
		text: 'A Digimon with the Reckless Quality will always take a minimum of 2 Damage, and Attack Effects applied will have a minimum duration of 2, from Attacks that connect. The Digimon may add its CPU Value to its Accuracy when attacking.',
		negative: 'A Digimon with the Reckless Quality will always take a minimum of 2 Damage, and Attack Effects applied will have a minimum duration of 2, from Attacks that connect.',
		unlocks: [],
		prerequisites: {},
		args: ['specCPU'],
		method: function (args) {
			return 'Add ' + args[0] + ' to the Accuracy of this Attack.';
		},
	},
};

module.exports.qualities = {
	'Agility': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 1’s when making a Dodge roll. The Digimon does not reroll any subsequent 1’s',
		unlocks: ['Avoidance'],
		prerequisites: {},
	},
	'Avoidance': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 2’s when making a Dodge roll. The Digimon does not reroll any subsequent 2’s.',
		unlocks: [],
		prerequisites: {
			'Agility': 1,
		},
	},
	'Balance Health': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, select one willing adjacent character. Sum your current unmarked Wound Boxes together, then set both you and that character’s current unmarked Wound Boxes to half of that sum total (rounded down).',
		unlocks: [],
		prerequisites: {},
	},
	'Burst Power': {
		type: 'action',
		cost: 0,
		ranks: 1,
		text: 'Burst Power is activated as a Simple Action. When activated, the Digimon gains +4 to Accuracy, Damage, Dodge, and Armor for 4 Rounds. At the end of the 4th round, the Digimon instead loses 1 point in each Stat per Round after. So, if the Digimon maintains Burst Power for 7 rounds, they would be at a -3 in all Stats. Burst Power is Deactivated as a Complex Action. Once Burst Power has been activated, the Digimon cannot activate it again until after a Short Rest.',
		unlocks: [],
		prerequisites: {
			Stage: 'Burst',
		},
	},
	'Camper': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'At the beginning of a Short or Long Rest (before Dedigivolving if you are above your Base Digivolution Stage), you can make a Survival Check using your Brains Stat to create a safe environment for resting and to gather/prepare food for consumption. You may also use your Brains Stat for Survival Checks when attempting to locate plants or food, and your Brains Stat for Knowledge Checks regarding the usages of plants and the like.',
		unlocks: [],
		prerequisites: {},
	},
	'Cleanse Self': {
		type: 'action',
		cost: 1,
		ranks: 1,
		text: 'As a Complex Action, the user may end all Attack Effects currently applied to them.',
		unlocks: [],
		prerequisites: {},
	},
	'Combat Awareness': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'A Digimon with the Combat Awareness Quality adds +3 to their Initiative Checks and cannot be surprised in combat. This Digimon treats Surprise Rounds triggered against it as a normal round of combat.',
		unlocks: [],
		prerequisites: {},
	},
	'Conjurer': {
		type: 'action',
		summoning: 'conjurer',
		cost: 3,
		ranks: 1,
		text: 'You may not take this Quality if you have the Summoner Quality except through the effect of Mixed Summoner. Upon taking this Quality, the Digimon gains Summoning Points equal to its BIT Value x3. As a Simple Action, a Digimon with this Quality may create Objects of Medium Size at a cost of 1 Summoning Point per Object. The design and possibilities of these Objects must be declared when taking this Quality, as they cannot be changed later. Each summoned Object has a number of Wound Boxes equal to the user’s BIT, Armor equal to the user’s BITx2, and zero Dodge. An Object counts as solid terrain, and cannot be moved through. When an Object’s Wound Boxes are reduced to 0, the Object is destroyed. In addition to these starting Stats, an Object can be strengthened by spending more Summoning Points at creation. When spending additional Summon Points (up to a maximum of BIT per Summon), increase the Object’s Wound Boxes by 2 for each Point, and its Size class by 1 for every 2 Points. When an Object is destroyed, the Summoning Points used to create it return to the user. The Summoning Action cannot be used two rounds in a row. Summoned Objects must be created and placed within the user’s [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent not included].',
		unlocks: ['Elemental Summoner', 'Mixed Summoner'],
		prerequisites: {},
	},
	'Summoner': {
		type: 'action',
		summoning: 'summoner',
		cost: 3,
		ranks: 1,
		text: 'You may not take this Quality and Conjurer if you have the Conjurer Quality except through the effect of Mixed Summoner. Upon taking this Quality, the Digimon gains Summoning Points equal to its BIT Value x3. As a Simple Action, a Digimon with this Quality may create Minions of Small Size at a cost of 2 Summoning Points per Minion. The design and possibilities of these Minions must be declared when taking this Quality, as they cannot be changed later. Each summoned Minion has a number of Wound Boxes equal to the user’s BIT, Armor equal to the user’s BIT, zero Dodge, and are capable of flying a number of Units equal to the user’s Brains value in a round. When a Minion’s Wound Boxes are reduced to 0, the Minion is destroyed. In addition to these starting Stats, a Minion can be strengthened by spending more Summoning Points at creation. When spending additional Summon Points (up to a maximum of BIT per Summon), increase the Mininon’s Wound Boxes, Accuracy, and Damage by 1 for each Point. As a Complex Action, Summoned Minions may move and Attack by using the user’s BIT Value for Accuracy, and 1 for Damage. Their Attack is a [Melee][Damage] Attack with no Effects or Features, but may benefit from Attack Modifiers. When a Minion is destroyed, the Summoning Points used to create it return to the user. The Summoning Action cannot be used two rounds in a row. Summoned Minions must be created and placed within the user’s [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent not included].',
		unlocks: ['Elemental Summoner', 'Mixed Summoner', 'Minion Explosion'],
		prerequisites: {},
	},
	'Elemental Summoner': {
		type: 'passive',
		summoning: 'elemental',
		cost: 2,
		ranks: 1,
		text: 'When performing a Summon Action, create Elemental Terrain matching your Family beneath each Summoned Object or Minion. Summoned Objects and Minions do not have a Family and do not benefit from Elemental Terrain.',
		unlocks: [],
		prerequisites: [
			{ 'Conjurer': 1, },
			{ 'Summoner': 1, }
		],
	},
	'Minion Explosion': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'When a Minion is reduced to zero Wound Boxes and destroyed, you may immediately make a [Burst][Melee][Damage] Attack using that Minion’s statistics. This Attack is not affected by any of your Qualities.',
		unlocks: [],
		prerequisites: {
			'Summoner': 1,
		},
	},
	'Mixed Summoner': {
		type: 'action',
		summoning: 'mixed',
		cost: 2,
		ranks: 1,
		text: 'Mixed Summoner can only be taken when the user has either the Conjurer or Summoner Quality. When you take this Quality, you gain the opposite Quality (Summoner if Conjurer, Conjurer if Summoner) for free. Recalculate the user’s Summoning Points as BITx2. When performing a Summoning Simple Action, the user may summon both Objects and Minions within the same Action.',
		unlocks: [],
		prerequisites: [
			{ 'Conjurer': 1, },
			{ 'Summoner': 1, }
		],
	},
	'Chrome Digizoid Armor': {
		type: 'quality',
		digizoidArmor: true,
		cost: 1,
		ranks: 1,
		text: 'The Digimon gains 2 Armor and 1 Health.',
		unlocks: [],
		prerequisites: {
			Stage: 'Ultimate',
		},
		statMods: {
			qualityArmor: 2,
			qualityWoundBoxes: 1,
		},
	},
	'Black Digizoid Armor': {
		type: 'passive',
		digizoidArmor: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon gains 2 Armor. Once per round, when targeted by an Attack, before rolling Dodge this Digimon may choose to gain either 4 Dodge or 4 Armor for the length of attack calculation.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		statMods: {
			qualityArmor: 2,
		},
	},
	'Blue Digizoid Armor': {
		type: 'quality',
		digizoidArmor: true,
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Armor score increases by 2, it gains an additional 2 Dodge, and their Base Movement is increased by 4.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		statMods: {
			qualityArmor: 2,
			qualityDodge: 2,
			baseMovement: 4,
		},
	},
	'Gold Digizoid Armor': {
		type: 'passive',
		digizoidArmor: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon’s Armor increases by 2. Additionally, whenever the user is hit by a [Range] Attack, the opponent who used the Attack takes Damage equal to the user’s CPU Value doubled. The damage is reduced by Armor as per normal, but cannot be brought below 1.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		statMods: {
			qualityArmor: 2,
		},
	},
	'Obsidian Digizoid Armor': {
		type: 'passive',
		digizoidArmor: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon’s Armor increases by 2. Additionally, whenever the user is hit by a [Melee] Attack, the opponent who used the Attack takes Damage equal to the user’s CPU Value doubled. The damage is reduced by Armor as per normal, but cannot be brought below 1.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		statMods: {
			qualityArmor: 2,
		},
	},
	'Red Digizoid Armor': {
		type: 'quality',
		digizoidArmor: true,
		cost: 2,
		ranks: 1,
		text: 'The Digimon gains +4 to their Armor and +2 to their Health.',
		unlocks: [],
		prerequisites: {
			Stage: 'Mega',
		},
		statMods: {
			qualityArmor: 4,
			qualityWoundBoxes: 2,
		},
	},
	'Doombringer': {
		type: 'action',
		cost: 3,
		ranks: 1,
		text: 'Once per Short Rest, if this Digimon would be reduced to 0 Wound Boxes, immediately make a basic [Damage] Attack (Range depending on attacker) on the attacker. If this attack brings the opponent to 0 Wound Boxes, set your Wound Boxes to 1. You may apply Attack Modifiers to this Attack.',
		unlocks: [],
		prerequisites: {},
	},
	'Extra Movement - Flight': {
		type: 'quality',
		cost: 2,
		ranks: 1,
		text: 'The Digimon is capable of flying through the air at a speed equal to their Movement.',
		unlocks: ['Advanced Mobility - Flight'],
		prerequisites: {},
	},
	'Advanced Mobility - Flight': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon is not slowed down by even the harshest of winds while it’s in the air and its Flight speed is increased by its RAM value.',
		unlocks: [],
		prerequisites: {
			'Extra Movement - Flight': 1,
		},
	},
	'Extra Movement - Digger': {
		type: 'quality',
		cost: 1,
		ranks: 1,
		text: 'The Digimon is capable of burrowing through the ground at a speed equal to its movement, so long as it’s as soft as dirt. Snow or sand are other alternatives.',
		unlocks: ['Advanced Mobility - Digger'],
		prerequisites: {},
	},
	'Advanced Mobility - Digger': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon is now capable of digging through the majority of surfaces without being slowed down. It can dig through softer metals but this is now treated as Difficult Terrain. The Digimon’s Digging speed is increased by its RAM value.',
		unlocks: [],
		prerequisites: {
			'Extra Movement - Digger': 1,
		},
	},
	'Extra Movement - Swimmer': {
		type: 'quality',
		cost: 1,
		ranks: 1,
		text: 'The Digimon is capable of moving through the water at a much faster speed than normal, at a speed equal to its Movement.',
		unlocks: ['Advanced Mobility - Swimmer'],
		prerequisites: {},
	},
	'Advanced Mobility - Swimmer': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon is capable of swimming without being slowed down by harsh currents, and its Swimming speed is increased by its RAM value.',
		unlocks: [],
		prerequisites: {
			'Extra Movement - Swimmer': 1,
		},
	},
	'Extra Movement - Wallclimber': {
		type: 'quality',
		cost: 1,
		ranks: 1,
		text: 'The Digimon is capable of scaling vertical surfaces, but not on ceilings, at a speed equal to its Movement.',
		unlocks: ['Advanced Mobility - Wallclimber'],
		prerequisites: {},
	},
	'Advanced Mobility - Wallclimber': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon is now capable of walking on ceilings, and cannot be slowed or slip off any normal wall surfaces. Its Wallclimber speed is increased by its RAM value.',
		unlocks: [],
		prerequisites: {
			'Extra Movement - Wallclimber': 1,
		},
	},
	'Extra Movement - Jumper': {
		type: 'quality',
		cost: 1,
		ranks: 1,
		text: 'The Digimon is capable of jumping at a height and length equal to its Movement.',
		unlocks: ['Advanced Mobility - Jumper'],
		prerequisites: {},
	},
	'Advanced Mobility - Jumper': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon’s Jump height is increased by its CPU Value times Three. The Digimon’s Jump length is increased by its CPU value.',
		unlocks: [],
		prerequisites: {
			'Extra Movement - Jumper': 1,
		},
	},
	'Advanced Mobility - Speedy': {
		type: 'quality',
		cost: 3,
		ranks: 1,
		text: 'The Digimon adds 6 to its Movement score.',
		unlocks: [],
		prerequisites: {
			'Speedy': 3,
		},
		statMods: {
			qualityMovement: 6,
		},
	},
	'Focused Mind': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon now applies BIT+2 as the modifier for its Willpower Checks.',
		unlocks: [],
		prerequisites: {},
	},
	'Graduate of Digital University': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'Digimon with this Quality may apply their full Brains score when making Knowledge Skill Checks.',
		unlocks: [],
		prerequisites: {},
	},
	'Healing Hands': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'When performing a Heal Check, add your BIT to the Heal Check Roll of all allies with you.',
		unlocks: [],
		prerequisites: {},
	},
	'Huge Power': {
		type: 'special',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 1’s when making an Accuracy roll. The Digimon does not reroll and subsequent 1’s.',
		unlocks: ['Overkill'],
		prerequisites: {},
	},
	'Overkill': {
		type: 'special',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 2’s when making an Accuracy roll. The Digimon does not reroll any subsequent 2’s.',
		unlocks: [],
		prerequisites: {
			'Huge Power': 1,
		},
	},
	'Hide in Plain Sight': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'A Digimon with this Quality may attempt to make a Stealth Check even when there is line of sight to it. If it has broken line of sight, it may use Agility for its Stealth Check. The Digimon may become transparent, be capable of disguising itself to be less obvious, or maybe just really good at finding a place to hide.',
		unlocks: ['Shade Cloak'],
		prerequisites: {},
	},
	'Shade Cloak': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'Allies within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] may also make Stealth Checks even while there is line of sight to them.',
		unlocks: [],
		prerequisites: {
			'Hide in Plain Sight': 1,
		},
	},
	'Improved Derived Stat - Agility': {
		type: 'quality',
		cost: 1,
		ranks: 0,
		text: 'For each rank of Improved Derived Stat - Agility you take, increase your Agility Derived Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			derivedAgility: 1,
		},
	},
	'Improved Derived Stat - Body': {
		type: 'quality',
		cost: 1,
		ranks: 0,
		text: 'For each rank of Improved Derived Stat - Body you take, increase your Body Derived Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			derivedBody: 1,
		},
	},
	'Improved Derived Stat - Brains': {
		type: 'quality',
		cost: 1,
		ranks: 0,
		text: 'For each rank of Improved Derived Stat - Brains you take, increase your Brains Derived Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			derivedBrains: 1,
		},
	},
	'Mode Change': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'When you take Mode Change, pick two Stats from Accuracy, Damage, Dodge, and Armor. As a Simple Action, you can swap these two Stats around. Use only the Base Stat when doing the math, it is not changed by things like Stances or Directing. This rearrangement does not recalculate Derived or Spec Stats.',
		unlocks: ['Mode Change X.0'],
		prerequisites: {},
	},
	'Mode Change X.0': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'When you take Mode Change X.0, define a rearrangement of your Accuracy, Damage, Dodge, and Armor Stats. As a Simple Action, you can change between your regular Stat spread and this rearranged Stat spread. Again, only Base Stats are used in this situation, bonuses do not change from the Stat they apply to. This rearrangement does not recalculate Derived or Spec Stats.',
		unlocks: [],
		prerequisites: {
			'Mode Change': 1,
		},
	},
	'Nature Territory': {
		type: 'action',
		cost: 1,
		ranks: 1,
		text: 'As a Simple Action, a Digimon with Nature Territory may convert all tiles it is occupying, and all adjacent tiles to it, into Elemental Terrain suitable to that Digimon. See the DDA-TV Homebrew manual for more information.',
		unlocks: ['Recovery Territory'],
		prerequisites: {},
	},
	'Recovery Territory': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'At the end of its turn, if this Digimon is standing on Elemental Terrain that benefits it, it may recover 1 Wound Box.',
		unlocks: [],
		prerequisites: {
			'Nature Territory': 1,
		},
	},
	'Naturewalk - Dragon\'s Roar': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Fire Elemental Terrain type.',
		unlocks: ['Element Master - Dragon\'s Roar'],
		prerequisites: {},
	},
	'Element Master - Dragon\'s Roar': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Fire Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Fire Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Dragon\'s Roar': 1,
		},
	},
	'Naturewalk - Deep Savers': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Water Elemental Terrain type.',
		unlocks: ['Element Master - Deep Savers'],
		prerequisites: {},
	},
	'Element Master - Deep Savers': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Water Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Water Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Deep Savers': 1,
		},
	},
	'Naturewalk - Nature Spirits': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Earth Elemental Terrain type.',
		unlocks: ['Element Master - Nature Spirits'],
		prerequisites: {},
	},
	'Element Master - Nature Spirits': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Earth Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Earth Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Nature Spirits': 1,
		},
	},
	'Naturewalk - Wind Guardians': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Wind Elemental Terrain type.',
		unlocks: ['Element Master - Wind Guardians'],
		prerequisites: {},
	},
	'Element Master - Wind Guardians': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Wind Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Wind Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Wind Guardians': 1,
		},
	},
	'Naturewalk - Jungle Troopers': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Plant Elemental Terrain type.',
		unlocks: ['Element Master - Jungle Troopers'],
		prerequisites: {},
	},
	'Element Master - Jungle Troopers': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Plant Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Plant Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Jungle Troopers': 1,
		},
	},
	'Naturewalk - Metal Empire': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Machine Elemental Terrain type.',
		unlocks: ['Element Master - Metal Empire'],
		prerequisites: {},
	},
	'Element Master - Metal Empire': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Machine Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Machine Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Metal Empire': 1,
		},
	},
	'Naturewalk - Virus Busters': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Light Elemental Terrain type.',
		unlocks: ['Element Master - Virus Busters'],
		prerequisites: {},
	},
	'Element Master - Virus Busters': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Light Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Light Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Virus Busters': 1,
		},
	},
	'Naturewalk - Nightmare Soldiers': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Dark Elemental Terrain type.',
		unlocks: ['Element Master - Nightmare Soldiers'],
		prerequisites: {},
	},
	'Element Master - Nightmare Soldiers': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Dark Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Dark Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Nightmare Soldiers': 1,
		},
	},
	'Naturewalk - Dark Area': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Chaos Elemental Terrain type.',
		unlocks: ['Element Master - Dark Area'],
		prerequisites: {},
	},
	'Element Master - Dark Area': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Chaos Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Chaos Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Dark Area': 1,
		},
	},
	'Naturewalk - Unknown': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon is not affected by difficult terrain of the Order Elemental Terrain type.',
		unlocks: ['Element Master - Unknown'],
		prerequisites: {},
	},
	'Element Master - Unknown': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'As a Simple Action, convert all tiles within your [Burst][Range] dimensions [1 + half BIT (rounded down) radius around user, adjacent included] into Order Elemental Terrain. You may decide whether these tiles (as a whole) are difficult terrain, and if they are already Order Elemental Terrain, you may convert them to or from difficult terrain. In the same action you may also move these tiles of terrain (as a whole) up or down one Unit.',
		unlocks: [],
		prerequisites: {
			'Naturewalk - Unknown': 1,
		},
	},
	'Pack Master': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'Once per Round, when an ally Intercedes to protect a Digimon with the Pack Master Quality, it does not consume a Simple Action of that ally from the next Round.',
		unlocks: [],
		prerequisites: {},
	},
	'Coordinated Assault': {
		type: 'action',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may Mark a single target within [Range] distance (BITx2, not adjacent) as a Simple Action. All allies gain the benefits of the Pack Tactics Quality when attacking this target (adding their own RAM to Accuracy). This benefit still counts as an Attack modifier. This Quality may only have one active target. The Mark vanishes if the user loses the Quality (eg: by Digivolving) or if the target is defeated.',
		unlocks: [],
		prerequisites: {
			'Pack Tactics': 1,
		},
	},
	'Performance Training': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'Digimon with this Quality may apply their full Brains score when making Persuasion and Performance Skill Checks.',
		unlocks: [],
		prerequisites: {},
	},
	'Quick Healer': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 1’s when making a Heal Check. The Digimon does not reroll any subsequent 1’s.',
		unlocks: ['Regenerator'],
		prerequisites: {},
	},
	'Regenerator': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 2’s when making a Heal Check. The Digimon does not reroll any subsequent 2’s.',
		unlocks: [],
		prerequisites: {
			'Quick Healer': 1,
		},
	},
	'Reach': {
		type: 'special',
		cost: 3,
		ranks: 0,
		text: 'The range at which this Digimon can use [Melee] Attacks and initiate Clashes increases by 1 for each Rank the Digimon has in Reach. For example, a Digimon with 3 Ranks in Reach can perform a [Melee] attack on a target up to 4 Units away from the Digimon. If the Digimon uses a [Melee] Attack with an Area Tag, they may have the point of origin be anywhere within its reach.',
		unlocks: [],
		prerequisites: {},
	},
	'Resistant': {
		type: 'passive',
		cost: 3,
		ranks: 1,
		text: 'A Digimon with the Resistant Quality reduces the duration of Negative Effects by their CPU. This Quality cannot bring the duration below their minimum duration.',
		unlocks: [],
		prerequisites: {},
	},
	'Silver Tongue': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'This Digimon now applies BIT+2 as the modifier for its Charisma Checks.',
		unlocks: [],
		prerequisites: {},
	},
	'Speedy': {
		type: 'quality',
		cost: 1,
		ranks: 3,
		text: 'For each Rank you take in Speedy, the Digimon adds 2 to its Movement score.',
		unlocks: ['Advanced Mobility - Speedy', 'Teleport', 'Speedy II'],
		prerequisites: {},
		statMods: {
			qualityMovement: 2,
		},
	},
	'Speedy II': {
		type: 'quality',
		cost: 1,
		ranks: 2,
		text: 'For each Rank you take in Speedy, the Digimon adds 2 to its Movement score.',
		unlocks: [],
		prerequisites: {
			'Stage': 'Ultimate',
			'Speedy': 3,
		},
		statMods: {
			qualityMovement: 2,
		},
	},
	'System Boost - RAM': {
		type: 'quality',
		cost: 3,
		ranks: 3,
		text: 'For each rank of System Boost - RAM you take, increase your RAM Spec Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			specRAM: 1,
		},
	},
	'System Boost - CPU': {
		type: 'quality',
		cost: 3,
		ranks: 3,
		text: 'For each rank of System Boost - CPU you take, increase your CPU Spec Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			specCPU: 1,
		},
	},
	'System Boost - BIT': {
		type: 'quality',
		cost: 3,
		ranks: 3,
		text: 'For each rank of System Boost - BIT you take, increase your BIT Spec Stat by 1.',
		unlocks: [],
		prerequisites: {},
		statMods: {
			specBIT: 1,
		},
	},
	'Technician': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'A Digimon with Technician is skilled at working with code and technology, and by default can read and comprehend Digicode for its Tamer. When making any Computer Skill Check, or a Knowledge Check regarding technical knowledge, the Digimon may use its full Brains Stat in place of BIT.',
		unlocks: [],
		prerequisites: {},
	},
	'Teleport': {
		type: 'action',
		cost: 3,
		ranks: 1,
		text: 'The Digimon is capable of instantly teleporting a number of Units equal to its Base Movement+2. It requires a line of sight to be able to utilize this Quality. It may use this Quality to teleport away as a reaction to an enemy’s Attack once per combat, causing the Attack to miss. Using Teleport to cause an Attack to miss will not trigger Counter. When it uses Teleport to avoid an Attack, the Digimon forfeits a Simple Action on its next round of combat.',
		unlocks: ['Transporter'],
		prerequisites: {
			'Speedy': 3,
		},
	},
	'Transporter': {
		type: 'action',
		cost: 2,
		ranks: 1,
		text: 'The Digimon is now capable of warping away with allies in tow while using Teleport. The allies must be adjacent for Transporter to work properly. This also means it can use the Teleport Quality to bring allies out of harm’s way in reaction to an Attack. Finally, the Digimon’s Teleport distance increases by 2.',
		unlocks: [],
		prerequisites: {
			'Teleport': 1,
		},
	},
	'Tracker': {
		type: 'passive',
		cost: 2,
		ranks: 1,
		text: 'Tracker makes a Digimon significantly better at finding its target. When performing a Perception Check with the goal of locating a target, or a Survival Check with the goal of tracking a target, the Digimon may use its full Brains Stat in place of BIT. Additionally, the TN to hide from this Digimon increases to 12 + Brains.',
		unlocks: [],
		prerequisites: {},
	},
	'Tumbler': {
		type: 'passive',
		cost: 1,
		ranks: 1,
		text: 'Reduce damage this Digimon takes from falling/throwing by RAMx2, to a minimum of 1.',
		unlocks: [],
		prerequisites: {},
	},
	/*
	 * TO ADD
	 * Armor, DNA, Hybrid, Dark Qualities
	 */
};

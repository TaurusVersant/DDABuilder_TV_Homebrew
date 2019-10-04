module.exports.qualities = {
	'Agility': {
		type: 'special',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 1’s when making a Dodge roll. The Digimon does not reroll any subsequent 1’s',
		unlocks: ['Avoidance'],
		prerequisites: {},
	},
	'Avoidance': {
		type: 'special',
		cost: 3,
		ranks: 1,
		text: 'The Digimon may re-roll any dice that show up as 2’s when making a Dodge roll. The Digimon does not reroll any subsequent 2’s.',
		unlocks: [],
		prerequisites: {
			'Agility': 1,
		},
	},
	'Area Attack - Blast': {
		type: 'area',
		cost: 2,
		ranks: 1,
		text: 'Apply to a [Range] attack. Creates a Circle of radius 1 + half BIT (rounded down), with its midpoint within the user’s range (BITx2).',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (type, args) {
			if (type === 'Range') {
				let radius = (1 + Math.floor(args[0] / 2)) + '.5 Units';
				let range = (2 * args[0]) + ' Units';
				return 'Circle with radius ' + radius + ' centered within 2 to ' + range + '.';
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
			if (type === 'Range') {
				let radius = (1 + Math.floor(args[0] / 2)) + '.5 Units';
				return 'Circle with radius ' + radius + ' centered around user. Does not affect adjacent Units.';
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
			if (type === 'Range') {
				let diameter = (3 + Math.floor(args[0] / 2)) + ' Units';
				return 'Circle with diameter ' + diameter + ' from diagonal adjacent to user. Does not affect adjacent Unit.';
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
			if (type === 'Range') {
				let length = (3 + Math.floor(args[0] / 2)) + ' Units';
				return 'Cone with length ' + length + '  horizontally/vertically from user. Does not affect adjacent Unit.';
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
			let width = (args[1] === 'Gigantic' ? 3 : args[1] === 'Huge' ? 2 : 1) + ' Units';
			if (type === 'Range') {
				let length = (5 + args[0]) + ' Units';
				return 'Line with length ' + length + ', width ' + width + ' horizontally/vertically from user. Does not affect adjacent Units.';
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
			if (type === 'Range') {
				let radius = (1 + Math.floor((args[0] - 1) / 2)) + '.5 Units';
				let range = (2 * args[0]) + ' Units';
				return 'Circle with radius ' + radius + ' centered within 2 to ' + range + '.';
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
			if (type === 'Range') {
				let radius = (1 + Math.floor((args[0]) / 2)) + '.5 Units';
				return 'Three targets within circle with radius ' + radius + ' centered around user. Does not affect adjacent Units.';
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
			if (type === 'Melee') {
				return 'Move in a straight line between ' + args[0] + ' and ' + args[1] + ' Units. Each target in this line is affected by this attack.';
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
			if (type === 'Melee') {
				return 'The dimensions of this attack are all connected Elemental Terrain Units to the Elemental Terrain Unit adjacent to the user. Increase Accuracy by 1 per Unit affected.';
			}
			return 'Cannot apply Area Attack - Suppress to [Range] Attacks.';
		},
	},
	'Attack Effect - Cleanse': {
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
	'Attack Effect - Courageous Charge': {
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
	'Attack Effect - Fury': {
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
	'Attack Effect - Haste': {
		type: 'effect',
		cost: 2,
		ranks: 1,
		text: 'The target of the Attack gains an additional Simple Action to use for one round. This Effect has no Duration, and cannot be extended by [Intensify]. An Area Attack with the Haste Effect must be used as a Complex Action.',
		unlocks: [],
		prerequisites: {},
		args: [],
		method: function (args) {
			return 'No Duration. The target gains an additional Simple Action on their next turn. If an Area Attack, this Attack requires a Complex Action.';
		},
	},
	'Attack Effect - Intensify': {
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
	'Attack Effect - Lifesteal': {
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
	'Attack Effect - Power of David': {
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
	'Attack Effect - Power of Goliath': {
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
	'Attack Effect - Regenerate': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target regains Wound Boxes at the start of their turn equal to the user’s BIT Value for the duration of this Effect. While under the effects of Regenerate, the target reduces the duration of all incoming effects by 4 Rounds (to their minimum).',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. At the start of target\'s turn, recover ' + args[0] + ' Wound Boxes. Target also reduces all incoming effects by 4 (to their minimum).';
		},
	},
	'Attack Effect - Shield': {
		type: 'effect',
		cost: 3,
		ranks: 1,
		text: 'The target gains an amount of Temporary Wound Boxes equal to the user’s BIT value. Temporary Wound Boxes cannot be added to a target that already has any Temporary Wound Boxes. You cannot use an Attack that applies the [Shield] Effect more than once per Round. Temporary Wound Boxes are removed either when the duration of the effect runs out, or at the end of combat.',
		unlocks: [],
		prerequisites: {},
		args: ['specBIT'],
		method: function (args) {
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. The target gains ' + args[0] + ' Temporary Wound Boxes if they do not have any currently. These Temporary Wound Boxes are removed when the effect ends.';
		},
	},
	'Attack Effect - Strengthen': {
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
	'Attack Effect - Swiftness': {
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
	'Attack Effect - Vigilance': {
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
	'Attack Effect - Vigor': {
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
};

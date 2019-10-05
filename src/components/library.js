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
			return 'Duration = Remaining Accuracy Dice, minimum 1 Round. Decrease Accuracy by ' + args[0] + '. If the target was Clashing with the user, the Clash ends, and it may not initiate clashes with the user for the duration.';
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
		type: 'stance',
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
		type: 'stance',
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
		type: 'stance',
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
		type: 'stance',
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
		type: 'stance',
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
		type: 'stance',
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
		type: 'stance',
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
		args: ['specRAM'],
		method: function (args) {
			return 'Spend one Simple Action from your next turn when an opponent misses you with an Attack. Make this Attack against that opponent, reducing their Dodge Stat by ' + args[0] + ' for the length of this Attack. Do not apply an Area Attack Quality if this Attack has one.';
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
		text: 'An Attack with the [Pierce] Tag ignores up to X points that any defending Digimon has in Armor, where X is double the Ranks you have of Armor Piercing.',
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
	'Signature Move': {
		type: 'special',
		cost: 3,
		ranks: 2,
		text: 'For each Rank of Signature Move a Digimon has, it may apply one extra Attack Feature Quality to a single Attack. Only a single Attack can be modified by Signature Move. NOTE: in the DDA Builder, Signature Move applies to the FIRST Attack in the Attack list.',
		unlocks: [],
		prerequisites: {},
	},
};

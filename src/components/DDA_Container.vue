<template>
	<div>
		<div class='header'>
			<img src='./../assets/digivice.png' class='logo' alt='logo' />
			<h1 id='app-title'>Digimon Digital Adventures TV Homebrew Character Builder</h1>
		</div>
		<hr><br>
			<div>
				<select v-model='characterSelect'>
					<option value=null>Add Character</option>
					<optgroup label='Human'>
						<option value='humanChild'>Add Child Human</option>
						<option value='humanTeen'>Add Teen Human</option>
						<option value='humanAdult'>Add Adult Human</option>
					</optgroup>
					<optgroup label='Digimon'>
						<option value='digimonFresh'>Add Fresh Digimon</option>
						<option value='digimonInTraining'>Add In-Training Digimon</option>
						<option value='digimonRookie'>Add Rookie Digimon</option>
						<option value='digimonChampion'>Add Champion Digimon</option>
						<option value='digimonUltimate'>Add Ultimate Digimon</option>
						<option value='digimonMega'>Add Mega Digimon</option>
						<option value='digimonBurst'>Add Burst Digimon</option>
					</optgroup>
				</select>
				<button class='saveButton' @click='loadFile'>Load Character</button>
				<button @click='saveCharacters'>Save All Characters</button>
				<button @click='saveCharacter'>Save Character</button>
				<input class='hidden' type='file' id='openCharacterInput' @change='loadCharacters'/>
			</div>
		<hr><br>
		<div class='middle'>
			<div class='characterList'>
				<div class='characterBlock' v-for='(character, index) in characters' v-bind:key='index'>
					<span class='deleteButton' @click='deleteCharacter(index)'>X</span>
					<span class='characterTile' @click='switchToCharacter(index)'>{{character.name}}</span>
				</div>
			</div>
			<div class='pane'>
				<span v-for='(character, index) in characters' v-bind:key='index'>
				<div class='paneFields' v-show='index === currentCharacter'>
					<dda_digimon :data='character' v-if='character.characterClass === "Digimon"'/>
					<dda_human :data='character' v-else-if='character.characterClass === "Human"' @updateCharacter='updateCharacter($event, index)'/>
				</div>
				</span>
			</div>
		</div>
		<div class='footer'>
			<span>
				Digimon Digital Adventures Character Builder by: <a href='https://github.com/TaurusVersant/DDABuilder_TV_Homebrew'>Taurus Versant</a>
				&nbsp;|&nbsp;
				<a href='https://docs.google.com/document/d/1c6Ps7t_apFtPfTWb3wSxePjZOXR3r4dNhkglQDIrVNs'>Homebrew of the DDA System</a>
				&nbsp;|&nbsp;
				<a href='http://digimon-digital-adventures.tumblr.com/'>Digimon Digital Adventures Roleplaying Game Blog</a>
				&nbsp;|&nbsp;
				<a href='https://discordapp.com/invite/JbDK59r'>Join the Discord here!</a>
				&nbsp;|&nbsp;
				<a href='http://ko-fi.com/taurusversant'>Even a dollar helps support my work</a>
			</span>
		</div>
	</div>
</template>

<script>
import DDA_Digimon from './DDA_Digimon';
import DDA_Human from './DDA_Human';
export default {
	name: 'DDA_Container',
	props: [],
	data: function () {
		return {
			characters: [],
			characterSelect: null,
			currentCharacter: null,
			characterTypes: {
				humanChild: { type: 'Child', currentPoints: 30, startingPoints: 30, startingCap: 3, finalCap: 5, areaCap: 20 },
				humanTeen: { type: 'Teenager', currentPoints: 40, startingPoints: 40, startingCap: 5, finalCap: 7, areaCap: 20 },
				humanAdult: { type: 'Adult', currentPoints: 50, startingPoints: 50, startingCap: 7, finalCap: 10, areaCap: 25 },
				digimonFresh: { type: 'Fresh', points: 5 },
				digimonInTraining: { type: 'In-Training', points: 15 },
				digimonRookie: { type: 'Rookie', points: 25 },
				digimonChampion: { type: 'Champion', points: 40 },
				digimonUltimate: { type: 'Ultimate', points: 55 },
				digimonMega: { type: 'Mega', points: 70 },
				digimonBurst: { type: 'Burst', points: 85 },
			},
		}
	},
	computed: {},
	watch: {
		characterSelect: function () {
			if (this.characterSelect) {
				let characterClass = ['humanChild', 'humanTeen', 'humanAdult'].includes(this.characterSelect) ? 'Human' : 'Digimon';
				this.characters.push(Object.assign({
						characterClass: characterClass,
						stage: this.characterSelect,
						name: null,
					},
					this.characterTypes[this.characterSelect]
				));
				this.characterSelect = null;
				this.currentCharacter = this.characters.length - 1;
				// document.getElementById('characterName').focus();
			}
		},
	},
	methods: {
		switchToCharacter: function (index) {
			this.currentCharacter = index;
		},
		deleteCharacter: function (index) {
			this.currentCharacter = null;
			// this.$delete(this.characters, index);
			let newCharactersArray = [];
			for (let i in this.characters) {
				if (Number.parseInt(i) !== index) {
					newCharactersArray.push(this.characters[i]);
				}
			}

			this.$set(this, 'characters', newCharactersArray);
		},
		updateCharacter: function (character, index) {
			this.$set(this.characters, index, character);
		},
		saveCharacter: function () {
			if (Number.isInteger(this.currentCharacter)) {
				let currentCharacter = this.characters[this.currentCharacter];
				currentCharacter.tvHomebrew = true;
				let characterBlob = new Blob([JSON.stringify(currentCharacter)], {type: 'text/plain;charset=utf-8'});
				this.FileSaver.saveAs(characterBlob, currentCharacter.name + '.json');
			}
		},
		saveCharacters: function () {
			let characterArray = [];

			for (let index in this.characters) {
				let character = this.characters[index];
				character.tvHomebrew = true;
				characterArray.push(JSON.stringify(character));
			}

			let characterBlob = new Blob([characterArray.join('\n')], {type: 'text/plain;charset=utf-8'});
			this.FileSaver.saveAs(characterBlob, 'characters.json');
		},
		loadFile: function () {
			let openCharacterInput = document.getElementById('openCharacterInput');
			openCharacterInput.click();
		},
		loadCharacters (event) {
			let file = event.target.files[0];
			event.target.value = null;
			if (!file) { return; }

			let self = this;
			let reader = new FileReader();
			reader.onload = (function (app) {
				return function (event) {
					try {
						let contents = event.target.result.split(/[\r\n]+/);
						for (let index in contents) {
							let characterObject = JSON.parse(contents[index]);
							if (characterObject.tvHomebrew) {
								characterObject.loadCharacter = true;
								self.characters.push(characterObject);
							} else {
								self.characters.push(self.convertHuman(characterObject));
							}
						}
						event.target.files = null;
					} catch (event) {
					alert(event);
					}
				};
			})(this);

			reader.readAsText(file);
		},
		convertHuman: function (previousStructure) {
			let attributeTotal = 0;
			for (let i in previousStructure.attributes) {
				attributeTotal += previousStructure.attributes[i];
			}

			let skillTotal = 0;
			for (let i in previousStructure.skills) {
				skillTotal += previousStructure.skills[i];
			}

			let characterType = 'human' + previousStructure.age;
			let characterTemplate = this.characterTypes[characterType];
			let bonusTotal = previousStructure.totalCreationPoints - characterTemplate.startingPoints;
			let bonusPoints = previousStructure.creationPoints - characterTemplate.startingPoints;

			let torments = [];
			let tormentLookup = {
				terribleTorments: {
					type: 'Terrible',
					total: 10,
					startingCap: 4,
				},
				majorTorments: {
					type: 'Major',
					total: 7,
					startingCap: 3,
				},
				minorTorments: {
					type: 'Minor',
					total: 5,
					startingCap: 2,
				},
			};
			for (let i in tormentLookup) {
				for (let j in previousStructure[i]) {
					torments.push({
						type: tormentLookup[i].type,
						marked: previousStructure[i][j].checked,
						total: tormentLookup[i].total,
						text: previousStructure[i][j].id,
						startingCap: tormentLookup[i].startingCap,
					});
				}
			}

			return Object.assign(characterTemplate, {
				'name': previousStructure.name,
				'creationComplete': previousStructure.flags['creationComplete'],
				'currentPoints': previousStructure.creationPoints,
				'bonusPoints': bonusPoints > 0 ? bonusPoints : 0,
				'bonusTotal': bonusTotal,
				'attributes': {
					'Agility': previousStructure.attributes['Agility'],
					'Body': previousStructure.attributes['Body'],
					'Charisma': previousStructure.attributes['Charisma'],
					'Intelligence': previousStructure.attributes['Intelligence'],
					'Willpower': previousStructure.attributes['Willpower'],
				},
				'attributeTotal': attributeTotal,
				'skills': {
					'Evade': previousStructure.skills['Dodge'],
					'Fight': previousStructure.skills['Fight'],
					'Stealth': previousStructure.skills['Stealth'],
					'Athletics': previousStructure.skills['Athletics'],
					'Endurance': previousStructure.skills['Endurance'],
					'Feats of Strength': previousStructure.skills['Feats of Strength'],
					'Manipulate': previousStructure.skills['Manipulate'],
					'Perform': previousStructure.skills['Perform'],
					'Persuade': previousStructure.skills['Persuade'],
					'Computer': previousStructure.skills['Computer'],
					'Survival': previousStructure.skills['Survival'],
					'Knowledge': previousStructure.skills['Knowledge'],
					'Perception': previousStructure.skills['Perception'],
					'Decipher Intent': previousStructure.skills['Decipher Intent'],
					'Bravery': previousStructure.skills['Bravery'],
				},
				'skillTotal': skillTotal,
				'Wound Boxes': previousStructure.woundBoxes,
				'Sanity Drain': previousStructure.sanityDrain,
				'Inspiration': previousStructure.inspiration,
				'majorAspect': previousStructure.majorAspects[0],
				'majorUses': 0,
				'minorAspect': previousStructure.minorAspects[0],
				'minorUses': 0,
				'torments': torments,
				'notes': previousStructure.details,
				'image': previousStructure.humanImage,
				'characterClass': previousStructure.class,
				'stage': characterType,
				'type': previousStructure.age,
				'tvHomebrew': true,
				'loadCharacter': true,
			});
		},
	},
	created: function () {
		this.FileSaver = require('file-saver');
		/*
		this.characters.push({
			characterClass: 'GM',
			name: 'GM Screen',
		});
		*/
	},
	components: {
		dda_digimon: DDA_Digimon,
		dda_human: DDA_Human,
	},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	#app hr {
		width: 1190px;
		float: left;
	}

	div.header {
		width: 1150px;
		background-color: #222;
		height: 85px;
		padding: 20px;
	}

	div.header>h1 {
		font-size: 1.5em;
		display: inline;
		color: white;
		top: -30px;
		left: 20px;
		position: relative;
	}

	img.logo {
		height: 80px;
		display: inline;
	}

	div.middle {
		display: flex;
	}

	div.characterList {
		width: 190px;
		padding-top: 7px;
	}

	div.pane  {
		background-color: #eeeeee;
		min-width: 1000px;
		max-width: 1000px;
		min-height: 600px;
		padding-bottom: 5px;
		flex-grow: 1;
	}

	div.paneFields {
		padding-top: 10px;
		padding-left: 10px;
	}

	div.footer {
		font-size: 10px;
		margin-top: 10px;
		margin-bottom: 20px;
		padding-left: 200px;
	}

	div.characterBlock {
	}

	span.characterTile {
		border: 1px solid;
		margin-bottom: -1px;
		text-align: center;
		min-height: 18px;
		background: #eeeeee;
		display: inline-block;
		width: 170px;
	}

	span.characterTile:hover {
		background-color: #222;
		color: white;
	}

	span.deleteButton {
		color: red;
		cursor: pointer;
	}

	button.saveButton {
		margin-left: 643px;
	}

	.hidden {
		display: none;
	}
</style>

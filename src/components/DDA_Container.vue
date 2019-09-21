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
			</div>
		<hr><br>
		<div class='middle'>
			<div class='characterList'>
				<div class='characterBlock' v-for='(character, index) in characters' v-bind:key='index'>
					<span class='characterTile' @click='switchToCharacter(index)'>
						{{character.name}}
					</span>
					<span class='deleteCharacterButton' @click='deleteCharacter(index)'>X</span>
				</div>
			</div>
			<div class='pane'>
				<div class='paneFields' v-if='Number.isInteger(currentCharacter)'>
					<dda_digimon :character='characters[currentCharacter]' v-if='characters[currentCharacter].characterClass === "Digimon"'/>
					<dda_human :character='characters[currentCharacter]' v-else-if='characters[currentCharacter].characterClass === "Human"'/>
				</div>
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
			msg: 'And so we begin... I hope it goes',
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
			humanTemplate: {
				name: null,
				creationComplete: false,
				bonusPoints: 0,
				bonusTotal: 0,
				Agility: 0,
				Body: 0,
				Charisma: 0,
				Intelligence: 0,
				Willpower: 0,
				attributeTotal: 0,
				Dodge: 0,
				Fight: 0,
				Stealth: 0,
				Athletics: 0,
				Endurance: 0,
				'Feats of Strength': 0,
				Manipulate: 0,
				Perform: 0,
				Persuade: 0,
				Computer: 0,
				Survival: 0,
				Knowledge: 0,
				Perception: 0,
				'Decipher Intent': 0,
				Bravery: 0,
				skillTotal: 0,
				'Sanity Drain': 0,
				Inspiration: 1,
				aspect: {
					Major: null,
					Minor: null,
				},
				torments: {
					Minor: [],
					Major: [],
					Terrible: [],
				},
				notes: null,
				image: null,
			},
			digimonTemplate: {},
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
					},
					characterClass === 'Human' ? this.humanTemplate : this.digimonTemplate,
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
			this.$delete(this.characters, index);
		},
	},
	created: function () {
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

	span.deleteCharacterButton {
		color: red;
		cursor: pointer;
	}
</style>

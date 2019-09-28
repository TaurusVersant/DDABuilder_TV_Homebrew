<template>
	<div>
		<label for='characterName'>Name:</label>
		<input id='characterName' v-model='character.name'/>
		<br>
		<label for='characterStage'>Stage:</label>
		<input id='characterStage' v-model='characterTypes[character.stage]' disabled/>
	</div>
</template>

<script>
export default {
	name: 'DDA_Digimon',
	props: ['data'],
	data: function () {
		return {
			characterTypes: {
				humanChild: 'Child',
				humanTeen: 'Teenager',
				humanAdult: 'Adult',
				digimonFresh: 'Fresh',
				digimonInTraining: 'In-Training',
				digimonRookie: 'Rookie',
				digimonChampion: 'Champion',
				digimonUltimate: 'Ultimate',
				digimonMega: 'Mega',
				digimonBurst: 'Burst',
			},
			character: {
				name: null,
			}
		}
	},
	computed: {},
	watch: {},
	methods: {},
	created: function () {
		this.character = Object.assign(this.character, this.data);
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

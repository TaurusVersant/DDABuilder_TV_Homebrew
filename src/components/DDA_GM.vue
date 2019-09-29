<template>
	<div>
		<h1 id='characterTitle'>GM Screen</h1>
		<div v-for='(character, index) in characters' v-bind:key='index' v-if='character.characterClass === "Human"'>
			<h3><u>{{character.name}}</u>: {{character['Wound Boxes']}}/{{derivedWoundBoxes(index)}}</h3>
			<div><u>Major Aspect:</u> {{character.majorAspect}}</div><br>
			<div><u>Minor Aspect:</u> {{character.minorAspect}}</div>
			<div>
				<h3>Torments:</h3>
				<span v-for='(torment, i) in character.torments' v-bind:key='i'>
					<div><u>{{torment.type}} Torment</u>: {{torment.text}}</div><br>
				</span>
			</div>
			<dda_textarea :textProperty='character.gmNotes' widthProperty='91' @change='updateProperty($event, "gmNotes", index)'/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DDA_GM',
	props: ['characters'],
	data: function () {
		return {}
	},
	computed: {},
	watch: {},
	methods: {
		derivedWoundBoxes: function (index) {
			let woundBoxes = this.characters[index].attributes['Body'] + this.characters[index].skills['Endurance'];
			let woundBoxTotal = woundBoxes > 2 ? woundBoxes : 2;
			return woundBoxTotal;
		},
		updateProperty: function (value, property, index) {
			this.$set(this.characters[index], property, value);
		},
	},
	created: function () {},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	h1#characterTitle {
		min-height: 37px;
		margin-top: -5px;
	}
</style>

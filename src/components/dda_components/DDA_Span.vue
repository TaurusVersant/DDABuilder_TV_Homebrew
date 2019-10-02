<template>
	<p>
		<label class='labelTag' for='inputName'>{{inputName}}:</label>
		<span class='labelValue' id='inputName'>{{textProperty}}</span>
		<span v-if='hasModifier'>
			<span>+&nbsp;</span>
			<input class='modifierInput' type='text' :value='modifier' disabled='true'/>
			<span class='pointer' @click='changeModifier'>&#9998;</span>
		</span>
		<span v-if='roll' class='pointer' @click="$emit('rollStat', inputName)">🎲</span>
	</p>
</template>

<script>
export default {
	name: 'DDA_Span',
	props: ['textProperty', 'inputName', 'roll', 'modifier'],
	data: function () {
		return {}
	},
	computed: {
		hasModifier: function () {
			return Number.isInteger(this.modifier);
		},
		modifierValue: function () {
			return this.hasModifier ? this.modifier : 0;
		},
	},
	watch: {},
	methods: {
		changeModifier: function () {},
	},
	created: function () {},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	label.labelTag {
		width: 150px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		min-height: 30px;
	}

	span.labelValue {
		margin: 26px;
	}

	span.pointer {
		cursor: pointer;
	}

	input.modifierInput {
		width: 30px;
		text-align: center;
	}
</style>

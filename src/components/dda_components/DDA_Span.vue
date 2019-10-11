<template>
	<p>
		<!-- Label -->
		<label
			class='labelTag'
			for='inputName'
		>{{inputName}}:</label>
		<!-- Span -->
		<span
			class='labelValue'
			id='inputName'
		>{{textProperty}}</span>
		<!-- Modifier -->
		<span v-if='hasModifier'>
			<span>+&nbsp;</span>
			<input
				class='modifierInput'
				type='number'
				v-model='modifierValue'
				@change='$emit("changeMod", modifierValue)'
			/>
		</span>
		<!-- Roller -->
		<span
			v-if='roll'
			class='pointer'
			@click='$emit("rollStat", inputName)'
		>&#127922;</span>
	</p>
</template>

<script>
export default {
	name: 'DDA_Span',
	props: ['inputName', 'textProperty', 'modifier', 'roll'],
	data: function () {
		return {
			modifierValue: 0,
		};
	},
	computed: {
		hasModifier: function () {
			return Number.isInteger(this.modifier);
		},
	},
	watch: {
		modifier: function () {
			this.modifierValue = this.modifier;
		},
	},
	methods: {},
	created: function () {
		this.modifierValue = this.hasModifier ? this.modifier : 0;
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	label.labelTag {
		width: 160px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		min-height: 30px;
	}

	span.labelValue {
		margin-left: 26px;
		width: 50px;
		display: inline-block;
	}

	span.pointer {
		cursor: pointer;
	}

	input.modifierInput {
		width: 40px;
		text-align: center;
	}
</style>

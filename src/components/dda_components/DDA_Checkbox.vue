<template>
	<p>
		<!-- Label -->
		<label
			class='labelTag'
			for='inputName'
		>{{inputName}}:</label>
		<!-- Checkbox -->
		<input
			class='labelCheckbox'
			id='inputName'
			type='checkbox'
			v-model='textValue'
			@change='$emit("change", textValue)'
		/>
	</p>
</template>

<script>
export default {
	name: 'DDA_Checkbox',
	props: ['inputName', 'textProperty'],
	data: function () {
		return {
			textValue: false,
		}
	},
	computed: {},
	watch: {
		textProperty: function () {
			this.setTextValue();
		},
	},
	methods: {
		setTextValue: function () {
			this.textValue = this.textProperty;
		},
	},
	created: function () {
			this.setTextValue();
	},
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

	input.labelCheckbox {
		margin-left: 40px;
	}
</style>

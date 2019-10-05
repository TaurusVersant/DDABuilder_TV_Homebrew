<template>
	<p>
		<!-- Label -->
		<label
			class='labelTag'
			for='inputName'
		>{{inputName}}:</label>
		<!-- Input -->
		<input
			class='labelInput'
			id='inputName'
			:disabled='disableFlag'
			v-model='textValue'
			@input='$emit("change", $event.target.value)'
		/>
	</p>
</template>

<script>
export default {
	name: 'DDA_Input',
	props: ['inputName', 'textProperty', 'disableFlag'],
	data: function () {
		return {
			textValue: '',
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

	input.labelInput {
		width: 169px;
		margin-bottom: 10px;
		text-align: center;
	}
</style>

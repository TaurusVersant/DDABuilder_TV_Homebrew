<template>
	<p>
		<label class='labelTag' for='inputName'>{{inputName}}:</label>
		<input class='labelInput' id='inputName' v-model='textValue' :disabled='disableFlag' @input='$emit("change", $event.target.value)'/>
	</p>
</template>

<script>
export default {
	name: 'DDA_Input',
	props: ['textProperty', 'inputName', 'disableFlag'],
	data: function () {
		return {
			textValue: '',
		}
	},
	computed: {},
	watch: {
		textProperty: function () {
			this.textValue = this.textProperty;
		},
	},
	methods: {},
	created: function () {
		this.textValue = this.textProperty;
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

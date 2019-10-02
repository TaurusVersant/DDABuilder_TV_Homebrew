<template>
	<p>
		<label class='labelTag' for='inputName'>{{inputName}}:</label>
		<select class='labelInput' id='inputName' v-model='textValue' @input='$emit("change", $event.target.value)'>
			<option v-for='(option, index) in options' v-bind:key='index' :value='option'>{{option}}</option>
		</select>
	</p>
</template>

<script>
export default {
	name: 'DDA_Select',
	props: ['textProperty', 'inputName', 'options'],
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
		min-width: 150px;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
		font-weight: bold;
		min-height: 30px;
	}

	select.labelInput {
		min-width: 169px;
		margin-bottom: 10px;
		text-align: center;
	}
</style>

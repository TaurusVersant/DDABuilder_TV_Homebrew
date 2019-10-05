<template>
	<p class='component'>
		<!-- Label -->
		<label
			class='labelTag'
			for='inputName'
		>{{inputName}}:</label>
		<!-- Select -->
		<select
			class='labelInput'
			id='inputName'
			v-model='textValue'
			@input='$emit("change", $event.target.value)'
		>
			<!-- Options -->
			<option
				v-for='(option, index) in options'
				:key='index'
				:value='option'
			>{{option}}</option>
		</select>
	</p>
</template>

<script>
export default {
	name: 'DDA_Select',
	props: ['inputName', 'textProperty', 'options'],
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
	p.component {
		min-width: 400px;
	}

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

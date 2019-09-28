<template>
	<span>
		<label class='labelTag' for='inputName'>{{inputName}}:</label>
		<span class='labelValue' id='inputName'>{{textProperty}}</span>
	</span>
</template>

<script>
export default {
	name: 'DDA_Span',
	props: ['textProperty', 'inputName'],
	data: function () {
		return {}
	},
	computed: {},
	watch: {},
	methods: {},
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
</style>

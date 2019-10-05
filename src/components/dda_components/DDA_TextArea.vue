<template>
	<!-- Text Area -->
	<textarea
		:style='textAreaStyle'
		v-model='textValue'
		@input='$emit("change", $event.target.value)'
	></textarea>
</template>

<script>
export default {
	name: 'DDA_TextArea',
	props: ['textProperty', 'widthProperty'],
	data: function () {
		return {
			textValue: '',
		}
	},
	computed: {
		height: function () {
			let modifier = Math.floor(1700 / this.widthProperty);
			let rows = this.textValue ? Math.floor(this.textValue.length / 128) + this.textValue.split(/\r\n|\r|\n/).length : 2;
			return (rows > 2 ? rows : 2) * modifier + 'px';
		},
		textAreaStyle: function () {
			return 'height:' + this.height + ';width:' + this.widthProperty + '%';
		},
	},
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
	textarea {
		margin: 10px;
		resize: none;
	}
</style>

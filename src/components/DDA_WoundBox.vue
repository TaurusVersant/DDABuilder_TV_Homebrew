<template>
	<div>
		<input v-for='index in total' ref='woundBoxes' v-bind:key='index' class='woundbox' type='checkbox' @change='$emit("changeHealth", index)' />
	</div>
</template>

<script>
export default {
	name: 'DDA_WoundBox',
	props: ['current', 'total'],
	data: function () {
		return {
			markings: [],
		}
	},
	computed: {},
	watch: {
		current: function () {
			for (let i in this.$refs['woundBoxes']) {
				this.$refs['woundBoxes'][i].checked = i >= this.current;
			}
		},
	},
	methods: {},
	mounted: function () {
		for (let i in this.$refs['woundBoxes']) {
			this.$refs['woundBoxes'][i].checked = i >= this.current;
		}
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	input.woundbox {
		transform: scale(4);
		margin: 30px;
	}
</style>

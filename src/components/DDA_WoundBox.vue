<template>
	<div>
		<input v-for='index in total' ref='woundBoxes' v-bind:key='index' class='woundbox' type='checkbox' @change='$emit("changeHealth", index)'/>
		<span v-if='temporary > 0'>
		|<input v-for='index in temporary' ref='tempWoundBoxes' v-bind:key='index' class='woundbox' type='checkbox' @change='$emit("markTemporary", index)'/>
		</span>
	</div>
</template>

<script>
export default {
	name: 'DDA_WoundBox',
	props: ['current', 'total', 'temporary'],
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
		temporary: function () {
			for (let i in this.$refs['tempWoundBoxes']) {
				this.$refs['tempWoundBoxes'][i].checked = false;
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

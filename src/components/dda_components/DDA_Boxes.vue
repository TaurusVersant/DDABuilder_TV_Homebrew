<template>
	<div>
		<input v-for='index in total' ref='boxes' v-bind:key='index' class='box' type='checkbox' :disabled='index > fieldCap' @click='$emit("change", index)'/>
	</div>
</template>

<script>
export default {
	name: 'DDA_Boxes',
	props: ['current', 'total', 'cap'],
	data: function () {
		return {
			markings: [],
		}
	},
	computed: {
		fieldCap: function () {
			return Number.isInteger(this.cap) ? this.cap : this.total;
		},
	},
	watch: {
		current: function () {
			for (let i in this.$refs['boxes']) {
				this.$refs['boxes'][i].checked = i < this.current;
			}
		},
	},
	methods: {},
	mounted: function () {
		for (let i in this.$refs['boxes']) {
			this.$refs['boxes'][i].checked = i < this.current;
		}
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	input.box {
		transform: scale(2);
		margin-left: 30px;
	}
</style>

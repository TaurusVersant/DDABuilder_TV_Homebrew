<template>
	<div>
		<!-- List of Wound Box Checkboxes -->
		<input
			v-for='index in total'
			class='box'
			ref='boxes'
			type='checkbox'
			:key='index'
			:disabled='index > fieldCap'
			@click='$emit("change", index)'
		/>
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
			this.setBoxes();
		},
	},
	methods: {
		setBoxes: function () {
			for (let i in this.$refs['boxes']) {
				this.$refs['boxes'][i].checked = i < this.current;
			}
		},
	},
	mounted: function () {
		this.setBoxes();
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

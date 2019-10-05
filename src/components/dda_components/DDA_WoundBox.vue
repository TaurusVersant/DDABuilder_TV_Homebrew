<template>
	<div>
		<!-- List of Wound Boxes -->
		<input
			v-for='index in total'
			class='woundbox'
			ref='woundBoxes'
			type='checkbox'
			:key='index'
			@change='$emit("changeHealth", index)'
		/>
		<!-- List of Temporary Wound Boxes -->
		<span v-if='temporary > 0'>|
			<input
				v-for='index in temporary'
				class='woundbox'
				ref='tempWoundBoxes'
				type='checkbox'
				:key='index'
				@change='$emit("markTemporary", index)'
			/>
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
			this.setBoxes();
		},
		temporary: function () {
			for (let i in this.$refs['tempWoundBoxes']) {
				this.$refs['tempWoundBoxes'][i].checked = false;
			}
		},
	},
	methods: {
		setBoxes: function () {
			for (let i in this.$refs['woundBoxes']) {
				this.$refs['woundBoxes'][i].checked = i >= this.current;
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
	input.woundbox {
		transform: scale(4);
		margin: 30px;
	}
</style>

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
				:disabled='handlingTemporary'
				@change='markTemporary(index)'
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
			handlingTemporary: false,
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
			this.handlingTemporary = false;
		},
	},
	methods: {
		setBoxes: function () {
			for (let i in this.$refs['woundBoxes']) {
				this.$refs['woundBoxes'][i].checked = i >= this.current;
			}
		},
		markTemporary: function (index) {
			this.handlingTemporary = true;
			let self = this;
			setTimeout(function () { self.$emit('markTemporary', index); }, 200);
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

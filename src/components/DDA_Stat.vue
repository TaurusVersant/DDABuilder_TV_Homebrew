<template>
	<div>
		<p>
			<label class='labelTag' :for='"stat"+stat'>{{stat}}:</label>
			<button @click="$emit('changeStat', stat, 0)">-</button>
			<span class='labelValue' :id='"stat" + stat'>{{value}}{{totalModifier}}</span>
			<button @click="$emit('changeStat', stat, 1)">+</button>
			<span class='roller' @click="$emit('rollStat', stat)" v-if='roll'>🎲</span>
		</p>
	</div>
</template>

<script>
export default {
	name: 'DDA_Stat',
	props: ['stat', 'value', 'total_stat', 'roll', 'width'],
	data: function () {
		return {}
	},
	computed: {
		totalModifier: function () {
			return Number.isInteger(this.total_stat) ? '/' + this.total_stat : null;
		},
	},
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
	}

	span.labelValue {
		margin: 10px;
	}

	span.roller {
		cursor: pointer;
	}
</style>

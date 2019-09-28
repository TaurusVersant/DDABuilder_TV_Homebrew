<template>
	<div>
		<p>
			<label class='labelTag' :for='"stat"+stat'>{{stat}}:</label>
			<button @click="$emit('changeStat', stat, 0)">-</button>
			<span class='labelValue' :id='"stat" + stat'>{{value}}{{total_modifier}}</span>
			<button @click="$emit('changeStat', stat, 1)">+</button>
			<span class='roller' @click="$emit('rollStat', stat)" v-if='add_roll'>🎲</span>
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
		total_modifier: function () {
			return Number.isInteger(this.total_stat) ? '/' + this.total_stat : null;
		},
		add_roll: function () {
			return this.roll;
		}
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

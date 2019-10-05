<template>
	<div>
		<p>
			<!-- Label -->
			<label
				class='labelTag'
				:for='"stat"+stat'
			>{{stat}}:</label>
			<!-- Lower Stat Button -->
			<button
				@click="$emit('changeStat', stat, 0)"
			>-</button>
			<!-- Value -->
			<span
				class='labelValue'
				:id='"stat" + stat'
			>{{value}}{{totalModifier}}</span>
			<!-- Raise Stat Button -->
			<button
				@click="$emit('changeStat', stat, 1)"
			>+</button>
			<!-- Modifier -->
			<span v-if='hasModifier'>
				<span>+&nbsp;</span>
				<input
					class='modifierInput'
					type='number'
					v-model='modifierValue'
					@change='$emit("changeMod", modifierValue)'
				/>
			</span>
			<!-- Roll Stat -->
			<span
				v-if='roll'
				class='roller'
				@click="$emit('rollStat', stat)"
			>&#127922;</span>
		</p>
	</div>
</template>

<script>
export default {
	name: 'DDA_Stat',
	props: ['stat', 'value', 'total_stat', 'modifier', 'roll'],
	data: function () {
		return {
			modifierValue: 0,
		};
	},
	computed: {
		totalModifier: function () {
			return Number.isInteger(this.total_stat) ? '/' + this.total_stat : null;
		},
		hasModifier: function () {
			return Number.isInteger(this.modifier);
		},
	},
	watch: {},
	methods: {},
	created: function () {
		this.modifierValue = this.hasModifier ? this.modifier : 0;
	},
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

	input.modifierInput {
		width: 40px;
		text-align: center;
	}
</style>

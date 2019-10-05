<template>
	<div class='divRow'>
		<div class='firstColumn'>
			<table>
				<thead>
					<tr>
						<th>Positive Effects</th>
						<th>Duration</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='index in [0,1,2]' :key='index'>
						<td><input
							class='effectName'
							type='text'
							v-model='effects.positive[index].name'
						/></td>
						<td><input
							class='effectDuration'
							type='number'
							v-model='effects.positive[index].duration'
						/></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class='secondColumn'>
			<table>
				<thead>
					<tr>
						<th>Negative Effects</th>
						<th>Duration</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='index in [0,1,2]' :key='index'>
						<td><input
							class='effectName'
							type='text'
							v-model='effects.negative[index].name'
						/></td>
						<td><input
							class='effectDuration'
							type='number'
							v-model='effects.negative[index].duration'
						/></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DDA_Effects',
	props: ['effects'],
	data: function () {
		return {};
	},
	computed: {},
	watch: {},
	methods: {},
	created: function () {},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	div.divRow {
		width: 850px;
		margin-left: 2px;
		display: flex;
	}

	div.firstColumn {
		width: 550px;
	}

	div.secondColumn {
		flex-grow: 1;
	}

	td {
		text-align: center;
	}

	input.effectName {
		width: 350px;
		text-align: center;
	}

	input.effectDuration {
		width: 50px;
		text-align: center;
	}
</style>

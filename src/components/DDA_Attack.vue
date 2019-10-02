<template>
	<tbody>
		<tr>
			<td class='tableRow'>
				<input type='text' v-model='attack.name'/>
			</td>
			<td class='tableRow'>
				<select v-model='attack.type'>
					<option value='' disabled/>
					<option value='Melee'>Melee</option>
					<option value='Range'>Range</option>
				</select>
			</td>
			<td class='tableRow'>
				<input type='checkbox' v-model='attack.damage'/>
			</td>
			<td class='tableRow'>
				<select v-model='attack.area'>
					<option value=''>No Area Attack</option>
				</select>
			</td>
			<td class='tableRow'>
				<select v-model='attack.effect'>
					<option value=''>No Attack Effect</option>
				</select>
			</td>
			<td class='tableRow'></td>
		</tr>
		<tr>
			<td class='attackTableDescription' colspan='6'><u>Details</u>: {{attackRange}}</td>
		</tr>
	</tbody>
</template>

<script>
export default {
	name: 'DDA_Attack',
	props: ['data', 'range'],
	data: function () {
		return {
			attack: {
				name: null,
				type: null,
				damage: false,
				area: '',
				effect: '',
				features: [],
			}
		}
	},
	computed: {
		attackRange: function () {
			if (this.attack.type === 'Range') {
				return '2 - ' + this.range + ' Units Range';
			} else if (this.attack.type === 'Melee') {
				return '1 Units Range';
			}
		},
	},
	watch: {
		attack: {
			handler: function () {
				this.$emit('attackUpdated', this.attack);
			},
			deep: true,
		},
		data: function () {
			this.attack = Object.assign(this.attack, this.data);
		},
	},
	methods: {},
	mounted: function () {
		this.attack = Object.assign(this.attack, this.data);
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

	td.tableRow {
		text-align: center;
		width: 100px;
	}

	td.attackTableDescription {
		padding-top: 5px;
		padding-bottom: 15px;
		padding-left: 2px;
	}
</style>

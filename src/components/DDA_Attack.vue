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
					<option v-for='(used, tag) in areaTags' v-if='tag' :disabled='used' v-bind:key='tag'>{{tag}}</option>
				</select>
			</td>
			<td class='tableRow'>
				<select v-model='attack.effect'>
					<option value=''>No Attack Effect</option>
					<option v-for='(used, tag) in effectTags' v-if='tag' :disabled='used' v-bind:key='tag'>{{tag}}</option>
				</select>
			</td>
			<td class='tableRow'></td>
			<td class='tableRow'><span class='roller' @click='$emit("doAttack")'>🎯</span></td>
		</tr>
	</tbody>
</template>

<script>
export default {
	name: 'DDA_Attack',
	props: ['data', 'areaTags', 'effectTags'],
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
	computed: {},
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

	span.roller {
		cursor: pointer;
	}
</style>

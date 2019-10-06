<template>
	<tbody>
		<tr :class='signatureMove'>
			<!-- Attack Name -->
			<td class='tableRow'>
				<input
					type='text'
					v-model='attack.name'
				/>
			</td>
			<!-- Attack Range-->
			<td class='tableRow'>
				<select v-model='attack.type'>
					<option value='' disabled/>
					<option value='Melee'>Melee</option>
					<option value='Range'>Range</option>
				</select>
			</td>
			<!-- Attack Damage -->
			<td class='tableRow'>
				<input
					type='checkbox'
					v-model='attack.damage'
				/>
			</td>
			<!-- Area Attack Tag -->
			<td class='tableRow'>
				<select v-model='attack.area'>
					<option value=''>No Area Attack</option>
					<option
						v-for='(used, tag) in areaTags'
						v-if='tag'
						:disabled='used'
						:key='tag'
					>{{tag}}</option>
				</select>
			</td>
			<!-- Attack Effect Tag -->
			<td class='tableRow'>
				<select v-model='attack.effect'>
					<option value=''>No Attack Effect</option>
					<option
						v-for='(used, tag) in effectTags'
						v-if='tag'
						:disabled='used'
						:key='tag'
					>{{tag}}</option>
				</select>
			</td>
			<!-- Attack Feature Tags -->
			<td class='tableRow'>
				<select
					v-for='(feature, index) in features'
					:key='index'
					v-model='features[index]'
				>
					<option value=''>No Attack Feature</option>
					<option
						v-for='(used, tag) in featureTags'
						v-if='tag'
						:disabled='used'
						:key='tag'
					>{{tag}}</option>
				</select>
			</td>
			<!-- Attack Details Button -->
			<td class='tableRow'>
				<span
					class='roller'
					@click='$emit("doAttack")'
				>&#127919;</span>
			</td>
		</tr>
	</tbody>
</template>

<script>
export default {
	name: 'DDA_Attack',
	props: ['attackData', 'areaTags', 'effectTags', 'featureTags'],
	data: function () {
		return {
			attack: {
				name: null,
				type: null,
				damage: false,
				area: '',
				effect: '',
				features: [''],
			},
			features: [''],
			allowUpdate: false,
		};
	},
	computed: {
		signatureMove: function () {
			return this.features.length > 1 ? 'signature' : '';
		},
	},
	watch: {
		attack: {
			handler: function () {
				if (this.allowUpdate) {
					this.$emit('attackUpdated', this.attack);
				}
				this.allowUpdate = true;
			},
			deep: true,
		},
		attackData: {
			handler: function () {
				this.setAttack();
			},
			deep: true,
		},
		features: function () {
			this.attack.features = this.features.slice(0);
		},
	},
	methods: {
		setAttack: function () {
			this.attack = Object.assign(this.attack, this.attackData);
			// We have to prevent an update here or this will cause an infinite loop
			this.allowUpdate = false;
			this.features = this.attack.features.slice(0);
		},
	},
	mounted: function () {
		this.allowUpdate = false;
		this.setAttack();
	},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	tr.signature {
		background-color: orange;
	}

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

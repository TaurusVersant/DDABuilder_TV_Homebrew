<template>
	<div id='ddaQualities' class='modal' @click='deactivateModal'>
		<div class='modal-content'>
			<h3>Available Qualities</h3>
			<table>
				<tbody v-for='(quality, name) in qualities' v-bind:key='name'>
					<tr class='qualityHeader'>
						<th></th>
						<th>Name</th>
						<th>Cost (DP)</th>
						<th>Prerequisites</th>
						<th>Unlocks</th>
					</tr>
					<tr class='qualityRow'>
						<td><button @click='$emit("purchase", name)'>Purchase</button></td>
						<td><i>{{name}}</i></td>
						<td>{{quality.cost}}</td>
						<td>{{Object.keys(quality.prerequisites).join(', ')}}</td>
						<td>{{quality.unlocks.join(', ')}}</td>
					</tr>
					<tr>
						<td class='qualityDesc' colspan='5'><ul><li>{{quality.text}}</li></ul></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DDA_Qualities',
	props: ['qualities'],
	data: function () {
		return {};
	},
	computed: {},
	watch: {},
	methods: {
		activateModal: function () {
			document.getElementById('ddaQualities').style.display = 'block';
		},
		deactivateModal: function (event) {
			// Get the modal
			let modal = document.getElementById('ddaQualities');
			if (modal && event.target.id === modal.id) {
				modal.style.display = 'none';
			}
		},
		closeModal: function () {
			document.getElementById('ddaQualities').style.display = 'none';
		},
	},
	created: function () {},
	components: {},
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	/* The Modal (background) */
	.modal {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	}

	/* Modal Content/Box */
	.modal-content {
		background-color: #fefefe;
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Could be more or less, depending on screen size */
	}

	/* The Close Button */
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	td.tableRowTags {
		text-align: center;
		width: 170px;
	}

	tr.qualityHeader>th {
		border-bottom: dotted;
		border-width: 5px;
	}

	td.qualityDesc {
		text-align: center;
		border-bottom: dotted;
		border-width: 5px;
	}

	tr.qualityRow>td {
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
		width: 100px;
	}
</style>

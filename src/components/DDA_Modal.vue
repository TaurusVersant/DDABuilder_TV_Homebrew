<template>
	<div id='ddaModal' class='modal'>
		<div class='modal-content'>
			<p>{{message}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DDA_Modal',
	props: [],
	data: function () {
		return {
			message: null,
		}
	},
	computed: {},
	watch: {},
	methods: {
		activateModal: function (message) {
			this.message = message;
			document.getElementById('ddaModal').style.display = 'block';
		},
		deactivateModal: function (event) {
			// Get the modal
			let modal = document.getElementById('ddaModal');
			if (modal && event.target.id === modal.id) {
				modal.style.display = 'none';
			}
		},
	},
	created: function () {
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = this.deactivateModal;
	},
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
		width: 40%; /* Could be more or less, depending on screen size */
		text-align: center;
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
</style>

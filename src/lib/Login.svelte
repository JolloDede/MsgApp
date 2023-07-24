<script lang="ts">
	import { axiosInstance } from '../helper/Axios';
	import socket from '../helper/Websocket';
	import { user } from '../stores';

	let name = '';

	function hanldeClick() {
		axiosInstance
			.post('/login', {
				username: name
			})
			.then((res) => {
				console.log(res.data);
				user.set(res.data);
				socket.auth = { id: res.data.id };
				socket.connect();
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<form on:submit|preventDefault>
	<input type="text" bind:value={name} />
	<button on:click={hanldeClick}>Login</button>
</form>

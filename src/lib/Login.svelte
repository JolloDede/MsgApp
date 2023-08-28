<script lang="ts">
	import { Auth } from '../helper/Auth';
	import { axiosInstance } from '../helper/Axios';
	import socket from '../helper/Websocket';
	import { user } from '../stores';

	let name = '';

	async function hanldeClick() {
		Auth(name);
	}
</script>

<form on:submit|preventDefault>
	<input type="text" bind:value={name} />
	<button on:click={hanldeClick}>Login</button>
</form>

<script lang="ts">
	import MainView from '../components/MainView.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import { LOCALSTORAGE_PREFIX, user } from '../stores';
	import Login from '../components/Login.svelte';
	import { Auth } from '../helper/Auth';
	import { onMount } from 'svelte';
	import { axiosInstance } from '../helper/Axios';
	import socket from '../helper/Websocket';

	let singedIn: boolean;
	onMount(async () => {
		let value = JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFIX + 'user'));
		if (await Auth(value.username)) {
			singedIn = true;
		} else {
			singedIn = false;
		}
	});

	user.subscribe((value) => {
		if (value) {
			singedIn = true;
		} else {
			singedIn = false;
		}
	});
</script>

{#if singedIn}
	<div class="flex">
		<Sidebar />
		<MainView />
	</div>
{:else}
	<Login />
{/if}

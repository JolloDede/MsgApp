<script lang="ts">
	import MainView from '$lib/MainView.svelte';
	import Sidebar from '../lib/Sidebar.svelte';
	import { user } from '../stores';
	import Login from '$lib/Login.svelte';

	let userObj: User;
	user.subscribe((value) => {
		if (value) userObj = value;
	});
</script>

{#if userObj == null}
	<Login />
{:else}
	<div class="flex">
		<Sidebar />
		<MainView />
	</div>
{/if}

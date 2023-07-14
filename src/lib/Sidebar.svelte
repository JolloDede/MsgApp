<script lang="ts">
	import { onMount } from 'svelte';
	import AddContactForm from './AddContactForm.svelte';
	import Button from './Button.svelte';
	import axios from 'axios';

	let contacts: Contact[] = [];

	let addContactViewVisible = false;
	function AddContacBtnClick() {
		addContactViewVisible = true;
	}

	function formatContactString(to: string[]): string {
		let result = '';
		for (let i = 0; i < to.length; i++) {
			if (result == '') {
				result = to[i];
			} else {
				result = result + ', ' + to[i];
			}
		}
		return result;
	}

	onMount(() => {
		axios.get('http://localhost:8080/contacts').then((response) => {
			contacts = response.data;
			console.log(response);
		});
	});
</script>

<div class="flex flex-col w-1/4 h-screen">
	<div class="h-14 border-b border-r border-primary-color-300 bg-primary-color-400">
		<h1 class="text-4xl text-center font-bold text-primary-color-900">Contact List</h1>
	</div>
	<div class="flex flex-col h-full bg-gradient-to-b from-primary-color-400 to-primary-color-100">
		{#each contacts as contact}
			<div class="p-2">
				<p class="pl-2">
					{formatContactString(contact.to)}
				</p>
			</div>
		{/each}
	</div>
	<div class="flex items-center h-16 bg-gradient-to-b from-primary-color-100 to-primary-color-50">
		<Button CssClasses="primary" on:click={AddContacBtnClick}>Add Contact</Button>
	</div>
</div>

{#if addContactViewVisible}
	<AddContactForm bind:addContactViewVisible />
{/if}

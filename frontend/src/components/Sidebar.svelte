<script lang="ts">
	import { onMount } from 'svelte';
	import AddContactForm from './AddContactForm.svelte';
	import Button from './Button.svelte';
	import { activeContact, user } from '../stores';
	import { formatContactString } from '../helper/ContactFormat';
	import { axiosInstance } from '../helper/Axios';

	let activeUser: User;
	user.subscribe((value) => {
		activeUser = value;
	})

	let contacts: Contact[] = [];

	let addContactViewVisible = false;

	function AddContacBtnClick() {
		addContactViewVisible = true;
	}
	
	function handleContactClick(contact: Contact) {
		activeContact.set(contact);
	}

	onMount(() => {
		axiosInstance.get('/contacts/'+activeUser.id).then((response) => {
			contacts = response.data;
            
			if (contacts.length >= 1) {
				activeContact.update((aContact) => {
					if (!aContact) {
						return contacts[0];
					}else {
                        return aContact;
                    }
				});
			}
		});
	});
</script>

<div class="flex flex-col w-1/4 h-screen">
	<div class="h-14 border-b border-r border-primary-color-300 bg-primary-color-400">
		<h1 class="text-4xl text-center font-bold text-primary-color-900">{activeUser.username}</h1>
	</div>
	<div class="flex flex-col h-full bg-gradient-to-b from-primary-color-400 to-primary-color-100">
		<h1 class="text-4xl text-center font-bold text-primary-color-900">Contact List</h1>
		{#each contacts as contact}
			<button class="p-2 cursor-pointer" on:click={() => handleContactClick(contact)}>
				<p class="pl-2">
					{formatContactString(contact.to)}
				</p>
			</button>
		{/each}
	</div>
	<div class="flex items-center h-16 bg-gradient-to-b from-primary-color-100 to-primary-color-50">
		<Button CssClasses="primary" on:click={AddContacBtnClick}>Add Contact</Button>
	</div>
</div>

{#if addContactViewVisible}
	<AddContactForm bind:addContactViewVisible />
{/if}

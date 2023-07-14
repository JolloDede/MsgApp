<script lang="ts">
	import { formatContactString } from '../helper/ContactFormat';
	import { activeContact } from '../stores';

	let activContact: Contact | null;

	activeContact.subscribe((value) => {
		activContact = value;
	});
</script>

<div class="flex flex-col w-full h-screen">
	<div class="flex flex-row h-14 border bg-primary-color-400">
		{#if activContact}
			<h2 class="m-auto ml-2 font-bold">{formatContactString(activContact.to)}</h2>
		{/if}
	</div>
	<div
		class="flex h-full border border-primary-color-300 bg-gradient-to-b from-primary-color-400 to-primary-color-100"
	>
		Messages
	</div>
	<div class="flex h-16 bg-gradient-to-b from-primary-color-100 to-primary-color-50">
		<div class="w-full">
			<input type="text" class="rounded-lg" />
		</div>
		<div class="w-20 h-full">File input</div>
	</div>
</div>

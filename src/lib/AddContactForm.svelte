<script lang="ts">
    export let addContactViewVisible: boolean;
	import Button from './Button.svelte';

	let contactName = '';

	function handleSubmit() {
		
        addContactViewVisible = false;
	}

    function handleCancleClick() {
        console.log("hallo")
        addContactViewVisible = false;
    }
</script>

<div class="fixed w-full h-full top-0 left-0 bg-green-600">
	<div
		class="fixed m-auto p-10 left-1/2 top-1/2 border rounded-lg bg-white -translate-x-1/2 -translate-y-1/2"
	>
		<form on:submit|preventDefault={handleSubmit} class="flex flex-col">
			<label for="">Name:</label>
			<br />
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				type="text"
				bind:value={contactName}
				class="my-2 p-2 border rounded-lg border-primary-color-200 focus:border-primary-color-600 outline-none autof"
			/>
			<div>
				<Button CssClasses="primary">Save</Button>
				<Button CssClasses="secondary" on:click={handleCancleClick}>Cancle</Button>
			</div>
		</form>
	</div>
</div>

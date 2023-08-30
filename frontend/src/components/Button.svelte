<script lang="ts">
	export let CssClasses: string;
</script>

<!-- <button class="primary">Add Contact</button> -->

{#if (CssClasses == "primary")}
	<button on:click class={CssClasses} type="submit">
		<slot />
	</button>
{:else}
	<button on:click class={CssClasses} type="button">
		<slot />
	</button>
{/if}

<style lang="postcss">
	button {
		@apply mx-auto py-2 px-4 rounded-lg;
	}
	.primary {
		@apply text-primary-color-50 bg-primary-color-500 hover:bg-primary-color-600;
	}
	.secondary {
		@apply border-primary-color-700 text-primary-color-700 bg-white hover:bg-primary-color-50;
	}
</style>

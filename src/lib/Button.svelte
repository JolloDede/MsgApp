<script lang="ts">
    export let CssClasses: string;
</script>

<!-- <button class="primary">Add Contact</button> -->

<button on:click class={CssClasses}>
	<slot />
</button>

<style lang="postcss">
	.primary {
		@apply mx-auto py-2 px-4 rounded-lg font-bold text-primary-color-50 bg-primary-color-500 hover:bg-primary-color-600;
	}
</style>

<script>
	import Button from "./Button.svelte";

</script>

<div class="flex flex-col w-1/4 h-screen">
    <div class="h-14 border-b border-r border-primary-color-300 bg-primary-color-400">
        <h1 class="text-4xl text-center font-bold text-primary-color-900">Contact List</h1>
    </div>
    <div class="h-full bg-gradient-to-b from-primary-color-400 to-primary-color-100"></div>
    <div class="flex items-center h-16 bg-gradient-to-b from-primary-color-100 to-primary-color-50">
        <Button CssClasses="primary">Add Contact</Button>
    </div>
</div>
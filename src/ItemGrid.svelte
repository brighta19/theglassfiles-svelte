<script>
	import ItemThumbnail from "./ItemThumbnail.svelte";
	import ItemThumbnailPlaceholder from "./ItemPlaceholder.svelte";

    export let items;
    export let columns = 4;

    const NUMBER_OF_PLACEHOLDER_ITEMS = 8;

    let templateColumns = " auto".repeat(columns);
</script>

<div class="items" style="--template-columns: {templateColumns}">
    {#if items.length === 0}
        {#each (new Array(NUMBER_OF_PLACEHOLDER_ITEMS)) as _i}
            <ItemThumbnailPlaceholder />
        {/each}
    {:else}
        {#each items as item, index}
            <ItemThumbnail {item} {index} on:itemclick />
        {/each}
    {/if}
</div>

<style>
	.items {
		display: grid;
		gap: 30px;
		grid-template-columns: var(--template-columns);
        justify-content: center;
        margin-bottom: 80px;
    }
</style>

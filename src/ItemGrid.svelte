<script>
	import ItemThumbnail from "./ItemThumbnail.svelte";
	import ItemThumbnailPlaceholder from "./ItemPlaceholder.svelte";

    export let items;
    const NUMBER_OF_PLACEHOLDER_ITEMS = 8;
</script>

<div class="items">
    {#if items.length === 0}
        {#each (new Array(NUMBER_OF_PLACEHOLDER_ITEMS)) as _i}
            <ItemThumbnailPlaceholder />
        {/each}
    {:else}
        {#each items as item, index}
            <ItemThumbnail {item} {index} />
        {/each}
    {/if}
</div>

<style>
	.items {
		display: grid;
		gap: 30px;
		grid-template-columns: auto auto auto auto;
        justify-content: center;
        margin-bottom: 80px;
    }
</style>

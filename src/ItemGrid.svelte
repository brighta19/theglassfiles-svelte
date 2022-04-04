<script>
	import Item from "./Item.svelte";
	import ItemPlaceholder from "./ItemPlaceholder.svelte";

    export let items;
    const NUMBER_OF_PLACEHOLDER_ITEMS = 8;
</script>

<div class="items">
    {#if items.length === 0}
        {#each (new Array(NUMBER_OF_PLACEHOLDER_ITEMS)) as _i}
            <ItemPlaceholder />
        {/each}
    {:else}
        {#each items as item, index}
            <Item {item} {index} />
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

<script>
	import Item from "./Item.svelte";
	import ItemPlaceholder from "./ItemPlaceholder.svelte";

    export let items;
</script>

<div class="items">
    {#if items.length === 0}
        {#each (new Array(8)) as _i}
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

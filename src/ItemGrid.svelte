<script>
	import ItemThumbnail from "./ItemThumbnail.svelte";
	import ItemThumbnailPlaceholder from "./ItemPlaceholder.svelte";

    export let items = [];
    export let columns = 4;
    export let placeholders = 12;
    export let gap = "30px";
    export let showDescription = false;
    export let showTags = false;

    let templateColumns = " auto".repeat(columns);
</script>

<div class="items" style="--template-columns: {templateColumns}; --gap: {gap}">
    {#if items.length === 0}
        {#each (new Array(Number(placeholders))) as _i}
            <ItemThumbnailPlaceholder />
        {/each}
    {:else}
        {#each items as item, index}
            <ItemThumbnail {item} {index} {showDescription} {showTags} on:itemclick />
        {/each}
    {/if}
</div>

<style>
	.items {
		display: grid;
		gap: var(--gap);
		grid-template-columns: var(--template-columns);
        justify-content: center;
    }
</style>

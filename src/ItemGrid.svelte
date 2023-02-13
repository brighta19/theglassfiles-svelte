<script>
	import ItemThumbnail from "./ItemThumbnail.svelte";
	import ItemThumbnailPlaceholder from "./ItemPlaceholder.svelte";

    export let items = [];
    export let columns = 4;
    export let placeholders = 12;
    export let gap = "30px";
    export let showDescription = false;
    export let showTags = false;
    export let focusFirstItem = false;

    let templateColumns = " auto".repeat(columns);

    function isBlue(index) {
        if (columns % 2 === 0)
            return (index + Math.floor(index / columns)) % 2 === 1;
        return index % 2 === 1;
    }
</script>

<div class="items" style="--template-columns: {templateColumns}; --gap: {gap}">
    {#if items.length === 0}
        <!-- Display skeleton screen -->
        {#each (new Array(Number(placeholders))) as _}
            <ItemThumbnailPlaceholder />
        {/each}
    {:else}
        {#each items as item, index}
            <ItemThumbnail {item} {showDescription} {showTags} focus={focusFirstItem && index === 0} blue={isBlue(index)} on:itemselect />
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

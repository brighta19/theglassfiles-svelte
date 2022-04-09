<script>
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    const VIEW_EVENT = "viewchange";

    function onClick(type) {
        return () => {
            dispatch(VIEW_EVENT, type);
        };
    }
</script>

<div class="navbar">
    <button on:click={onClick("descriptions")}>View <span class="red">Descriptions</span></button>
    <button on:click={onClick("artwork")}>View <span class="red">Artwork</span></button>
    <button on:click={onClick("tags")}>View <span class="red">Tags</span></button>
    <button disabled>Shuffle <span class="red">Items</span></button>
</div>

<style>
    .navbar {
        padding: 20px 0;
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: space-between;
        column-gap: 10px;
        margin-bottom: 30px;
    }
</style>

<script>
    import { createEventDispatcher } from "svelte";

    const VIEW_EVENT = "viewchange";
    const View = {
        ARTWORKS: "artwork",
        DESCRIPTIONS: "descriptions",
        TAGS: "tags"
    };

    let activeView = View.ARTWORKS;

    const dispatch = createEventDispatcher();

    function onClick(view) {
        return () => {
            activeView = view;
            dispatch(VIEW_EVENT, view);
        };
    }
</script>

<div class="navbar">
    <button on:click={onClick(View.DESCRIPTIONS)} class:active={activeView === View.DESCRIPTIONS}>
        View <span class="red">Descriptions</span>
    </button>
    <button on:click={onClick(View.ARTWORKS)} class:active={activeView === View.ARTWORKS}>
        View <span class="red">Artwork</span>
    </button>
    <button on:click={onClick(View.TAGS)} class:active={activeView === View.TAGS}>
        View <span class="red">Tags</span>
    </button>
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

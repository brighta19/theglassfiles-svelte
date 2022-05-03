<script>
    import { getPathFromItem, getGeneralMediaType } from "./ItemThumbnail.svelte";

    export let item;
    export let width;
    export let height;
    export let includeLink = false;

    let {
        media_src,
        youtube_video_id
    } = item;

    let generalMediaType = getGeneralMediaType(item);
    let alt = "Item preview";
    let loadError = false;
</script>

<div class="preview-container" style="--width: {width}px; --height: {height}px">
    {#if loadError}
        <div class="placeholder-image"></div>
    {:else}
        {#if generalMediaType === "image"}
            {#if includeLink}
                <a href={getPathFromItem(item)}>
                    <img src={media_src} {alt} on:error={() => loadError = true} />
                </a>
            {:else}
                <img src={media_src} {alt} on:error={() => loadError = true} />
            {/if}
        {:else if generalMediaType === "video"}
            <lite-youtube videoid={youtube_video_id}></lite-youtube>
        {/if}
    {/if}
</div>

<style>
    .placeholder-image {
        background: #ffffff url("/logo_the-glass-files.jpg") no-repeat center;
    }
    .placeholder-image, img, lite-youtube {
        width: var(--width);
        height: var(--height);
    }
    a {
        display: inline-block;
    }
    img {
        background-color: #222222;
    }
</style>

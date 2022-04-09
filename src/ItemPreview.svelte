<script>
    export let item;
    export let width;
    export let height;
    export let includeLink = false;

    let imageMediaTypes = ["artwork", "photograph", "biography"];
    let videoMediaTypes = ["video"];

    let {
        id,
        media_type,
        media_src,
        youtube_video_id
    } = item;

    let isImage = imageMediaTypes.find(m => m === media_type);
    let isVideo = videoMediaTypes.find(m => m === media_type);
    let link = `https://www.theglassfiles.com/browse/images/${id}/show`;
    let alt = "Item preview";
    let loadError = false;
</script>

<div class="preview-container" style="--width: {width}px; --height: {height}px">
    {#if loadError}
        <div class="placeholder-image"></div>
    {:else}
        {#if isImage}
            {#if includeLink}
                <a href={link}>
                    <img src={media_src} {alt} on:error={() => loadError = true} />
                </a>
            {:else}
                <img src={media_src} {alt} on:error={() => loadError = true} />
            {/if}
        {:else if isVideo}
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
</style>

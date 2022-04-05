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
    } = item;

    let isImage = imageMediaTypes.find(m => m === media_type);
    let isVideo = videoMediaTypes.find(m => m === media_type);
    let link = `https://www.theglassfiles.com/browse/images/${id}/show`;
    let loadError = false;
</script>

{#if loadError}
    <div class="placeholder-image" style="--width: {width}px; --height: {height}px"></div>
{:else}
    {#if isImage}
        <a href={includeLink ? link : null}>
            <img src={media_src} alt="Item preview" {width} {height} on:error={() => loadError = true} />
        </a>
    {:else if isVideo}
        <iframe src={media_src} title="ytframe" frameborder="0" {width} {height}></iframe>
    {/if}
{/if}

<style>
    img {
        display: block;
    }
    .placeholder-image {
        width: var(--width);
        height: var(--height);
        background: #ffffff url("/logo_the-glass-files.jpg") no-repeat center;
    }
</style>

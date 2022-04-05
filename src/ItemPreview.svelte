<script>
    export let item;
    export let width;
    export let height;

    let imageMediaTypes = ["artwork", "photograph", "biography"];
    let videoMediaTypes = ["video"];

    let {
        media_type,
        media_src,
    } = item;

    let isImage = imageMediaTypes.find(m => m === media_type);
    let isVideo = videoMediaTypes.find(m => m === media_type);
    let loadError = false;
</script>

{#if loadError}
    <div class="placeholder-image" style={`width: ${width}px; height: ${height}px`}></div>
{:else}
    {#if isImage}
        <img src={media_src} alt="Item preview" {width} {height} on:error={() => loadError = true} />
    {:else if isVideo}
        <iframe src={media_src} frameborder='0'  {width} {height}></iframe>
    {/if}
{/if}

<style>
    img {
        display: block;
    }
    .placeholder-image {
        background: #ffffff url("/logo_the-glass-files.jpg") no-repeat center;
    }
</style>

<script>
    export let item;
    export let width;
    export let height;

    let imageMediaTypes = ["artwork"];

    let {
        media_type,
        img_src,
    } = item;

    let isImage = imageMediaTypes.find(m => m === media_type);
</script>

{#if isImage}
    <img src={img_src} alt="Item preview" {width} {height} />
{/if}

<script>
    export let type;
    export let src;
    export let width;
    export let height;
</script>

{#if type == "image"}
    <img {src} alt="Item preview" {width} {height} />
{/if}

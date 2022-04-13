<script>
    let show = false;

    function onScroll() {
        show = window.scrollY > window.innerHeight / 5;
    }
</script>

<svelte:window on:scroll={onScroll} />
{#if show}
    <button on:click={() => window.scrollTo(0, 0)}>To Top</button>
{/if}

<style>
    button {
        position: fixed;
        bottom: 20px;
        right: 40px;
        padding: 5px;
        background-color: #0f004e;
        border: 1px solid #ffffff;
        font-size: 1.2rem;
        color: white;
    }

    @keyframes fade-in {
        from { opacity: 0 }
        to { opacity: 1 }
    }

    @media screen and (prefers-reduced-motion: no-preference) {
        button { animation: 300ms fade-in }
    }
</style>

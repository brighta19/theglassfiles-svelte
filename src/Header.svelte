<script>
    export let active;
</script>

<header>
    <img src="logo_the-glass-files.jpg" width="190" height="140" alt="The Glass Files logo">
    <div>
        <nav class="block-1 red-bg">
            <a href="/" class:active={active == "stories"}>Stories</a>
            <a href="/" class:active={active == "intent"}>Intent</a>
            <a href="/" class:active={active == "news"}>News</a>
            <a href="/" class:active={active == "join"}>Join</a>
        </nav>
        <div class="block-2">
            <p class="phrase blue italic">We all make History<sup>&reg;</sup></p>
            <a class="blue-bg" href="/">Enter</a>
        </div>
    </div>

</header>

<style>
    header {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        margin-bottom: 45px;
    }
    a {
        display: inline-block;
        padding: 10px 40px;
        color: #ffffff;
        font-size: 2.25rem;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    a.active {
        font-style: italic;
        font-weight: bold;
    }
    .block-1 {
        padding: 0 10px;
    }
    .block-2 {
        margin-top: 10px;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        align-items: end;
    }
    .block-2 a {
        padding-left: 40px;
        padding-right: 40px;
    }
    .phrase {
        margin: 0;
        font-size: 2rem;
        letter-spacing: 1.5px;
    }
    .phrase sup {
        font-size: 1rem;
    }
</style>

<script>
    export let active;
</script>

<header>
    <a href="/"><img src="/logo_the-glass-files.jpg" width="190" height="140" alt="The Glass Files logo"></a>
    <nav class="links">
        <div class="block-1 red-bg">
            <p><a href="https://www.theglassfiles.com/stories" class:active={active == "stories"}>Stories</a></p>
            <p><a href="https://www.theglassfiles.com/intent" class:active={active == "intent"}>Intent</a></p>
            <p><a href="https://blog.theglassfiles.com/" rel="noopener noreferrer">News</a></p>
            <p><a href="https://www.theglassfiles.com/users/sign_up" class:active={active == "join"}>Join</a></p>
        </div>
        <div class="block-2">
            <p><a href="https://www.theglassfiles.com/users/sign_in" class="blue-bg" class:active={active == "enter"}>Enter</a></p>
            <p class="phrase blue italic">We all make History<sup>&reg;</sup></p>
        </div>
    </nav>

</header>

<style>
    header {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        margin-bottom: 45px;
    }
    p {
        display: inline;
    }
    .links a {
        display: inline-block;
        padding: 10px 40px;
        color: #ffffff;
        font-size: 2.25rem;
        text-decoration: none;
    }
    .links a:hover {
        text-decoration: underline;
    }
    .links a.active {
        font-style: italic;
        font-weight: bold;
    }
    .block-1 {
        padding: 0 10px;
    }
    .block-2 {
        margin-top: 10px;
        display: flex;
        flex-direction: row-reverse;
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

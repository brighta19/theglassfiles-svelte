<script>
    import ItemPreview from "./ItemPreview.svelte";

    export let item;

    let {
        id,
        media_type,
        subject,
        title,
        summary,
        description,
        location,
        date,
        author,
        source,
        tags,
        img_src,
        user
    } = item;

    let showDetails = false;

    const Links = {
        SIGN_UP: "https://www.theglassfiles.com/users/sign_up",
        SIGN_IN: "https://www.theglassfiles.com/users/sign_in",
        ITEM: `https://www.theglassfiles.com/browse/images/${id}/show`,
    };

    function urlFromTag(tag) {
        return `https://www.theglassfiles.com/browse/tags?q=${tag}`;
    }
</script>

<div class="container">
    <div class="preview">
        <a href={Links.ITEM}>
            <ItemPreview {item} width="720" height="480" />
        </a>
        <div class="summary">
            <p>{summary}</p>
            <button on:click={() => showDetails = !showDetails}>
                {showDetails ? "Hide" : "Show"}
                <span class="red">Details</span>
            </button>
        </div>
        {#if showDetails}
            <div class="details">
                <p><span class="lower italic red">Media:</span> {media_type}</p>
                <p><span class="lower italic red">Subject:</span> {subject}</p>
                <p><span class="lower italic red">Title:</span> {title}</p>

                <p>
                    <span class="lower italic red">Full description or story:</span>
                    <br>
                    {#each description.split('\n') as txt, i}
                        {#if i !== 0} <br><br> {/if}
                        {txt}
                    {/each}
                </p>

                <p><span class="lower italic red">Location:</span> {location}</p>
                <p><span class="lower italic red">Date:</span> {date}</p>
                <p><span class="lower italic red">Author:</span> {author}</p>
                <p><span class="lower italic red">Source or Provenance:</span> {source}</p>

                <p>
                    <span class="lower italic red">Tags:</span>
                    {#each tags as tag, i}
                        {#if i !== 0} &nbsp;- {/if}
                        <a href={urlFromTag(tag)}>{tag}</a>
                    {/each}
                </p>

                <p class="share">
                    This item is shared by
                    <span class="blue">{user.first_name} {user.middle_name}</span>
                    <span class="red">{user.last_name}</span>
                    with the
                    <span class="red">Community</span>
                    and the
                    <span class="red">World</span>.
                </p>

                <hr>

                <p class="login-status italic blue center">
                    To contribute your own story to History,
                    <a href={Links.SIGN_UP} class="bold red">Join</a>
                    or
                    <a href={Links.SIGN_IN} class="bold red">Enter</a>.
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000000;
        background-color: #00000088;
        overflow-y: scroll;
    }
    .preview {
	    width: 720px;
        margin: 30px auto;
        padding: 25px 0;
        background: #ffffff;
        box-shadow: 0 5px 15px #00000088;
    }
    .summary {
        display: flex;
        padding: 25px;
        margin-top: 20px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #860038;
        border-bottom: 1px solid #860038;
        font-size: 1.15rem;
    }
    .details {
        padding: 25px;
        border-bottom: 1px solid #860038;
    }
    .details p {
        margin-bottom: 20px;
        font-size: 1.15rem;
        line-height: 1.4;
    }
    .details .share {
        margin-top: 40px;
        color: #009345;
        font-size: 1rem;
    }
    hr {
        margin: 20px auto;
        width: 30%;
        border: 0;
        border-top: 1px solid #860038;
    }
    .details .login-status {
        margin: 0;
    }
    .details .login-status a {
        text-decoration: none;
    }
    .details .login-status a:hover {
	    color: #0f004e;
        text-decoration: underline;
    }
    .lower {
        text-transform: lowercase;
    }
    .center {
        text-align: center;
    }
    .red {
        color: #860038;
    }
    .blue {
	    color: #0f004e;
    }
    .italic {
        font-style: italic;
    }
    .bold {
        font-weight: bold;
    }
</style>

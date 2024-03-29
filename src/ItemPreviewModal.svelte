<script>
    import { getBrowseUrlFromTag } from "./helpers.js";
    import { createEventDispatcher, onMount } from "svelte";
    import ItemPreview from "./ItemPreview.svelte";
    import ItemGrid from "./ItemGrid.svelte";

    export let item;
    export let otherItems;
    export let showDetails = false;

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
        user
    } = item;

    const DETAILS_VISIBILITY_EVENT = "detailsvisibilitychange";
    const Links = {
        SIGN_UP: "https://www.theglassfiles.com/users/sign_up",
        SIGN_IN: "https://www.theglassfiles.com/users/sign_in",
        // ITEM: `https://www.theglassfiles.com/browse/images/${id}/show`,
    };

    const dispatch = createEventDispatcher();

    let detailsButton;

    onMount(() => detailsButton.focus());

    function onDetailsButtonClick() {
        showDetails = !showDetails;
        dispatch(DETAILS_VISIBILITY_EVENT, showDetails);
    }
</script>

<div class="preview">
    <ItemPreview {item} width="720" height="480" includeLink />
    <div class="summary">
        <p>{summary}</p>
        <button on:click={onDetailsButtonClick} bind:this={detailsButton}>
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
                {#each description.split('\n') as line, i}
                    {#if i !== 0} <br /> {/if}
                    {line}
                {/each}
            </p>

            <p><span class="lower italic red">Location:</span> {location}</p>
            <p><span class="lower italic red">Date:</span> {date}</p>
            <p><span class="lower italic red">Author:</span> {author}</p>
            <p><span class="lower italic red">Source or Provenance:</span> {source}</p>

            <p>
                <span class="lower italic red">Tags:</span>
                {#each tags as tag, i}
                    {#if i !== 0} &nbsp;- {/if} <!-- Yes, i needed &nbsp; -->
                    <a href={getBrowseUrlFromTag(tag)}>{tag}</a>
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

            <hr />

            <p class="login-status italic blue center">
                To contribute your own story to History,
                <a href={Links.SIGN_UP} class="bold red">Join</a>
                or
                <a href={Links.SIGN_IN} class="bold red">Enter</a>.
            </p>
        </div>
    {/if}
    <div class="more">
        <ItemGrid items={otherItems} columns="3" placeholders="6" gap="20px" on:itemselect />
    </div>
</div>

<style>
    .preview {
	    width: 720px;
        margin: 30px auto;
        padding-top: 25px;
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
    .more {
        padding: 24px;
    }

    @keyframes fade-in {
        from {
            opacity: 0.3;
            transform: scale(1.05);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @media screen and (prefers-reduced-motion: no-preference) {
        .preview { animation: 300ms fade-in }
    }
</style>

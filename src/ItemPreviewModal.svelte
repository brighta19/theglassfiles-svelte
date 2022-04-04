<script>
    import ItemPreview from "./ItemPreview.svelte";

    let short_description = "Awareness of Cancer";
    let type = "image";
    let src = "https://s3.amazonaws.com/media-theglassfiles-com/media/images/000/008/858/show/artwork_20220401-225608?1648911385";
    let href = "https://www.theglassfiles.com/browse/images/8858/show";
</script>

<div class="container">
    <div class="preview">
        <a {href}>
            <ItemPreview {type} {src} width="720" height="480" />
        </a>
        <div class="summary">
            <p>{short_description}</p>
            <button>Show <span class="red">Details</span></button>
        </div>
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
    }
    .preview {
	    width: 720px;
        margin: 30px auto 0;
        padding-top: 30px;
        background: #ffffff;
    }
    .summary {
        display: flex;
        padding: 20px;
        margin-top: 20px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #860038;
        border-bottom: 1px solid #860038;
        font-size: 1.15rem;
    }
    button {
        margin: 0;
        padding: 0;
        color: #0f004e;
        background-color: transparent;
        border: none;
        border-radius: 0;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1.5rem;
    }
    button:hover:not([disabled]) {
        text-decoration: underline;
        cursor: pointer;
    }
    button .red {
		color: #860038;
    }
    button:disabled, button:disabled .red {
        color: #666666;
    }
</style>

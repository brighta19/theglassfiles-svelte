<div class="navbar">
    <button>View <span class="red">Descriptions</span></button>
    <button>View <span class="red">Artwork</span></button>
    <button>View <span class="red">Tags</span></button>
    <button disabled>Shuffle <span class="red">Items</span></button>
</div>

<style>
    .navbar {
        padding: 20px 0;
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: space-between;
        column-gap: 10px;
        margin-bottom: 30px;
    }
    button {
        margin: 0;
        padding: 0;
        /* padding: 10px 20px; */
        color: #0f004e;
        background-color: transparent;
        border: none;
        border-radius: 0;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 24px;
    }
    button:hover:not([disabled]) {
        text-decoration: underline;
        /* background-color: #eeeeee; */
        /* background-color: #00000011; */
        cursor: pointer;
    }
    button .red {
		color: #860038;
    }
    button:disabled, button:disabled .red {
        color: #666666;
    }
</style>

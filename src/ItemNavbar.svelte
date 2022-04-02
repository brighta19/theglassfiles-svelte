<div class="navbar">
    <p>View <span class="red">Thumbnails</span></p>
    <p>View <span class="red">Descriptions</span></p>
    <p>View <span class="red">Tags</span></p>
    <p>Shuffle <span class="red">Items</span></p>
</div>

<style>
    .navbar {
        padding: 20px 10px;
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: center;
        column-gap: 10px;
        text-transform: uppercase;
        color: #0f004e;
        font-size: 24px;
        font-family: Adobe Garamond Pro, Times, serif;
    }
    .navbar p {
        padding: 10px 20px;
        background-color: transparent;
        text-decoration: none;
        margin: 0;
    }
    .navbar p:hover {
        text-decoration: underline;
        background-color: #eeeeee;
        background-color: #00000011;
        cursor: pointer;
    }
    .navbar .red {
		color: #860038;
    }
</style>
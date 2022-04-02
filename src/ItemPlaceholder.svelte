<div class="item"></div>

<style>
	.item {
		--color-red: #860038;
		--color-blue: #0f004e;
		--color-reda: #860038cc;
		--color-bluea: #0f004ecc;
		--transition-speed: 100ms;

		position: relative;
		border: 2px solid #bbbbbb;
		background-color: #eeeeee;
		width: 210px;
		height: 210px;
		transform: scale(1);
    		transition: transform var(--transition-speed);
        animation: 2s placeholder-bg alternate infinite linear;
	}
	.item:hover {
		transform: scale(1.1);
	}
    @keyframes placeholder-bg {
        from { background-color: #cccccc }
        to { background-color: #eeeeee }
    }
</style>

<div class="item"></div>

<style>
	.item {
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

<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

	export let item;
	export let index;

    const ITEM_CLICK_EVENT = "itemclick";

	let blue = (index + Math.floor(index / 4)) % 2 === 1;
	let red = (index + Math.floor(index / 4)) % 2 === 0;
	let {media_type, summary, location, date, thumbnail_src} = item;
</script>

<div class="item" class:red class:blue on:click={() => dispatch(ITEM_CLICK_EVENT, item)}>
	<img class="thumbnail" src={thumbnail_src} width="210" height="210" alt="Item thumbnail" />
	<div class="info">
		<p>{media_type}</p>
		<p>{summary}</p>
		<p>{location}</p>
		<p>{date}</p>
	</div>
</div>

<style>
	.item {
		--color-red: #860038;
		--color-blue: #0f004e;
		--color-reda: #860038cc;
		--color-bluea: #0f004ecc;
		--transition-speed: 100ms;

		position: relative;
		border: 2px solid;
		width: 210px;
		height: 210px;
		transform: scale(1);
		transition: transform var(--transition-speed);
		cursor: pointer;
	}
	.item.red {
		border-color: var(--color-red);
	}
	.item.blue {
		border-color: var(--color-blue);
	}
	.thumbnail {
		position: absolute;
		top: 0;
		left: 0;
	}
	.info {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		width: inherit;
		height: inherit;
		padding: 10px;
		color: #ffffff;
		font-size: 13px;
		letter-spacing: 2px;
		line-height: 1.4;
		transition: opacity var(--transition-speed);
	}
	.red .info {
		background-color: var(--color-red);
		background-color: var(--color-reda);
	}
	.blue .info {
		background-color: var(--color-blue);
		background-color: var(--color-bluea);
	}
	.info p {
		margin: 0 0 15px 0;
	}
	.item:hover {
		transform: scale(1.1);
	}
	.item:hover .info {
		opacity: 1;
	}
</style>

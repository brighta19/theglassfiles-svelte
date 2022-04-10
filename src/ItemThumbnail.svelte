<script context="module">
	let focusLastSelectedItem = () => {};
	export { focusLastSelectedItem };
</script>

<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

	export let item;
	export let index;
	export let showDescription = false;
	export let showTags = false;

    const ITEM_CLICK_EVENT = "itemclick";

	let {
		media_type,
		summary,
		location,
		date,
		thumbnail_src,
		tags
	} = item;

	let itemElement;
	let blue = (index + Math.floor(index / 4)) % 2 === 1;
	let red = (index + Math.floor(index / 4)) % 2 === 0;

    function urlFromTag(tag) {
        return `https://www.theglassfiles.com/browse/tags?q=${tag}`;
    }

    function onKeyDown(event) {
        if (event.code === "Enter") {
			event.preventDefault();
			dispatchEvent();
		}
    }

	function dispatchEvent() {
		focusLastSelectedItem = () => itemElement.focus();
		dispatch(ITEM_CLICK_EVENT, item);
	}
</script>

<div class="item focusable" tabindex="0" class:red class:blue on:click={dispatchEvent} on:keydown={onKeyDown} bind:this={itemElement}>
	<img class="thumbnail" src={thumbnail_src} width="210" height="210" alt="Item thumbnail" />
	<div class="tags" class:show={showTags}>
		<p>{summary}</p>
		<p>
			{#each tags as tag, i}
				{#if i !== 0} &nbsp;| {/if} <!-- Yes, i needed &nbsp; -->
				<a href={urlFromTag(tag)} on:click|stopPropagation tabindex={showTags ? "0" : "-1"}>{tag}</a>
			{/each}
		</p>
	</div>
	<div class="info" class:show={showDescription}>
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
	.info, .tags {
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
	.red .info, .red .tags {
		background-color: var(--color-red);
		background-color: var(--color-reda);
	}
	.blue .info, .blue .tags {
		background-color: var(--color-blue);
		background-color: var(--color-bluea);
	}
	p {
		margin-bottom: 15px;
	}
	a {
		color: #ffffff;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	.item:hover {
		transform: scale(1.1);
	}
	.item:hover .tags:not(.show) ~ .info.show, .info, .tags {
		opacity: 0;
	}
	.item:hover .tags:not(.show) ~ .info, .info.show, .tags.show {
		opacity: 1;
	}
	.item:hover .tags.show ~ .info {
		display: none;
	}
</style>

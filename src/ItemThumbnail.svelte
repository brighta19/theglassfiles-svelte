<script>
	import { getPathFromItem } from "./helpers.js"
    import { createEventDispatcher, onMount } from "svelte";

	export let item;
	export let showDescription = false;
	export let showTags = false;
	export let focus = false;
	export let blue = false;

	let {
		media_type,
		summary,
		location,
		date,
		thumbnail_src,
		tags
	} = item;

	const dispatch = createEventDispatcher();

	let element;

	onMount(() => focus && element.focus());

    function urlFromTag(tag) {
        return `https://www.theglassfiles.com/browse/tags?q=${tag}`;
    }

	function onClick(event) {
		if (!event.shiftKey && !event.ctrlKey)
			onItemSelect(event);
	}

    function onKeyDown(event) {
        if (event.code === "Enter" && (!event.shiftKey && !event.ctrlKey))
			onItemSelect(event);
    }

	function onItemSelect(event) {
		event.preventDefault();
		dispatch("itemselect", { item, itemElement: element });
	}
</script>

<a href={getPathFromItem(item)} class="item" class:blue on:click={onClick} on:keydown={onKeyDown} bind:this={element}>
	<img class="thumbnail" src={thumbnail_src} width="210" height="210" alt={summary} />
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
</a>

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
		border-color: var(--color-red);
		overflow: hidden;
	}
	.item.blue {
		border-color: var(--color-blue);
	}
	.thumbnail {
		position: absolute;
		top: 0;
		left: 0;
	}
	.item:hover .thumbnail {
		transform: scale(1.1);
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
	}
	.info, .tags {
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
	.item:hover, .item:focus {
		transform: scale(1.1);
	}
	.item:hover .tags:not(.show) ~ .info.show,
	.item:focus .tags:not(.show) ~ .info.show,
	.info,
	.tags {
		opacity: 0;
	}
	.item:hover .tags:not(.show) ~ .info,
	.item:focus .tags:not(.show) ~ .info,
	.info.show,
	.tags.show {
		opacity: 1;
	}
	.item:hover .tags.show ~ .info {
		display: none;
	}

    @media screen and (prefers-reduced-motion: no-preference) {
        .item { transition: transform var(--transition-speed) }
		.info, .tags { transition: opacity var(--transition-speed) }
    }
</style>

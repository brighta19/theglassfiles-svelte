<script>
	import { onMount } from "svelte";
	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";
	import ItemPreviewModal from "./ItemPreviewModal.svelte";
	import ToTopButton from "./ToTopButton.svelte";
	import LoadMoreButton from "./LoadMoreButton.svelte";
	import { getPathFromItem } from "./ItemThumbnail.svelte";

	const ITEMS_PER_PAGE = 24;

	let selectedItemElement = null;
	let itemGroups = [];
	let items = [];
	let previewedItem = null;
	let showItemPreviewModal = false;
	let showDescription = false;
	let showTags = false;
	let pagesLoaded = 0;
	let pages = 0;

	$: {
		if (showItemPreviewModal) {
			document.body.style.overflowY = "hidden";
		}
		else {
			document.body.style.overflowY = "auto";
			document.body.style.overflowY = "overlay";
		}
	}

	onMount(async () => {
		let data = await (await fetch("/items.json")).json();
		pagesLoaded = data.current_page;
		pages = data.pages;
		items = data.items;
		items = [...items, ...items, ...items, ...items].slice(0, ITEMS_PER_PAGE); // i needed items
		itemGroups = [...itemGroups, items]; // itemGroups.push(items);

		let match = window.location.pathname.match(/^\/(?:images|videos)\/(\d+)/);
		if (match !== null) {
			let id = Number(match[1]);
			let previewedItem = items.find((item) => item.id === id);
			if (previewedItem !== undefined) {
				history.replaceState({ previewedItem }, "", getPathFromItem(previewedItem));
				onStateChange();
			}
		}
	});

	function hideItemPreviewModal() {
		showItemPreviewModal = false;
		if (selectedItemElement !== null)
			selectedItemElement.focus();
	}

	function onStateChange() {
		if (history.state === null) {
			hideItemPreviewModal();
		}
		else if (history.state.previewedItem !== undefined) {
			previewedItem = history.state.previewedItem;
			showItemPreviewModal = true;
		}
	}

	function onItemSelect(event) {
		previewedItem = event.detail.item;
		selectedItemElement = event.detail.itemElement;
		showItemPreviewModal = true;
		history.pushState({ previewedItem }, "", getPathFromItem(previewedItem));
	}

	function onViewChange(event) {
		showDescription = event.detail === "descriptions";
		showTags = event.detail === "tags";
	}

	function onExit() {
		hideItemPreviewModal();
		history.pushState(null, "", "/");
	}

	function onLoadMore() {
		// Makeshift way of creating more pages
		itemGroups = [...itemGroups, items];
		pagesLoaded++;
	}

	function onFirstItem(event) {
		let itemElement = event.detail.element;
		if (pagesLoaded > 1) {
			itemElement.focus();
			window.scrollBy(0, window.innerHeight / 3);
		}
	}
</script>

<svelte:window on:popstate={onStateChange} />
<a class="skipLink" href="#main">Skip to main content</a>
<Header active="stories" />
<main id="main">
	<ItemNavbar on:viewchange={onViewChange} />
	{#each itemGroups as items, i}
		{#if i !== 0}
			<div class="separator">
				<hr />
				<span>{i+1}</span>
				<hr />
			</div>
		{/if}
		<ItemGrid {items} {showDescription} {showTags} placeholders={ITEMS_PER_PAGE} on:itemselect={onItemSelect} on:firstitem={onFirstItem} />
	{/each}
	{#if pagesLoaded < pages}
		<LoadMoreButton on:click={onLoadMore} />
	{/if}
</main>
<Footer />
<ToTopButton />
{#if showItemPreviewModal}
	<ItemPreviewModal item={previewedItem} on:exit={onExit} />
{/if}

<style>
	.separator {
		display: flex;
		justify-content: space-between;
		margin: 50px 0;
	}
	.separator hr {
		width: 45%;
		display: inline-block;
		border: none;
		border-top: 1px solid #888888;
	}
	.skipLink {
		position: fixed;
		top: 10px;
		left: 10px;
		box-shadow: 0 5px 5px #aaaaaa;
		padding: 5px;
		transform: translateY(-200%);
		background-color: #ffffff;
		border: 1px solid #cccccc;
	}
	.skipLink:focus {
		transform: translateY(0%);
	}
</style>

<script>
	import { onMount } from "svelte";
	import { getPathFromItem } from "./helpers.js";
	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";
	import ItemPreviewModal from "./ItemPreviewModal.svelte";
	import ToTopButton from "./ToTopButton.svelte";
	import LoadMoreButton from "./LoadMoreButton.svelte";

	export let siteName;

	const ITEMS_PER_PAGE = 24;
	const TITLE_MAX_LENGTH = 60;

	let selectedItemElement = null;
	let itemGroups = [];
	let items = [];
	let previewedItem = null;
	let showModalContainer = false;
	let showItemPreviewModal = false;
	let showDescription = false;
	let showTags = false;
	let pagesLoaded = 0;
	let pages = 0;
	let title = `Stories | ${siteName}`;

	$: {
		if (showModalContainer) {
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
		items = [...items, ...items, ...items, ...items].slice(0, ITEMS_PER_PAGE); // i needed items :3
		itemGroups = [...itemGroups, items]; // itemGroups.push(items);

		// Match "/images/#" or "/videos/#"
		let match = window.location.pathname.match(/^\/(?:images|videos)\/(\d+)/);
		if (match !== null) {
			let id = Number(match[1]);
			let previewedItem = items.find((item) => item.id === id);
			if (previewedItem !== undefined) {
				title = getItemPreviewTitle(previewedItem);
				history.replaceState({ previewedItem }, "", getPathFromItem(previewedItem));
				onStateChange();
			}
		}
	});

	function hideItemPreviewModal() {
		showModalContainer = false;
		showItemPreviewModal = false;
		if (selectedItemElement !== null)
			selectedItemElement.focus();
	}

	function getSixRandomItems() {
		let list = [...items];
		let randomList = [];
		while (randomList.length < 6 && list.length > 0) {
			let item = list.splice(Math.floor(Math.random() * list.length), 1)[0];
			if (item.id !== previewedItem.id)
				randomList.push(item);
		}
		return randomList;
	}

	function onStateChange() {
		if (history.state === null) {
			hideItemPreviewModal();
		}
		else if (history.state.previewedItem !== undefined) {
			previewedItem = history.state.previewedItem;
			showModalContainer = true;
			showItemPreviewModal = true;
		}
	}

	function onItemSelect(event) {
		previewedItem = event.detail.item;
		selectedItemElement = event.detail.itemElement;
		showModalContainer = true;
		showItemPreviewModal = true;
		title = getItemPreviewTitle(previewedItem);
		history.pushState({ previewedItem }, "", getPathFromItem(previewedItem));
	}

	function onItemSelectFromModal(event) {
		previewedItem = event.detail.item;
		showItemPreviewModal = false;
		setTimeout(() => showItemPreviewModal = true, 100);
		title = getItemPreviewTitle(previewedItem);
		history.pushState({ previewedItem }, "", getPathFromItem(previewedItem));
	}

	function onViewChange(event) {
		showDescription = event.detail === "descriptions";
		showTags = event.detail === "tags";
	}

	function onExit() {
		hideItemPreviewModal();
		title = `Stories | ${siteName}`;
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

    function onKeyDown(event) {
        if (showModalContainer && event.code === "Escape") {
            event.preventDefault();
			onExit();
        }
    }

	function getItemPreviewTitle(item) {
		const { summary } = item;
		const suffix = `- Item | ${siteName}`;

		if (summary.length + suffix.length > TITLE_MAX_LENGTH)
			return `${summary.slice(0, TITLE_MAX_LENGTH - suffix.length - 4).trim()}... ${suffix}`;

		return `${summary} ${suffix}`;
	}
</script>

<svelte:window on:popstate={onStateChange} on:keydown={onKeyDown} />
<svelte:head>
	<title>{title}</title>
</svelte:head>

<a class="skipLink" href="#main">Skip to main content</a>
<Header active="stories" />
<main id="main">
	<ItemNavbar on:viewchange={onViewChange} />
	{#each itemGroups as items, i}
		{#if i !== 0}
			<div class="separator">
				<hr />
				<span>{i + 1}</span>
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
{#if showModalContainer}
	<div class="modalContainer" on:click|self={() => onExit()}>
		{#if showItemPreviewModal}
			<ItemPreviewModal otherItems={getSixRandomItems()} item={previewedItem} on:itemselect={onItemSelectFromModal} />
		{/if}
	</div>
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
    .modalContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000000;
        background-color: #00000088;
        backdrop-filter: blur(4px);
        overflow-y: auto;
        overflow-y: overlay;
    }
</style>

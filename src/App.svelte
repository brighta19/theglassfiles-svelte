<script>
	import { onMount } from "svelte";
	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";
	import ItemPreviewModal from "./ItemPreviewModal.svelte";
	import { selectedItemElement, getPathFromItem } from "./ItemThumbnail.svelte";

	let items = [];
	let previewedItem = null;
	let showItemPreviewModal = false;
	let showDescription = false;
	let showTags = false;

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
		items = await (await fetch("/items.json")).json();

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

	window.addEventListener("popstate", onStateChange);

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

	function hideItemPreviewModal() {
		showItemPreviewModal = false;
		if (selectedItemElement !== null)
			selectedItemElement.focus();
	}
</script>

<svelte:window on:pop />
<Header active="stories" />
<main>
	<ItemNavbar on:viewchange={onViewChange} />
	<ItemGrid {items} {showDescription} {showTags} on:itemselect={onItemSelect} />
</main>
<Footer />
{#if showItemPreviewModal}
	<ItemPreviewModal item={previewedItem} on:exit={onExit} />
{/if}

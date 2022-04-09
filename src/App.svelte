<script>
	import { onMount } from "svelte";

	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";
	import ItemPreviewModal from "./ItemPreviewModal.svelte";

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
		items = await (await fetch("items.json")).json();
	});

	function onItemClick(event) {
		previewedItem = event.detail;
		showItemPreviewModal = true;
	}

	function onViewChange(event) {
		showDescription = event.detail === "descriptions";
		showTags = event.detail === "tags";
	}
</script>

<Header active="stories" />
<main>
	<ItemNavbar on:viewchange={onViewChange} />
	<ItemGrid {items} {showDescription} {showTags} on:itemclick={onItemClick} />
</main>
<Footer />
{#if showItemPreviewModal}
	<ItemPreviewModal item={previewedItem} on:exit={() => showItemPreviewModal = false} />
{/if}

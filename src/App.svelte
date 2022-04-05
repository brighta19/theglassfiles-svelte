<script>
	import { onMount } from "svelte";

	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";
	import ItemPreviewModal from "./ItemPreviewModal.svelte";

	let items = [];

	onMount(async () => {
		items = await (await fetch("items.json")).json();
	});

	let previewedItem = null;
	let showItemPreviewModal = false;

	$: document.body.style.overflowY = showItemPreviewModal ? "hidden" : "overlay";

	function onItemClick(event) {
		previewedItem = event.detail;
		showItemPreviewModal = true;
	}
</script>

<Header active="stories" />
<main>
	<ItemNavbar />
	<ItemGrid {items} on:itemclick={onItemClick} />
</main>
<Footer />
{#if items.length > 0 && showItemPreviewModal}
	<ItemPreviewModal item={previewedItem} on:exit={() => showItemPreviewModal = false} />
{/if}

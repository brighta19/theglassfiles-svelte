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

	let showItemPreviewModal = true;
	$: document.body.style.overflowY = showItemPreviewModal ? "hidden" : "auto";
</script>

<Header active="stories" />
<main>
	<ItemNavbar />
	<ItemGrid {items} />
</main>
<Footer />
{#if showItemPreviewModal}
	<ItemPreviewModal />
{/if}


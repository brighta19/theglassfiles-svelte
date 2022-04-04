<script>
	import { onMount } from "svelte";

	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";
	import Footer from "./Footer.svelte";

	let items = [];

	onMount(async () => {
		items = await (await fetch("items.json")).json();
	});
</script>

<Header active="stories" />
<main>
	<ItemNavbar />
	<ItemGrid {items} />
</main>
<Footer />

<style>
	main {
		display: block;
		/* padding: 25px 20px 15px; */
	}
</style>

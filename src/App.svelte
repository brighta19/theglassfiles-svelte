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

<main>
	<Header active="stories" />

	<ItemNavbar />
	<ItemGrid {items} />

	<Footer />
</main>

<style>
	main {
		display: block;
		width: 950px;
		margin: 0 auto;
		padding: 25px 20px 15px;
	}
</style>

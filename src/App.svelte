<script>
	import { onMount } from "svelte";

	import Header from "./Header.svelte";
	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";

	let items = [];

	onMount(async () => {
		items = await (await fetch("items.json")).json();
	});
</script>

<main>
	<Header active="stories" />

	<ItemNavbar />
	<ItemGrid {items} />
</main>

<style>
	main {
		display: block;
		width: 1000px;
		width: max-content;
		margin: 0 auto;
		padding: 25px 20px 0;
	}
</style>

<script>
import { onMount } from "svelte";

	import ItemGrid from "./ItemGrid.svelte";
	import ItemNavbar from "./ItemNavbar.svelte";

	let items = [];

	onMount(async () => {
		items = await (await fetch("items.json")).json();
	});
</script>

<main>
	<ItemNavbar />
	<ItemGrid {items} />
</main>

<style>
	main {
		display: block;
		width: 1000px;
		margin: 0 auto;
	}
</style>
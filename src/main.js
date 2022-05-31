import App from './App.svelte';

var app = new App({
	target: document.body,
	props: {
		siteName: "The Glass Files"
	}
});

export default app;

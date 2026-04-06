<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>{page.status} - Nicolo Lüscher</title>
</svelte:head>

<div class="py-12 md:py-20">
	<p class="mb-2 font-mono text-sm text-highlight-green">{page.status}</p>
	<h1 class="mb-3 text-3xl font-bold tracking-tight">
		{#if page.status === 404}
			Page not found
		{:else}
			Something went wrong
		{/if}
	</h1>
	<p class="mb-6 text-muted-foreground">
		{#if page.status === 404}
			The page you're looking for doesn't exist or has been moved.
		{:else if page.error}
			{page.error.message}
		{/if}
	</p>
	<Button href="/">Back to Home</Button>
</div>

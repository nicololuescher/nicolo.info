<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';

	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="author" content="Nicolo Lüscher" />
	<link rel="canonical" href="https://nicolo.swiss{$page.url.pathname}" />
	<script>
		if (typeof window !== 'undefined') {
			const mq = window.matchMedia('(prefers-color-scheme: dark)');
			function applyTheme(dark) {
				document.documentElement.classList.toggle('dark', dark);
			}
			applyTheme(mq.matches);
			mq.addEventListener('change', (e) => applyTheme(e.matches));
		}
	</script>
</svelte:head>

<!-- title block -->
<div
	class="pointer-events-none fixed right-4 bottom-4 hidden select-none font-mono text-[11px] text-muted-foreground md:block"
	aria-hidden="true"
>
	<table class="border-collapse border border-muted-foreground/30 bg-background">
		<tbody>
			<tr>
				<td class="border border-muted-foreground/30 px-3 py-1 font-bold" colspan="2">
					nicolo lüscher
				</td>
			</tr>
			<tr>
				<td class="border border-muted-foreground/30 px-3 py-1 text-muted-foreground/60">project</td>
				<td class="border border-muted-foreground/30 px-3 py-1">personal site</td>
			</tr>
			<tr>
				<td class="border border-muted-foreground/30 px-3 py-1 text-muted-foreground/60">rev</td>
				<td class="border border-muted-foreground/30 px-3 py-1">2026.04</td>
			</tr>
			<tr>
				<td class="border border-muted-foreground/30 px-3 py-1 text-muted-foreground/60">scale</td>
				<td class="border border-muted-foreground/30 px-3 py-1">1 : 1</td>
			</tr>
			<tr>
				<td class="border border-muted-foreground/30 px-3 py-1 text-muted-foreground/60">sheet</td>
				<td class="border border-muted-foreground/30 px-3 py-1">1 / 1</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="min-h-screen p-3 md:p-6 lg:p-10">
	<div class="mx-auto max-w-4xl overflow-hidden rounded border border-border bg-card shadow-sm">
		{#if $page.url.pathname === '/'}
		<div class="pride-banner" aria-hidden="true">
			<div class="pride-stripe" style="background:#E40303;"></div>
			<div class="pride-stripe" style="background:#FF8C00;"></div>
			<div class="pride-stripe" style="background:#FFED00;"></div>
			<div class="pride-stripe" style="background:#008026;"></div>
			<div class="pride-stripe" style="background:#24408E;"></div>
			<div class="pride-stripe" style="background:#732982;"></div>
			<div class="pride-stripe" style="background:#000000;"></div>
			<div class="pride-stripe" style="background:#784F17;"></div>
			<div class="pride-stripe" style="background:#55CDFC;"></div>
			<div class="pride-stripe" style="background:#F7A8B8;"></div>
			<div class="pride-stripe" style="background:#FFFFFF;"></div>
		</div>
		{/if}
		<Navbar />
		<main class="px-6 py-6 md:px-8">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>

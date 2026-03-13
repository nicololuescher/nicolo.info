<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		if (typeof window !== 'undefined') {
			const observer = new MutationObserver(() => {
				const isDark = document.documentElement.classList.contains('dark');
				localStorage.setItem('theme', isDark ? 'dark' : 'light');
			});
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

			const theme = localStorage.getItem('theme');
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

			if (theme === 'dark' || (!theme && systemTheme === 'dark')) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	</script>
</svelte:head>

<div class="flex min-h-screen flex-col p-4 md:p-8 lg:p-12">
	<div
		class="relative mx-auto w-full max-w-4xl rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-primary/5"
	>
		<div class="absolute -inset-[1px] overflow-hidden rounded-3xl bg-border/40">
			<div
				class="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_16s_linear_infinite]"
				style="background: conic-gradient(from 0deg, transparent 0 80deg, var(--primary) 180deg, transparent 180deg 260deg, var(--secondary) 360deg);"
			></div>
		</div>

		<div
			class="relative flex h-full min-h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-3xl bg-background shadow-sm backdrop-blur-md"
		>
			<Navbar />
			<div class="flex-1 px-6 md:px-8">
				{@render children()}
			</div>
			<Footer />
		</div>
	</div>
</div>

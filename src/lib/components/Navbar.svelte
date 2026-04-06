<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="border-b border-border px-6 py-4 md:px-8">
	<div class="flex items-center justify-between">
		<a class="flex items-center gap-2" href="/">
			<span class="inline-block h-2 w-2 rounded-sm bg-highlight-green led-pulse"></span>
			<span class="font-mono text-sm font-bold tracking-tight text-foreground">nicolo</span>
		</a>
		<nav class="flex items-center gap-6 text-sm font-medium">
			<a
				href="/about"
				class="text-muted-foreground transition-colors hover:text-foreground"
				class:text-foreground={$page.url.pathname === '/about'}
			>
				About
			</a>
			<a
				href="/projects"
				class="text-muted-foreground transition-colors hover:text-foreground"
				class:text-foreground={$page.url.pathname === '/projects'}
			>
				Projects
			</a>
			<a
				href="/blog"
				class="text-muted-foreground transition-colors hover:text-foreground"
				class:text-foreground={$page.url.pathname.startsWith('/blog')}
			>
				Blog
			</a>
		</nav>
	</div>
</nav>

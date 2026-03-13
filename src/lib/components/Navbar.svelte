<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav
	class="border-b bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 hidden md:flex">
			<a class="mr-6 flex items-center space-x-2" href="/">
				<span class="hidden text-gradient font-bold sm:inline-block">Nicolo</span>
			</a>
			<nav class="flex items-center space-x-6 text-sm font-medium">
				<a
					href="/about"
					class="text-foreground/60 transition-colors hover:text-foreground/80"
					class:text-foreground={$page.url.pathname === '/about'}
				>
					About
				</a>
				<a
					href="/projects"
					class="text-foreground/60 transition-colors hover:text-foreground/80"
					class:text-foreground={$page.url.pathname === '/projects'}
				>
					Projects
				</a>
				<a
					href="/blog"
					class="text-foreground/60 transition-colors hover:text-foreground/80"
					class:text-foreground={$page.url.pathname === '/blog'}
				>
					Blog
				</a>
			</nav>
		</div>
	</div>
</nav>

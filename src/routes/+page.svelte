<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Nicolo Lüscher - Platform Engineer</title>
	<meta
		name="description"
		content="Platform Engineer & Tinkerer. Building infrastructure, breaking things, learning from both."
	/>
	<meta property="og:title" content="Nicolo Lüscher - Platform Engineer" />
	<meta
		property="og:description"
		content="Platform Engineer & Tinkerer. Building infrastructure, breaking things, learning from both."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nicolo.swiss" />
</svelte:head>

<div class="py-12 md:py-20">
	<div class="mb-12">
		<p class="mb-2 font-mono text-sm text-highlight-green">nicolo lüscher</p>
		<h1 class="mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
			Platform Engineer<br /><span class="text-muted-foreground">&amp; Tinkerer</span>
		</h1>
		<p class="mb-6 max-w-lg text-muted-foreground">
			Building infrastructure, breaking things, learning from both. Based in Switzerland.
		</p>
		<div class="flex gap-3">
			<Button href="/projects">Projects</Button>
			<Button variant="outline" href="/blog">Blog</Button>
		</div>
	</div>

	<div class="mb-3 flex items-center gap-2">
		<div class="h-px flex-1 bg-border"></div>
		<span class="font-mono text-xs text-muted-foreground">latest</span>
		<div class="h-px flex-1 bg-border"></div>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<a href="/blog/discord-to-matrix" class="group block">
			<div
				class="rounded border border-border bg-card p-4 transition-colors hover:border-highlight-green"
			>
				<div class="mb-2 flex items-center gap-2">
					<div class="h-3 w-0.5 rounded-sm bg-highlight-green"></div>
					<span class="font-mono text-xs text-muted-foreground">blog</span>
				</div>
				<p class="mb-1 font-medium group-hover:text-primary">
					Replacing Discord with something I control
				</p>
				<p class="text-sm text-muted-foreground">
					Self-hosting Matrix with voice and video calls.
				</p>
			</div>
		</a>

		<a href="/blog/homelab" class="group block">
			<div
				class="rounded border border-border bg-card p-4 transition-colors hover:border-highlight-blue"
			>
				<div class="mb-2 flex items-center gap-2">
					<div class="h-3 w-0.5 rounded-sm bg-highlight-blue"></div>
					<span class="font-mono text-xs text-muted-foreground">blog</span>
				</div>
				<p class="mb-1 font-medium group-hover:text-primary">
					Building a homelab that I can actually maintain
				</p>
				<p class="text-sm text-muted-foreground">
					From a cursed docker-compose to Proxmox and k3s.
				</p>
			</div>
		</a>
	</div>
</div>

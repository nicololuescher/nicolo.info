<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Projects - Nicolo Lüscher</title>
	<meta name="description" content="Projects by Nicolo Lüscher." />
	<meta property="og:title" content="Projects - Nicolo Lüscher" />
	<meta property="og:description" content="Projects by Nicolo Lüscher." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nicolo.swiss/projects" />
</svelte:head>

<div class="py-10">
	<h1 class="mb-8 text-3xl font-bold tracking-tight">Projects</h1>
	<div class="grid gap-4 md:grid-cols-2">
		<div class="rounded border border-border p-5">
			<div class="mb-3 flex items-center gap-2">
				<div class="h-3 w-0.5 rounded-sm bg-highlight-green"></div>
				<span class="font-mono text-xs text-muted-foreground">personal</span>
			</div>
			<p class="mb-1 text-lg font-medium">Portfolio Website</p>
			<p class="mb-4 text-sm text-muted-foreground">
				Built with SvelteKit, Tailwind CSS, and shadcn-svelte. Designed to be fast, accessible, and
				easy to maintain, all while still showcasing my personal style.
			</p>
			<div class="mb-4 flex flex-wrap gap-1.5">
				<Badge variant="outline">SvelteKit</Badge>
				<Badge variant="outline">Tailwind</Badge>
				<Badge variant="outline">Kubernetes</Badge>
			</div>
			<Button
				variant="outline"
				size="sm"
				href="https://github.com/nicololuescher/nicolo.info"
				target="_blank"
			>
				View Code
			</Button>
		</div>

		<div class="rounded border border-border p-5">
			<div class="mb-3 flex items-center gap-2">
				<div class="h-3 w-0.5 rounded-sm bg-highlight-blue"></div>
				<span class="font-mono text-xs text-muted-foreground">infra</span>
			</div>
			<p class="mb-1 text-lg font-medium">Homelab</p>
			<p class="mb-4 text-sm text-muted-foreground">
				My Homelab went through several iterations over the years and has tracked closely with my
				learning journey. Starting with a simple Raspberry Pi that ran a very laggy Minecraft
				server, it evolved into a multiple machine setup that I am finally quite proud of.
			</p>
			<div class="mb-4 flex flex-wrap gap-1.5">
				<Badge variant="outline">Proxmox</Badge>
				<Badge variant="outline">Kubernetes</Badge>
				<Badge variant="outline">GitOps</Badge>
			</div>
			<Button variant="outline" size="sm" href="/blog/homelab">Read Blog Post</Button>
		</div>

		<div class="rounded border border-border p-5">
			<div class="mb-3 flex items-center gap-2">
				<div class="h-3 w-0.5 rounded-sm bg-highlight-yellow"></div>
				<span class="font-mono text-xs text-muted-foreground">fullstack</span>
				<span class="font-mono text-xs text-muted-foreground">·</span>
				<span class="font-mono text-xs text-muted-foreground">architecture</span>
			</div>
			<p class="mb-1 text-lg font-medium">FotoCH</p>
			<p class="mb-4 text-sm text-muted-foreground">
				FotoCH is an archival service for photos taken in Switzerland, maintained by the Fotobüro
				Bern. During my civil service, a friend and I led the planning and architecture for
				migrating it from a monolithic PHP application to a modern microservice architecture. I
				focused on the data migration from the old system and several infrastructure-focused
				components.
			</p>
			<div class="mb-4 flex flex-wrap gap-1.5">
				<Badge variant="outline">Next.js</Badge>
				<Badge variant="outline">PostgreSQL</Badge>
				<Badge variant="outline">GraphQL</Badge>
			</div>
			<Button
				variant="outline"
				size="sm"
				href="https://foto-ch.ch/"
				target="_blank"
			>
				Check it out!
			</Button>
		</div>
	</div>
</div>

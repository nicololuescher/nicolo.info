<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, Root } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Projects - Nicolo Lüscher</title>
	<meta name="description" content="Projects by Nicolo Lüscher." />
	<meta property="og:title" content="Projects - Nicolo Lüscher" />
	<meta property="og:description" content="Projects by Nicolo Lüscher." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nicolo.info/projects" />
</svelte:head>

<div class="container py-10">
	<h1 class="mb-8 text-3xl font-bold">Projects</h1>
	<div class="grid gap-6 md:grid-cols-2">
		<Card.Root class="flex flex-col">
			<Card.Header>
				<Card.Title>Portfolio Website</Card.Title>
				<Card.Description>My personal corner of the internet.</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1">
				<p class="mb-4 text-sm text-muted-foreground">
					Built with SvelteKit, Tailwind CSS, and shadcn-svelte. Designed to be fast, accessible,
					and easy to maintain.
				</p>
				<div class="flex flex-wrap gap-2">
					<Badge variant="secondary">SvelteKit</Badge>
					<Badge variant="secondary">Tailwind</Badge>
					<Badge variant="secondary">Docker</Badge>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button
					variant="outline"
					class="w-full"
					href="https://github.com/nicolo.info"
					target="_blank">View Code</Button
				>
			</Card.Footer>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Homelab</Card.Title>
				<Card.Description>My personal server setup.</Card.Description>
				<Card.Content class="mt-4">
					<p class="mb-4 text-sm text-muted-foreground">
						My Homelab went through several iterations over the years and has tracked closely with
						my learning journey. Starting with a simple Raspberry Pi that ran a very laggy Minecraft
						server, it evolved into a multiple machine setup that I am finally quite proud of. You
						can read about it in my blog post.
					</p>
					<div class="flex flex-wrap gap-2">
						<Badge variant="secondary">Proxmox</Badge>
						<Badge variant="secondary">Kubernetes</Badge>
						<Badge variant="secondary">GitOps</Badge>
					</div>
				</Card.Content>

				<Card.Footer class="mt-6 flex items-center justify-end gap-4">
					<Button variant="outline" class="w-full" href="http://localhost:5173/blog/homelab"
						>Blog Post</Button
					>
				</Card.Footer>
			</Card.Header>
		</Card.Root>
	</div>
</div>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
</script>

<svelte:head>
	<title>Blog - Nicolo Lüscher</title>
	<meta name="description" content="Blog posts about self-hosting, homelabs, and software engineering." />
	<meta property="og:title" content="Blog - Nicolo Lüscher" />
	<meta property="og:description" content="Blog posts about self-hosting, homelabs, and software engineering." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nicolo.info/blog" />
</svelte:head>

<div class="container max-w-4xl py-10">
	<h1 class="mb-8 text-3xl font-bold">Blog</h1>
	<div class="space-y-6">
		<a href="/blog/discord-to-matrix" class="block transition-colors hover:no-underline">
			<Card.Root class="transition-shadow hover:shadow-lg">
				<Card.Header>
					<div class="flex items-start justify-between">
						<div>
							<Card.Title class="text-xl">Replacing Discord with something I control</Card.Title>
							<Card.Description class="mt-1">
								Self-hosting Matrix with voice and video calls, and what it actually takes to
								get people to switch.
							</Card.Description>
						</div>
						<Badge>New</Badge>
					</div>
				</Card.Header>
				<Card.Content>
					<p class="line-clamp-2 text-sm text-muted-foreground">
						Setting up a federated chat server with conduwuit, Element, and LiveKit for
						voice and video. The technical part was the easy part.
					</p>
				</Card.Content>
				<Card.Footer>
					<p class="text-xs text-muted-foreground">March 29, 2026</p>
				</Card.Footer>
			</Card.Root>
		</a>
		<a href="/blog/homelab" class="block transition-colors hover:no-underline">
			<Card.Root class="transition-shadow hover:shadow-lg">
				<Card.Header>
					<div class="flex items-start justify-between">
						<div>
							<Card.Title class="text-xl">Building a homelab that I can actually maintain</Card.Title>
							<Card.Description class="mt-1">
								How I went from a cursed docker-compose file to a setup I can rebuild from
								a git repo.
							</Card.Description>
						</div>
					</div>
				</Card.Header>
				<Card.Content>
					<p class="line-clamp-2 text-sm text-muted-foreground">
						Proxmox, k3s, Ansible, and the architectural decisions that make a homelab
						something I can maintain without it becoming a second job.
					</p>
				</Card.Content>
				<Card.Footer>
					<p class="text-xs text-muted-foreground">March 14, 2026</p>
				</Card.Footer>
			</Card.Root>
		</a>
	</div>
</div>

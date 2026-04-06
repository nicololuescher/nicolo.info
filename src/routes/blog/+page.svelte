<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
</script>

<svelte:head>
	<title>Blog - Nicolo Lüscher</title>
	<meta
		name="description"
		content="Blog posts about self-hosting, homelabs, and software engineering."
	/>
	<meta property="og:title" content="Blog - Nicolo Lüscher" />
	<meta
		property="og:description"
		content="Blog posts about self-hosting, homelabs, and software engineering."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nicolo.swiss/blog" />
</svelte:head>

<div class="py-10">
	<h1 class="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
	<div class="space-y-4">
		<a href="/blog/discord-to-matrix" class="group block">
			<div
				class="rounded border border-border p-5 transition-colors hover:border-highlight-green"
			>
				<div class="mb-3 flex items-center gap-3">
					<span class="font-mono text-xs text-muted-foreground">2026-03-29</span>
					<Badge variant="secondary">New</Badge>
				</div>
				<p class="mb-1 text-lg font-medium group-hover:text-primary">
					Replacing Discord with something I control
				</p>
				<p class="mb-3 text-sm text-muted-foreground">
					Self-hosting Matrix with voice and video calls, and what it actually takes to get people
					to switch.
				</p>
				<div class="flex flex-wrap gap-1.5">
					<Badge variant="outline">Matrix</Badge>
					<Badge variant="outline">Self-Hosting</Badge>
					<Badge variant="outline">LiveKit</Badge>
					<Badge variant="outline">WebRTC</Badge>
				</div>
			</div>
		</a>

		<a href="/blog/homelab" class="group block">
			<div
				class="rounded border border-border p-5 transition-colors hover:border-highlight-blue"
			>
				<div class="mb-3 flex items-center gap-3">
					<span class="font-mono text-xs text-muted-foreground">2026-03-14</span>
				</div>
				<p class="mb-1 text-lg font-medium group-hover:text-primary">
					Building a homelab that I can actually maintain
				</p>
				<p class="mb-3 text-sm text-muted-foreground">
					How I went from a cursed docker-compose file to a setup I can rebuild from a git repo.
				</p>
				<div class="flex flex-wrap gap-1.5">
					<Badge variant="outline">Proxmox</Badge>
					<Badge variant="outline">Kubernetes</Badge>
					<Badge variant="outline">GitOps</Badge>
					<Badge variant="outline">Ansible</Badge>
				</div>
			</div>
		</a>
	</div>
</div>

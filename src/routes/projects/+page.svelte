<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container py-10">
	<h1 class="mb-8 text-3xl font-bold">Projects</h1>
	<div class="grid gap-6 md:grid-cols-2">
		<!-- Project 1 -->
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

		<!-- Project 2 Placeholder -->
		<Card.Root class="flex flex-col">
			<Card.Header>
				<Card.Title>Task Manager App</Card.Title>
				<Card.Description>A simple productivity tool.</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1">
				<p class="mb-4 text-sm text-muted-foreground">
					A drag-and-drop task management application focusing on simplicity and speed.
				</p>
				<div class="flex flex-wrap gap-2">
					<Badge variant="secondary">React</Badge>
					<Badge variant="secondary">Firebase</Badge>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button variant="outline" class="w-full" disabled>Coming Soon</Button>
			</Card.Footer>
		</Card.Root>

		<!-- Project 3 Placeholder -->
		<Card.Root class="flex flex-col">
			<Card.Header>
				<Card.Title>Weather Dashboard</Card.Title>
				<Card.Description>Real-time weather data visualization.</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1">
				<p class="mb-4 text-sm text-muted-foreground">
					Fetches data from public APIs to display current weather conditions and forecasts.
				</p>
				<div class="flex flex-wrap gap-2">
					<Badge variant="secondary">Vue</Badge>
					<Badge variant="secondary">Chart.js</Badge>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button variant="outline" class="w-full" disabled>Coming Soon</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

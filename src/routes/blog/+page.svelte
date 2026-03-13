<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="container max-w-4xl py-10">
	<h1 class="mb-8 text-3xl font-bold">Blog</h1>
	<div class="space-y-6">
		<!-- Blog Post 1 -->
		<Card.Root>
			<Card.Header>
				<div class="flex items-start justify-between">
					<div>
						<Card.Title class="text-xl">Building a Modern Portfolio</Card.Title>
						<Card.Description class="mt-1">
							Why I chose SvelteKit and Docker for my personal site.
						</Card.Description>
					</div>
					<Badge>New</Badge>
				</div>
			</Card.Header>
			<Card.Content>
				<p class="line-clamp-2 text-sm text-muted-foreground">
					In this post, I explore the decision-making process behind my new portfolio's tech stack.
					From the speed of SvelteKit to the reliability of containerized deployment, I'll break
					down why this setup works for me.
				</p>
			</Card.Content>
			<Card.Footer>
				<p class="text-xs text-muted-foreground">February 16, 2026</p>
			</Card.Footer>
		</Card.Root>

		<!-- Blog Post 2 -->
		<Card.Root>
			<Card.Header>
				<div class="flex items-start justify-between">
					<div>
						<Card.Title class="text-xl">The Joy of Tailwind CSS</Card.Title>
						<Card.Description class="mt-1">
							How utility-first CSS changed my workflow.
						</Card.Description>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<p class="line-clamp-2 text-sm text-muted-foreground">
					Tailwind CSS has been a game-changer for rapid UI development. It allows me to build
					custom designs without leaving my HTML, standardizing my design system along the way.
				</p>
			</Card.Content>
			<Card.Footer>
				<p class="text-xs text-muted-foreground">January 10, 2026</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

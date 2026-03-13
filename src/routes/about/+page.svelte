<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="container max-w-3xl py-12 md:py-16">
	<div class="flex flex-col gap-8 md:items-start">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-3">
				<h1 class="text-3xl font-bold tracking-tight md:text-4xl">About Me</h1>
				<!-- <Badge variant="secondary" class="h-6">Available for hire</Badge> -->
			</div>
			<p class="text-xl text-muted-foreground">"Bastler" in chief, based in Switzerland.</p>
		</div>

		<div class="prose max-w-none prose-neutral dark:prose-invert">
			<p>
				Hello! I'm Nicolo, my CV say I'm a Plattform Engineer, but I like everything that has to do
				with building things. I'm a tinkerer, developer and a proffesional fire-hazzard.
			</p>
			<p>
				I have dabbled in a lot of things, from web development, client engineering to cloud
				computing. Currently, I am occupied with leveraging containerization using <a
					href="https://kubernetes.io/"
					><span class="text-lg font-bold text-primary no-underline">Kubernetes</span></a
				> and other tools to make my life easier. I'm also a big fan of open source and try to contribute
				where I can.
			</p>
			<p>
				When I'm not coding, you can find me riding my bike or my motorcycle, destroying my ears and
				body in a moshpit at a metal show, or trying to learn a new skill.
			</p>
		</div>
	</div>
</div>

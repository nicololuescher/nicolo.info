<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div
	class="container flex max-w-screen-2xl flex-col items-center justify-center gap-4 py-24 text-center md:py-32"
>
	<h1 class="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
		Hi, I'm <span class="text-gradient">Nicolo</span>
	</h1>
	<p class="max-w-[700px] text-muted-foreground md:text-xl">
		Software Engineer & Designer. Building modern, high-performance web applications.
	</p>
	<div class="flex gap-4">
		<Button href="/projects">View Projects</Button>
		<Button variant="outline" href="/about">About Me</Button>
	</div>
</div>

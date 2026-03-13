<script lang="ts">
	import { Github, Linkedin } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="px-6 py-6 md:px-8 md:py-0">
	<div class="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
		<p class="text-center text-sm leading-loose text-balance text-muted-foreground md:text-left">
			&copy; {currentYear} Built by
			<a
				href="https://nicolo.info"
				target="_blank"
				rel="noreferrer"
				class="font-medium underline underline-offset-4"
			>
				Nicolo
			</a>
			. The source code is available on
			<a
				href="https://github.com/nicolo.info"
				target="_blank"
				rel="noreferrer"
				class="font-medium underline underline-offset-4"
			>
				GitHub
			</a>
			.
		</p>
		<p class="text-center text-sm leading-loose text-balance text-muted-foreground md:text-right">
			<a
				href="https://www.linkedin.com/in/nicolo-luescher/"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-1 font-medium underline underline-offset-4"
			>
				<Linkedin class="h-4 w-4" />
			</a>
			<a
				href="https://github.com/nicololuescher"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-1 font-medium underline underline-offset-4"
			>
				<Github class="h-4 w-4" />
			</a>
		</p>
	</div>
</footer>

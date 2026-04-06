<script lang="ts">
	import { Github, Linkedin } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-border px-6 py-6 md:px-8">
	<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
		<p class="text-center text-sm text-muted-foreground md:text-left">
			&copy; {currentYear} Nicolo Lüscher
		</p>
		<div class="flex items-center gap-4">
			<a
				href="https://www.linkedin.com/in/nicolo-luescher/"
				target="_blank"
				rel="noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<Linkedin class="h-4 w-4" />
			</a>
			<a
				href="https://github.com/nicololuescher"
				target="_blank"
				rel="noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</footer>

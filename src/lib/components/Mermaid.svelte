<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		chart: string;
	}

	let { chart }: Props = $props();

	let container: HTMLDivElement;
	let svgMarkup = $state('');
	let overlay: HTMLDivElement | null = null;

	function open() {
		if (!svgMarkup) return;

		overlay = document.createElement('div');
		overlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 9999;
			background: rgba(0, 0, 0, 0.92);
			cursor: zoom-out;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 2rem;
		`;
		overlay.innerHTML = svgMarkup;

		const svg = overlay.querySelector('svg');
		if (svg) {
			svg.style.maxWidth = 'min(85vw, 900px)';
			svg.style.maxHeight = '80vh';
			svg.style.width = 'auto';
			svg.style.height = 'auto';
		}

		overlay.addEventListener('click', close);
		document.body.appendChild(overlay);
		document.body.style.overflow = 'hidden';
	}

	function close() {
		if (overlay) {
			overlay.removeEventListener('click', close);
			document.body.removeChild(overlay);
			overlay = null;
		}
		document.body.style.overflow = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && overlay) close();
	}

	onMount(async () => {
		const mermaid = (await import('mermaid')).default;
		mermaid.initialize({
			startOnLoad: false,
			theme: 'dark',
			themeVariables: {
				fontFamily: 'inherit',
				fontSize: '16px'
			}
		});
		const { svg } = await mermaid.render(`mermaid-${crypto.randomUUID()}`, chart);
		svgMarkup = svg;
		container.innerHTML = svg;
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			close();
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="not-prose my-8">
	<div
		class="inline-wrapper"
		bind:this={container}
		role="button"
		tabindex="0"
		onclick={open}
		onkeydown={(e) => {
			if (e.key === 'Enter') open();
		}}
	></div>
	<p style="margin-top: 0.5rem; text-align: center; font-size: 0.75rem; color: #737373;">
		Click to expand
	</p>
</div>

<style>
	.inline-wrapper {
		width: 100%;
		cursor: zoom-in;
		overflow-x: auto;
		border-radius: 0.5rem;
		border: 1px solid #262626;
		background: #0a0a0a;
		padding: 1rem;
		text-align: center;
	}

	.inline-wrapper:hover {
		border-color: #404040;
	}

	.inline-wrapper :global(svg) {
		max-height: 500px;
		width: auto;
		display: inline-block;
	}
</style>

<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
</script>

<svelte:head>
	<title>Replacing Discord with something I control - Nicolo Lüscher</title>
	<meta
		name="description"
		content="Self-hosting Matrix with voice and video calls using conduwuit, Element Call, and LiveKit."
	/>
	<meta property="og:title" content="Replacing Discord with something I control" />
	<meta
		property="og:description"
		content="Self-hosting Matrix with voice and video calls using conduwuit, Element Call, and LiveKit."
	/>
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://nicolo.info/blog/discord-to-matrix" />
	<meta property="article:published_time" content="2026-03-29" />
	<meta property="article:author" content="Nicolo Lüscher" />
	<meta property="article:tag" content="Matrix" />
	<meta property="article:tag" content="Self-Hosting" />
	<meta property="article:tag" content="LiveKit" />
	<meta property="article:tag" content="WebRTC" />
</svelte:head>

<!-- TODO: This post is a draft generated during the homelab blog session. Needs a full rewrite
     in my own voice with the same feedback applied (no forced humor, no magic numbers, no AI tone).
     The structure and technical details are roughly correct but the prose needs work. -->
<article class="container max-w-3xl py-10">
	<header class="mb-8">
		<h1 class="mb-2 text-4xl font-bold">Replacing Discord with something I control</h1>
		<p class="mb-4 text-lg text-muted-foreground">
			Self-hosting Matrix with voice and video calls, and what it actually takes to get people
			to switch.
		</p>
		<div class="flex items-center gap-3 text-sm text-muted-foreground">
			<time datetime="2026-03-29">March 29, 2026</time>
			<span>·</span>
			<span>7 min read</span>
		</div>
		<div class="mt-4 flex flex-wrap gap-2">
			<Badge variant="secondary">Matrix</Badge>
			<Badge variant="secondary">Self-Hosting</Badge>
			<Badge variant="secondary">LiveKit</Badge>
			<Badge variant="secondary">WebRTC</Badge>
		</div>
	</header>

	<Separator class="mb-8" />

	<div class="prose max-w-none prose-neutral dark:prose-invert">
		<h2>The problem with Discord</h2>
		<p>
			I've been using Discord for years. It's where my friend group coordinates, where we hop
			into voice calls, where we share links and files. It works well enough that nobody thinks
			about it, which is exactly the problem. Nobody thinks about the fact that all of our
			conversations live on servers we don't control, that the platform can change its terms
			whenever it wants, or that our data is the product.
		</p>
		<p>
			I'm not going to pretend I had some dramatic breaking point. It's more of a slow
			realization that I run my own cloud storage, my own document management, my own
			monitoring stack, but I'm still sending all my messages through a platform that could
			lock me out tomorrow. That felt inconsistent.
		</p>

		<h2>Why Matrix</h2>
		<p>
			Matrix is a federated messaging protocol. Federated means anyone can run a server, and
			servers talk to each other. If you're on matrix.nicolo.info and your friend is on
			matrix.org, you can still message each other. It's the same idea as email, applied to
			chat.
		</p>
		<p>
			The important part for me was that federation means I own my data but I'm not isolating
			myself. I can talk to anyone on any Matrix server, not just people I've convinced to
			join mine. That changes the pitch from "come use my server" to "make an account anywhere
			and we can talk."
		</p>
		<p>
			The less obvious reason I picked Matrix is that it recently got proper voice and video
			call support through Element Call and LiveKit. A year ago, self-hosted Matrix was a
			viable text replacement for Discord, but you still needed Discord or something else for
			voice. That's no longer the case.
		</p>

		<h2>The stack</h2>
		<p>
			The homeserver is <a href="https://continuwuity.org/">conduwuit</a> (recently rebranded
			to continuwuity), a Matrix server written in Rust. It uses RocksDB as its embedded
			database, runs on about 256MB of RAM, and handles federation without any additional
			configuration. Compared to Synapse (the reference Python implementation), it's
			noticeably lighter and faster for a single-user or small-group server.
		</p>
		<p>
			For the client, I use <a href="https://element.io/">Element Web</a>, which is the most
			mature Matrix web client. It's a static site that points at my homeserver and has
			built-in support for Element Call. Element Call is a separate service that handles
			voice and video, backed by a <a href="https://livekit.io/">LiveKit</a> server that
			does the actual WebRTC media routing.
		</p>
		<p>
			There's also a small JWT service that sits between Element Call and LiveKit. When you
			start a call, Element Call requests a token from this service, which authenticates you
			against the homeserver and gives you a signed JWT that LiveKit accepts. It's a thin
			layer but it's what ties the Matrix identity to the media server.
		</p>

		<h2>The networking part</h2>
		<p>
			Text messaging over Matrix works through HTTPS. Federation between servers, client
			connections, everything goes over port 443. Traefik handles TLS termination and routing,
			and other servers discover mine through a <code>.well-known/matrix/server</code>
			endpoint. That part is straightforward.
		</p>
		<p>
			Voice and video is where it gets interesting. LiveKit needs direct UDP access for media
			streams. In my setup, LiveKit runs with <code>hostNetwork: true</code> in Kubernetes and
			is pinned to a specific worker node (10.0.0.21) because the FritzBox port forwards need
			to point at a known IP. The ports involved: UDP 3478 for TURN, UDP 50000-50255 for
			media streams (256 concurrent ports), and TCP 7881 as a WebRTC fallback for restrictive
			networks.
		</p>
		<p>
			This means if I ever move LiveKit to a different node, I have to update the FritzBox
			port forwards to match. It's a manual dependency that I'd like to eliminate eventually,
			but for now it works and I've documented it so I don't forget.
		</p>

		<h2>What the call flow looks like</h2>
		<p>
			When someone clicks the call button in Element Web, here's what happens:
		</p>
		<ol>
			<li>Element Web opens Element Call, which reads its config and knows the homeserver is
				at matrix.nicolo.info and LiveKit is at livekit.nicolo.info.</li>
			<li>Element Call requests a JWT from the <code>/sfu/get</code> endpoint, which routes
				to the JWT service. The JWT service verifies the request against the homeserver and
				returns a signed token.</li>
			<li>Element Call opens a WebSocket connection to LiveKit using that token. LiveKit
				validates it using the same shared API key and secret.</li>
			<li>Media flows through LiveKit's SFU. For two people it can be peer-to-peer, for
				groups it routes through the server.</li>
		</ol>
		<p>
			Both the homeserver and LiveKit read their credentials from the same 1Password vault
			item through External Secrets Operator. This way they can't drift out of sync, which
			would silently break call authentication.
		</p>

		<h2>Getting people to switch</h2>
		<p>
			This is the hard part, and I don't think there's a trick to it. The technical setup
			took me a few days. Convincing people to actually use it is an ongoing project.
		</p>
		<p>
			What helped: Matrix accounts are free to create on any public server, so nobody has
			to use my server specifically. I can send people to matrix.org to register and then
			just invite them to rooms on my server. The barrier is downloading Element (or any
			Matrix client) and making an account, which is about the same friction as any new
			messaging app.
		</p>
		<p>
			What didn't help: trying to migrate everything at once. Discord is where the group
			has years of history, shared channels, bot integrations. Trying to replicate all of
			that on day one is a losing strategy. I started with just the people who were willing
			to try it for voice calls, and it's been growing from there.
		</p>
		<p>
			The honest status right now: a handful of friends use it regularly, mostly for voice
			calls and smaller group chats. The big Discord server is still the big Discord server.
			I'm not trying to force the switch. The point was to have an alternative that I
			control, and that alternative now exists and works.
		</p>

		<h2>Was it worth it</h2>
		<p>
			For the voice and video calls alone, yes. Having a self-hosted option that works well
			enough for daily use was the thing I was missing. Text chat over Matrix was already
			viable before, but without voice it wasn't a real Discord replacement.
		</p>
		<p>
			The whole stack (conduwuit, Element Web, Element Call, LiveKit, JWT service) uses
			roughly 500MB of RAM total at idle. It runs alongside everything else in my k3s
			cluster without any noticeable impact. Federation means I'm part of the broader
			Matrix network without running a big server. And if I ever want to move to a different
			homeserver implementation, the protocol is standardized and my rooms and history come
			with me.
		</p>
		<p>
			If you're already running a homelab and you've been looking for a self-hosted
			messaging setup that includes voice and video, the tooling is there now. It wasn't
			a year ago, but it is now.
		</p>
	</div>
	<Separator class="my-8" />

	<footer>
		<a href="/blog" class="text-sm text-muted-foreground hover:text-foreground">
			&larr; Back to all posts
		</a>
	</footer>
</article>

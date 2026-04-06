<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import Mermaid from '$lib/components/Mermaid.svelte';
</script>

<svelte:head>
	<title>Building a homelab that I can actually maintain - Nicolo Lüscher</title>
	<meta
		name="description"
		content="How I went from a cursed docker-compose file to a Proxmox and k3s setup I can rebuild from a git repo."
	/>
	<meta property="og:title" content="Building a homelab that I can actually maintain" />
	<meta
		property="og:description"
		content="How I went from a cursed docker-compose file to a Proxmox and k3s setup I can rebuild from a git repo."
	/>
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://nicolo.swiss/blog/homelab" />
	<meta property="article:published_time" content="2026-03-14" />
	<meta property="article:author" content="Nicolo Lüscher" />
	<meta property="article:tag" content="Proxmox" />
	<meta property="article:tag" content="Kubernetes" />
	<meta property="article:tag" content="GitOps" />
	<meta property="article:tag" content="Ansible" />
</svelte:head>

<article class="py-10">
	<header class="mb-8">
		<h1 class="mb-2 text-3xl font-bold tracking-tight">
			Building a homelab that I can actually maintain
		</h1>
		<p class="mb-3 text-muted-foreground">
			How I went from a cursed docker-compose file to a setup I can rebuild from a git repo.
		</p>
		<div class="mb-3 flex items-center gap-3 font-mono text-xs text-muted-foreground">
			<time datetime="2026-03-14">2026-03-14</time>
			<span>·</span>
			<span>8 min read</span>
		</div>
		<div class="flex flex-wrap gap-1.5">
			<Badge variant="outline">Proxmox</Badge>
			<Badge variant="outline">Kubernetes</Badge>
			<Badge variant="outline">GitOps</Badge>
			<Badge variant="outline">Ansible</Badge>
		</div>
	</header>

	<Separator class="mb-8" />

	<div class="prose max-w-none prose-neutral dark:prose-invert">
		<h2>The setup I was trying to escape</h2>
		<p>
			My previous homelab was a NUC running a single, enormous docker-compose file generated
			by an Ansible role. The idea was sound: define your services in an abstracted YAML
			format, let Ansible template out the compose file, done. Simple. Infrastructure as code.
		</p>
		<p>
			In practice, it was miserable. Traefik couldn't see services that weren't up yet at
			creation time. Containers had circular dependencies that Docker Compose couldn't
			resolve. Updating anything meant following a specific ritual: take everything down,
			pull all images, start the stack, wait, restart specific containers in the right order,
			and hope. If you got the order wrong, things would break in subtle ways that you
			wouldn't notice until a week later.
		</p>
		<p>
			It was technically infrastructure as code. It was also the kind of infrastructure as
			code where the code is a liability. Adding new services was painful, extending existing
			ones was worse, and I haven't even gotten to host-level maintenance yet. Let's just
			say that if Ansible's <code>reboot</code> module had feelings, it would have filed a
			restraining order against me.
		</p>
		<p>
			When I got my hands on better hardware, I didn't just want to migrate the old setup. I
			wanted something that I could rebuild from a git repo if the machine caught fire, but
			also something that's actually fun to work on. A homelab should be a place where you
			try things out and learn, not a system you're afraid to touch because you might not get
			it back up.
		</p>

		<h2>The hardware</h2>
		<p>
			The main node is a mini PC with an i7-13700, 64GB of DDR5, and 1TB of NVMe. I found
			it second-hand on Ricardo for about 650 CHF during the height of the RAM-pocalypse,
			which felt like getting away with something. It draws about 50-70W, which is reasonable
			for something that never turns off.
		</p>
		<p>
			I also still have an MSI N100 NUC with 4GB of RAM sitting around. The plan is to turn
			it into a backup server, but I'll get to that later.
		</p>

		<h2>How it all fits together</h2>
		<p>
			Proxmox runs on the bare metal and manages everything above it. We use it at work, so
			I wasn't starting from zero. After the initial ISO install, Ansible takes over: it
			configures the host, sets up storage, and provisions all VMs through the Proxmox API
			with cloud-init templates. No clicking around in web UIs, nothing configured by hand.
		</p>

		<Mermaid
			chart={`graph TB
    HW["<b>Bare Metal</b>\ni7-13700 · 64GB · 1TB NVMe"]
    HW --> PVE["<b>Proxmox VE</b>"]

    PVE --> PIHOLE["<b>Pi-hole</b>\nLXC"]
    PVE --> K3S["<b>k3s Cluster</b>\n3 VMs"]
    PVE --> OTHER["<b>Other VMs</b>\nHome Assistant\nGame Servers\nDevbox"]

    K3S --> APPS["Nextcloud · Paperless\nMatrix · Monitoring\nand more"]

    style HW fill:#1e293b,stroke:#38bdf8,color:#e2e8f0
    style PVE fill:#1e293b,stroke:#a78bfa,color:#e2e8f0
    style K3S fill:#1e293b,stroke:#34d399,color:#e2e8f0
    style PIHOLE fill:#1e293b,stroke:#f87171,color:#e2e8f0
    style OTHER fill:#1e293b,stroke:#38bdf8,color:#e2e8f0
    style APPS fill:#1e293b,stroke:#34d399,color:#e2e8f0`}
		/>

		<p>
			Three VMs form a k3s cluster, which is where most services live. Home Assistant gets
			its own VM because HA OS likes to manage itself and needs direct access to things like
			USB devices and mDNS that don't play well with Kubernetes. There's a VM for hosting
			game servers (Minecraft, Valheim, that kind of thing) for my friends and me, running
			Docker Compose because they're ephemeral and don't need orchestration.
			The devbox is where I do development work when I'm not at my main machine. And Pi-hole
			gets an LXC container because it needs to be up before anything else boots. More on
			that in a bit.
		</p>

		<h2>Why k3s (again)</h2>
		<p>
			Before this homelab, I rented a couple of servers on Hetzner (a German cloud provider)
			and ran k3s on those. That setup was held together by vibes and wishful thinking. I
			didn't understand half of what Kubernetes was doing, and it showed. Coming back to it
			after working with Kubernetes professionally was a different experience.
			k3s ships as a single binary with an ingress controller, DNS, storage
			provisioning, and an embedded database all included. You install it and it works, which
			is not something I'm used to saying about Kubernetes.
		</p>
		<p>
			Everything on the cluster is managed by ArgoCD, which watches the git repo and keeps
			the cluster in sync. Push a change, ArgoCD applies it. No <code>kubectl apply</code>
			from my laptop, no "did I forget to deploy that?"
		</p>

		<Mermaid
			chart={`graph TB
    GIT["<b>Git Push</b>"]
    GIT --> ARGO["<b>ArgoCD</b>\ndetects changes, syncs"]

    ARGO --> WAVES

    subgraph WAVES["Deploy Order (Sync Waves)"]
        direction TB
        W1["1. cert-manager\nTLS certificates"]
        W2["2. External Secrets\n1Password sync"]
        W3["3. Traefik + DDNS\nRouting"]
        W4["4. Applications\nNextcloud, Paperless, ..."]
        W1 --> W2 --> W3 --> W4
    end

    style GIT fill:#1e293b,stroke:#38bdf8,color:#e2e8f0
    style ARGO fill:#1e293b,stroke:#a78bfa,color:#e2e8f0
    style WAVES fill:#111827,stroke:#374151,color:#e2e8f0
    style W1 fill:#1e293b,stroke:#fb923c,color:#e2e8f0
    style W2 fill:#1e293b,stroke:#fb923c,color:#e2e8f0
    style W3 fill:#1e293b,stroke:#fb923c,color:#e2e8f0
    style W4 fill:#1e293b,stroke:#fb923c,color:#e2e8f0`}
		/>

		<p>
			Sync waves are what make a fresh deploy actually work. Infrastructure goes first
			(certificates, secrets), then routing, then the actual apps. Without this, pods crash
			because their TLS certs don't exist yet or their database credentials haven't been
			pulled from 1Password. I learned this the fun way.
		</p>

		<h2>The decisions that matter</h2>

		<h3>DNS outside the cluster</h3>
		<p>
			Pi-hole runs in a Proxmox LXC container, not inside Kubernetes. For my setup, this was
			the pragmatic choice: the LXC container starts with the Proxmox host before any VM
			boots, so DNS is available from the moment the machine turns on. No dependency on the
			cluster being healthy, no worrying about what happens during upgrades or reboots. Could
			you engineer around this with proper init ordering and fallback resolvers? Sure. But
			Pi-hole in an LXC is simple, Ansible manages it, and I've never had to think about it
			since setting it up. That's exactly what I want from DNS.
		</p>

		<h3>Simple storage</h3>
		<p>
			I went with NFS over Longhorn because it's simpler and it fits what I actually need.
			Not every piece of data in the cluster is equally important. Databases, caches, and
			metrics are ephemeral in the sense that they get recreated on a rebuild anyway, so
			those live on local NVMe through the k3s storage provisioner. The data I actually care
			about, like Nextcloud files and Paperless documents, lives on NFS backed by the Proxmox
			host. It's straightforward, easy to reason about, and doesn't add another distributed
			system to manage on top of Kubernetes.
		</p>

		<Mermaid
			chart={`graph TB
    subgraph LOCAL["Local NVMe"]
        direction LR
        PG["PostgreSQL"]
        RD["Redis"]
        PROM["Prometheus"]
    end

    subgraph NFS["NFS Export"]
        direction LR
        NC["Nextcloud\nfiles"]
        PL["Paperless\ndocuments"]
    end

    NFS -->|"planned: nightly\nrestic to B2"| B2["Backblaze B2\n(off-site)"]

    style LOCAL fill:#1e293b,stroke:#34d399,color:#e2e8f0
    style NFS fill:#1e293b,stroke:#fb923c,color:#e2e8f0
    style B2 fill:#1e293b,stroke:#a78bfa,color:#e2e8f0
    style PG fill:#1e293b,stroke:#34d399,color:#e2e8f0
    style RD fill:#1e293b,stroke:#34d399,color:#e2e8f0
    style PROM fill:#1e293b,stroke:#34d399,color:#e2e8f0
    style NC fill:#1e293b,stroke:#fb923c,color:#e2e8f0
    style PL fill:#1e293b,stroke:#fb923c,color:#e2e8f0`}
		/>

		<p>
			The plan is to run nightly restic backups to Backblaze B2 for off-site copies. I say
			"the plan" because it's been a month and I still haven't set it up. The CronJob
			manifest is written, the B2 bucket exists, but actually deploying it has been on my
			todo list since day one. This is the homelab equivalent of buying a gym membership in
			January.
		</p>

		<h3>Secrets from 1Password</h3>
		<p>
			Before this setup, my secret management strategy was: passwords live in my personal
			1Password account, and when I need one in the cluster, I
			<code>kubectl create secret</code> it by hand. Ansible vault handled the
			infrastructure-level secrets. It technically worked, but it meant that secrets lived in
			my head and in a GUI app, not in any reproducible process. If I rebuilt the cluster, I'd
			be copy-pasting passwords from 1Password into terminal commands for half an hour.
		</p>
		<p>
			Now External Secrets Operator pulls everything from a dedicated 1Password vault
			automatically. Each service has an ExternalSecret that references its vault item. You
			bootstrap two secrets by hand when setting up from scratch (the 1Password connection
			credentials), and after that everything syncs. Rotation is just updating the vault
			entry. It's one of those changes that makes you wonder why you didn't do it sooner.
		</p>

		<h3>The .swiss domain</h3>
		<p>
			I have a nicolo.swiss domain, which is one of the more restrictive TLDs out there.
			Getting cert-manager to issue wildcard certificates for it required a CNAME delegation
			workaround for DNS validation that isn't in most tutorials. Small thing, one config
			flag, but it took some digging to find.
		</p>

		<h2>The fun part</h2>

		<h3>Paperless documents in Nextcloud</h3>
		<p>
			Paperless-ngx processes and archives documents on an NFS volume. That same volume is
			mounted read-only into the Nextcloud pod, and Nextcloud's External Storage app exposes
			it as a folder in the file browser. I scan a letter, Paperless OCRs and tags it, and
			it shows up in my Nextcloud files. No sync jobs, no webhooks, no API integration. Just
			two services looking at the same directory. Sometimes the simplest solution really is
			the best one.
		</p>

		<h2>The bugs I'll never forget</h2>

		<h3>The Nextcloud login loop</h3>
		<p>
			After deploying Nextcloud, logins just silently didn't work. You'd enter your password,
			hit submit, and end up right back at the login page. No error, no log entry, nothing.
			Everything looked healthy. I spent way too long on this.
		</p>
		<p>
			The password for the Redis connection had a <code>+</code> in it. PHP's session handler
			was URL-decoding the connection string, turning the <code>+</code> into a space. Redis
			got the wrong password, sessions never got stored, and Nextcloud just showed you the
			login page again. Hours of debugging, one character. The fix was switching to file-based
			sessions and keeping Redis for caching only.
		</p>

		<h3>The NFS double-mount</h3>
		<p>
			Paperless needs two directories: one for data, one for media. I pointed both at the
			same NFS volume. Turns out, mounting the same NFS path twice in one pod deadlocks
			kubelet on recent containerd versions. The pod never starts, and scheduling on that node
			breaks. The fix was using separate subpaths on the same export. One line in the
			manifest, but nothing pointed to this at the time and I had to figure it out the
			hard way.
		</p>

		<h2>What's next</h2>
		<p>
			Backups. For real this time. The restic CronJob is written and the B2 bucket is waiting.
			I just need to actually deploy it, which I've been saying for a month now. Beyond that,
			the NUC should stop collecting dust and become a Proxmox Backup Server node. I want to
			do something useful with Home Assistant beyond just having it installed. And Loki for
			log aggregation would be nice, because <code>kubectl logs</code> and optimism is not a
			monitoring strategy.
		</p>
		<p>
			But honestly, the setup is in a good place. Adding new services is easy, everything is
			in git, and I haven't had to do the "take everything down and restart in the right
			order" dance in a long time. The homelab is fun again, which was the whole point.
		</p>
	</div>
	<Separator class="my-8" />

	<footer>
		<a
			href="/blog"
			class="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
		>
			&larr; back to blog
		</a>
	</footer>
</article>

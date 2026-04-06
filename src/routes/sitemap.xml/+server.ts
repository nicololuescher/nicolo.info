export const prerender = true;

const pages = [
	{ url: '', priority: '1.0', changefreq: 'monthly' },
	{ url: 'about', priority: '0.8', changefreq: 'monthly' },
	{ url: 'projects', priority: '0.8', changefreq: 'monthly' },
	{ url: 'blog', priority: '0.9', changefreq: 'weekly' },
	{ url: 'blog/homelab', priority: '0.7', changefreq: 'monthly' },
	{ url: 'blog/discord-to-matrix', priority: '0.7', changefreq: 'monthly' }
];

export function GET() {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>https://nicolo.swiss/${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}

import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listingSlug } from "@/lib/listings";

const BASE_URL = "https://palmbeachrentalpros.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString();
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: now, changefreq: "weekly", priority: "1.0" },
        ];
        const { sparkSitemapListings } = await import("@/lib/spark.server");
        const listings = await sparkSitemapListings();
        if (listings === null) return new Response("Listings feed unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
        entries.push(...listings.map((listing) => ({ path: `/listings/${listingSlug(listing)}`, changefreq: "daily" as const, priority: "0.7" })));

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});

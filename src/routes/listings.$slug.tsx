import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import { getListing } from "@/lib/api/listings.functions";
import { IDX_DISCLAIMER, listingIdFromSlug, listingSlug } from "@/lib/listings";

const BASE_URL = "https://palmbeachrentalpros.com";

export const Route = createFileRoute("/listings/$slug")({
  loader: async ({ params }) => {
    const id = listingIdFromSlug(params.slug);
    if (!id) return null;
    const listing = await getListing({ data: { id } }).catch(() => null);
    if (listing && listingSlug(listing) !== params.slug) throw redirect({ to: "/listings/$slug", params: { slug: listingSlug(listing) }, statusCode: 301 });
    return listing;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Listing unavailable | Palm Beach Rental Pros" }, { name: "robots", content: "noindex" }] };
    const facts = [loaderData.beds && `${loaderData.beds} beds`, loaderData.baths && `${loaderData.baths} baths`, loaderData.sqft && `${loaderData.sqft.toLocaleString()} sq ft`].filter(Boolean).join(", ");
    const title = `${loaderData.address}, ${loaderData.city} | Palm Beach Rental Pros`;
    const description = `${loaderData.address}, ${loaderData.city}${facts ? `: ${facts}` : ""}. Listed at $${loaderData.price.toLocaleString()}. Contact Paul Schafranick for current availability.`;
    const url = `${BASE_URL}/listings/${listingSlug(loaderData)}`;
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: url }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "RealEstateListing", name: loaderData.address, url,
        description: loaderData.remarks?.slice(0, 500) || description, image: loaderData.photos,
        offers: { "@type": "Offer", price: loaderData.price, priceCurrency: "USD" },
        about: { "@type": "Residence", address: { "@type": "PostalAddress", streetAddress: loaderData.address, addressLocality: loaderData.city, addressRegion: loaderData.state, postalCode: loaderData.zip, addressCountry: "US" }, numberOfBedrooms: loaderData.beds, numberOfBathroomsTotal: loaderData.baths },
      }) }],
    };
  },
  component: ListingPage,
});

function ListingPage() {
  const l = Route.useLoaderData();
  if (!l) return <div className="min-h-screen bg-background text-foreground font-body"><main className="max-w-5xl mx-auto px-4 py-8"><div className="rounded-xl border border-gold/20 bg-card p-6"><h1 className="font-display text-xl font-semibold mb-2">This listing isn&apos;t available right now</h1><p className="text-sm text-muted-foreground mb-4">Call Paul and he&apos;ll find you similar options.</p><a href="tel:+15612557285" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy"><Phone className="h-4 w-4"/> Call Paul (561) 255-7285</a></div></main></div>;
  const where = `${l.address}, ${l.city}${l.mlsNumber ? ` (MLS# ${l.mlsNumber})` : ""}`;
  const smsBody = encodeURIComponent(`Hi Paul, I'm interested in ${where}. Is it still available?`);
  return <div className="min-h-screen bg-background text-foreground font-body"><div className="w-full bg-navy border-b border-white/10"><p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">VantaSure Realty</p></div><main className="max-w-5xl mx-auto px-4 sm:px-6 py-8"><Link to="/search" search={{ mode: "rent" }} className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light mb-6"><ArrowLeft className="h-4 w-4"/> Back to search</Link><article><p className="text-3xl font-bold text-gold">${l.price.toLocaleString()}</p><h1 className="font-display text-2xl font-bold mt-1">{l.address}</h1><p className="text-muted-foreground">{[l.city,l.state,l.zip].filter(Boolean).join(", ")}</p><p className="mt-2 text-sm">{l.beds ? `${l.beds} beds` : ""}{l.baths ? ` · ${l.baths} baths` : ""}{l.sqft ? ` · ${l.sqft.toLocaleString()} sq ft` : ""}{l.mlsNumber ? ` · MLS# ${l.mlsNumber}` : ""}</p><div className="flex flex-wrap gap-3 my-6"><a href="tel:+15612557285" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy hover:bg-gold-light"><Phone className="h-4 w-4"/> Call (561) 255-7285</a><a href={`sms:+15612557285?&body=${smsBody}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold text-gold hover:bg-gold/10"><MessageSquare className="h-4 w-4"/> Text (561) 255-7285</a></div>{l.photos?.length ? <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 mt-2">{l.photos.slice(0,9).map((src,i)=><img key={src} src={src} alt={`${l.address} photo ${i+1}`} loading={i ? "lazy" : "eager"} className={`w-full object-cover rounded ${i===0 ? "col-span-2 sm:col-span-3 h-72 sm:h-96" : "h-32 sm:h-40"}`}/>)}</div> : null}{l.remarks&&<p className="text-sm leading-relaxed whitespace-pre-line">{l.remarks}</p>}{l.listingBrokerage&&<p className="mt-6 text-xs text-muted-foreground">Listing courtesy of {l.listingBrokerage}{l.listingAgent ? ` (${l.listingAgent})` : ""}.</p>}<p className="mt-2 text-[11px] text-muted-foreground">{IDX_DISCLAIMER}</p></article></main></div>;
}

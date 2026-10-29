import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import { IDX_DISCLAIMER } from "@/lib/listings";
import { getListing } from "@/lib/api/listings.functions";

export const Route = createFileRoute("/listing/$id")({
  head: () => ({ meta: [{ title: "Listing | Palm Beach Rental Pros" }] }),
  component: ListingPage,
});

function ListingPage() {
  const { id } = Route.useParams();
  const { data: l, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListing({ data: { id } }).catch(() => null),
  });

  const where = l ? `${l.address}, ${l.city}${l.mlsNumber ? ` (MLS# ${l.mlsNumber})` : ""}` : "";
  const smsBody = encodeURIComponent(`Hi Paul, I'm interested in ${where}. Is it still available?`);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="w-full bg-navy border-b border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
          VantaSure Realty
        </p>
      </div>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/search" search={{ mode: "rent" }} className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to search
        </Link>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !l ? (
          <div className="rounded-xl border border-gold/20 bg-card p-6">
            <h1 className="font-display text-xl font-semibold mb-2">This listing isn&apos;t available right now</h1>
            <p className="text-sm text-muted-foreground mb-4">Call Paul and he&apos;ll find you similar options.</p>
            <a href="tel:5612557285" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy">
              <Phone className="h-4 w-4" /> Call Paul (561) 255-7285
            </a>
          </div>
        ) : (
          <article>
            <p className="text-3xl font-bold text-gold">${l.price.toLocaleString()}</p>
            <h1 className="font-display text-2xl font-bold mt-1">{l.address}</h1>
            <p className="text-muted-foreground">{[l.city, l.state, l.zip].filter(Boolean).join(", ")}</p>
            <p className="mt-2 text-sm">
              {l.beds ? `${l.beds} beds` : ""}{l.baths ? ` · ${l.baths} baths` : ""}{l.sqft ? ` · ${l.sqft.toLocaleString()} sq ft` : ""}
              {l.mlsNumber ? ` · MLS# ${l.mlsNumber}` : ""}
            </p>
            <div className="flex flex-wrap gap-3 my-6">
              <a href="tel:5612557285" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy hover:bg-gold-light">
                <Phone className="h-4 w-4" /> Call about this one
              </a>
              <a href={`sms:5612557285?&body=${smsBody}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
                <MessageSquare className="h-4 w-4" /> Text about this one
              </a>
            </div>
            {l.photos && l.photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 mt-2">
                {l.photos.slice(0, 9).map((src: string, i: number) => (
                  <img key={src} src={src} alt={`${l.address} photo ${i + 1}`} loading={i ? "lazy" : "eager"}
                    className={`w-full object-cover rounded ${i === 0 ? "col-span-2 sm:col-span-3 h-72 sm:h-96" : "h-32 sm:h-40"}`} />
                ))}
              </div>
            )}
            {l.remarks && <p className="text-sm leading-relaxed whitespace-pre-line">{l.remarks}</p>}
            {l.listingBrokerage && (
              <p className="mt-6 text-xs text-muted-foreground">
                Listing courtesy of {l.listingBrokerage}{l.listingAgent ? ` (${l.listingAgent})` : ""}.
              </p>
            )}
            <p className="mt-2 text-[11px] text-muted-foreground">{IDX_DISCLAIMER}</p>
          </article>
        )}
      </main>
    </div>
  );
}

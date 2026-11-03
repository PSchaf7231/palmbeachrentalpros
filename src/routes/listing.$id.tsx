import { createFileRoute, redirect } from "@tanstack/react-router";
import { getListing } from "@/lib/api/listings.functions";
import { listingSlug } from "@/lib/listings";

// Preserve bookmarks and links created before address-based URLs were added.
export const Route = createFileRoute("/listing/$id")({
  loader: async ({ params }) => {
    const listing = await getListing({ data: { id: params.id } }).catch(() => null);
    if (listing) throw redirect({ to: "/listings/$slug", params: { slug: listingSlug(listing) }, statusCode: 301 });
    throw redirect({ to: "/search", search: { mode: "rent" }, statusCode: 302 });
  },
});

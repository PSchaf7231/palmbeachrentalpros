import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const searchInput = z.object({
  mode: z.enum(["rent", "buy"]),
  area: z.string().max(60).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  beds: z.number().optional(),
  term: z.enum(["any", "annual", "seasonal"]).optional(),
  page: z.number().int().min(1).max(50).optional(),
});

export const searchListings = createServerFn({ method: "GET" })
  .validator(searchInput)
  .handler(async ({ data }) => {
    const { sparkSearch } = await import("../spark.server");
    return sparkSearch(data);
  });

export const getListing = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1).max(40) }))
  .handler(async ({ data }) => {
    const { sparkListing } = await import("../spark.server");
    return sparkListing(data.id);
  });

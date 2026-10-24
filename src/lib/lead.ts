import { z } from "zod";

// Shared between the browser form and the /api/lead server route.
export const leadSchema = z.object({
  formType: z.enum(["request", "alerts"]),
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(7, "Phone is required").max(40),
  email: z.string().trim().email("Valid email is required").max(200),
  // Optional preferences
  message: z.string().trim().max(2000).optional().default(""),
  priceMin: z.string().trim().max(40).optional().default(""),
  priceMax: z.string().trim().max(40).optional().default(""),
  beds: z.string().trim().max(40).optional().default(""),
  areas: z.string().trim().max(300).optional().default(""),
  moveIn: z.string().trim().max(40).optional().default(""),
  // Consent (optional — not a condition of service)
  consent: z.boolean().optional().default(false),
  consentText: z.string().max(2000).optional().default(""),
  // Tracking
  source: z.string().trim().max(80).optional().default("website"),
  pageUrl: z.string().trim().max(500).optional().default(""),
  referrer: z.string().trim().max(500).optional().default(""),
  utm: z.record(z.string().max(200)).optional().default({}),
  // Honeypot: real users never fill this in.
  website: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

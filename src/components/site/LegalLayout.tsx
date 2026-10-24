import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "./SiteFooter";
import { StickyCallBar } from "./StickyCallBar";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body pb-20 md:pb-0">
      <div className="w-full bg-navy border-b border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
          VantaSure Realty
        </p>
      </div>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="text-xs text-gold hover:text-gold-light">
          &larr; Palm Beach Rental Pros
        </Link>
        {/* DRAFT banner: remove after broker/attorney review. */}
        <p className="mt-4 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-foreground/90">
          <strong>DRAFT — pending broker/attorney review.</strong> This page is a standard template
          and is not legal advice. It must be reviewed and approved before the site launches.
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-6 mb-1">{title}</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated: {updated}</p>
        <div className="space-y-6 text-sm text-foreground/80 leading-relaxed [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-gold [&_a]:underline">
          {children}
        </div>
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}

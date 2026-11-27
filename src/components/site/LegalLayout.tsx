import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="w-full bg-navy border-b border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white">
          VantaSure Realty
        </p>
      </div>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="text-sm text-gold hover:text-gold-light">
          Palm Beach Rental Pros
        </Link>
        <h1 className="font-display text-3xl font-bold mt-4 mb-2">{title}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-foreground/90">{children}</div>
      </main>
    </div>
  );
}

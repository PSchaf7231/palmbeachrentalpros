import { Phone, MessageSquareText } from "lucide-react";
import { AGENT_PHONE_DISPLAY, AGENT_PHONE_TEL } from "@/lib/site";

// Mobile-only sticky bottom bar (hidden from md and up).
export function StickyCallBar() {
  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-navy/95 backdrop-blur-sm px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      role="navigation"
      aria-label="Contact Paul"
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <a
          href={`tel:${AGENT_PHONE_TEL}`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-3 py-2.5 text-sm font-bold text-navy"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Paul {AGENT_PHONE_DISPLAY}
        </a>
        <a
          href="/#request"
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gold/50 px-3 py-2.5 text-sm font-semibold text-gold"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Request
        </a>
      </div>
    </div>
  );
}

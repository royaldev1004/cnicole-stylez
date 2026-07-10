import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Video, MapPin, X } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { packageGroups } from "@/lib/packages";

type BookingSearch = { package?: string };

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    package: typeof search.package === "string" ? search.package : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Consultation — CNicole Stylez" },
      { name: "description", content: "Schedule an in-person or virtual styling consultation with Cheryl Nicole." },
      { property: "og:title", content: "Book a Consultation — CNicole Stylez" },
      { property: "og:description", content: "In-person or virtual styling consultations." },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: Booking,
});

const allPackages = packageGroups.flatMap((g) => g.packages);

function Booking() {
  const { package: selectedSlug } = Route.useSearch();
  const [mode, setMode] = useState<"in-person" | "virtual">("in-person");
  const selected = selectedSlug ? allPackages.find((p) => p.slug === selectedSlug) : undefined;

  // TODO: Update these URLs with Cheryl's real Calendly event links
  // once confirmed — currently using placeholder URLs
  const CALENDLY_IN_PERSON_URL = "https://calendly.com/cnicolemccain/30min";
  const CALENDLY_VIRTUAL_URL = "https://calendly.com/cnicolemccain/new-meeting";

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Booking"
        title={<>Reserve your <span className="script text-gold text-6xl md:text-8xl">session</span></>}
        subtitle="Ready to get started? Choose a time that works for you below."
        centered
        className="pb-12"
      />

      <section className="container-editorial pb-24">
        <div className="max-w-3xl mx-auto">
          {selected && (
            <div className="mb-8 flex items-start justify-between gap-4 p-5 border border-gold-deep bg-secondary rounded-sm">
              <div>
                <p className="eyebrow text-[0.65rem]">Selected Package</p>
                <p className="mt-2 font-display text-xl">{selected.name}</p>
                <p className="mt-1 script text-2xl text-gold">{selected.price}</p>
              </div>
              <Link
                to="/booking"
                search={{}}
                className="shrink-0 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                aria-label="Clear selected package"
              >
                <X size={14} /> Clear
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 gap-0 mb-8 border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => setMode("in-person")}
              className={`flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.2em] transition-colors ${
                mode === "in-person" ? "bg-ink text-cream" : "text-foreground hover:bg-secondary"
              }`}
            >
              <MapPin size={14} /> In-Person
            </button>
            <button
              onClick={() => setMode("virtual")}
              className={`flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.2em] transition-colors ${
                mode === "virtual" ? "bg-ink text-cream" : "text-foreground hover:bg-secondary"
              }`}
            >
              <Video size={14} /> Virtual
            </button>
          </div>

          <InlineWidget
            url={mode === "in-person" ? CALENDLY_IN_PERSON_URL : CALENDLY_VIRTUAL_URL}
            prefill={{
              customAnswers: {
                a1: selected?.name ?? "",
              },
            }}
            styles={{ height: "660px", minWidth: "320px" }}
          />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Questions before you book? <a href="/contact" className="text-gold border-b border-gold-deep">Contact Cheryl</a>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

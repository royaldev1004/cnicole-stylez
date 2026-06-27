import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Palette, ClipboardList, Footprints, Lightbulb, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/fashion-shows")({
  head: () => ({
    meta: [
      { title: "Fashion Show Production & Styling — CNicole Stylez" },
      { name: "description", content: "Creative direction, backstage management, and runway production support for designers, boutiques and event organizers." },
      { property: "og:title", content: "Fashion Show Production & Styling" },
      { property: "og:description", content: "Fashion styling, backstage management and creative direction by CNicole Stylez." },
      { property: "og:url", content: "/fashion-shows" },
    ],
    links: [{ rel: "canonical", href: "/fashion-shows" }],
  }),
  component: FashionShows,
});

const categories = [
  {
    icon: Palette,
    title: "Creative & Styling Direction",
    items: [
      "Develop overall fashion show vision and theme",
      "Coordinate model looks and outfit styling",
      "Accessorizing and wardrobe curation",
      "Hair and makeup coordination",
    ],
  },
  {
    icon: ClipboardList,
    title: "Backstage Production Management",
    items: [
      "Organize and manage backstage operations",
      "Create model lineup and outfit changes",
      "Coordinate dressers, assistants and vendors",
      "Ensure smooth transitions between runway segments",
    ],
  },
  {
    icon: Footprints,
    title: "Runway Coordination",
    items: [
      "Model walk order and cue management",
      "Timing and show flow execution",
      "Designer coordination",
      "Last-minute styling adjustments",
    ],
  },
  {
    icon: Lightbulb,
    title: "Fashion Show Consulting",
    items: [
      "Event planning support",
      "Vendor recommendations",
      "Casting assistance",
      "Run-of-show development",
    ],
  },
  {
    icon: PackageCheck,
    title: "Day-of Event Support",
    items: [
      "Wardrobe steaming and preparation",
      "Model check-in and coordination",
      "Styling touch-ups",
      "Quality control before runway appearances",
    ],
  },
];

function FashionShows() {
  return (
    <SiteLayout>
      <section className="container-editorial pt-20 md:pt-28 pb-16">
        <p className="eyebrow">Production Services</p>
        <h1 className="mt-4 text-5xl md:text-6xl max-w-3xl">
          Fashion Show <span className="script text-gold text-6xl md:text-7xl">Styling</span> & Production Services
        </h1>
        <p className="mt-6 text-lg italic text-gold">
          Fashion Styling · Backstage Management · Creative Direction
        </p>
        <p className="mt-8 max-w-2xl text-muted-foreground leading-relaxed">
          I provide comprehensive fashion show support from concept to runway — ensuring a polished,
          professional, and seamless experience for designers, models, and event organizers.
        </p>

        {/* Runway gallery placeholders */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <PhotoPlaceholder aspect="aspect-[3/4]" label="Runway 01" sublabel="Backstage moment" />
          <PhotoPlaceholder aspect="aspect-[3/4]" label="Runway 02" sublabel="Editorial look" />
          <PhotoPlaceholder aspect="aspect-[3/4]" label="Runway 03" sublabel="Designer collaboration" />
          <PhotoPlaceholder aspect="aspect-[3/4]" label="Runway 04" sublabel="Show production" />
        </div>
      </section>

      <section className="container-editorial pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <div key={c.title} className="p-8 bg-card border border-border hover:border-gold-deep transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-secondary">
                  <c.icon className="text-gold" size={22} strokeWidth={1.4} />
                </div>
                <h2 className="text-xl">{c.title}</h2>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground list-none pl-0">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold mt-1 leading-none">·</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-ink text-cream">
        <div className="container-editorial text-center">
          <p className="eyebrow-light">Investment</p>
          <p className="mt-6 font-display text-3xl md:text-4xl">
            Fashion Show Production & Styling
          </p>
          <p className="mt-4 script text-5xl md:text-6xl text-gold">Starting at $750</p>
        </div>
      </section>

      <section className="container-editorial py-20">
        <figure className="max-w-3xl mx-auto text-center">
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed">
            "CNicole Stylez specializes in bringing fashion visions to life through expert styling,
            backstage management, and runway production support. Whether you're hosting a boutique
            fashion showcase, charity runway event, or large-scale production, I help ensure every
            detail is executed with <span className="script text-gold text-4xl md:text-5xl">professionalism, creativity, and style.</span>"
          </blockquote>
        </figure>

        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-xs tracking-[0.25em] uppercase rounded-sm bg-ink text-cream"
          >
            Inquire About Your Event
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

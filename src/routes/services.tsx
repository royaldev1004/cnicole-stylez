import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { packageGroups } from "@/lib/packages";
import { Check, Star } from "lucide-react";
import svcMoodboard from "@/assets/svc-moodboard.png";
import svcCloset from "@/assets/svc-closet.png";
import svcShoppingBags from "@/assets/svc-shopping-bags.png";
import svcSuitFlatlay from "@/assets/svc-suit-flatlay.png";
import svcBlazerMirror from "@/assets/svc-blazer-mirror.png";
import svcEveningGown from "@/assets/svc-evening-gown.png";
import svcOfficeDesk from "@/assets/svc-office-desk.png";
import svcBackstageRack from "@/assets/svc-backstage-rack.png";

const packageImages: Record<string, string> = {
  "confidence-discovery":     svcMoodboard,
  "wardrobe-revival":         svcCloset,
  "signature-shopping":       svcShoppingBags,
  "executive-image":          svcSuitFlatlay,
  "complete-transformation":  svcBlazerMirror,
  "wedding-special-occasion": svcEveningGown,
  "executive-workshops":      svcOfficeDesk,
  "confidence-collective":    svcBackstageRack,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Packages — CNicole Stylez" },
      { name: "description", content: "Personal styling, executive image, wardrobe transformation, event styling and VIP membership packages with CNicole Stylez." },
      { property: "og:title", content: "Services & Packages — CNicole Stylez" },
      { property: "og:description", content: "Personal styling and image consulting packages." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services & Investment"
        title={<>Curated <span className="script text-gold text-6xl md:text-8xl">Packages</span></>}
        subtitle="Every experience is designed around your goals, lifestyle, and the individual you're becoming. Choose the package that fits where you are — and where you're headed."
        centered
        className="pb-16"
      />

      {packageGroups.map((group) => (
        <section key={group.title} className="py-12">
          <div className="container-editorial">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl">{group.title}</h2>
              <div className="flex-1 gold-rule" />
            </div>

            <div className={`grid gap-6 ${group.packages.length >= 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}>
              {group.packages.map((p) => (
                <article
                  key={p.slug}
                  className={`relative flex flex-col p-8 border bg-card transition-all duration-300 hover:-translate-y-1 ${
                    p.highlight ? "border-gold-deep shadow-[0_20px_60px_-30px_rgba(201,162,75,0.6)]" : "border-border hover:border-gold-deep"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1 px-3 py-1 text-[0.65rem] tracking-[0.25em] uppercase rounded-sm bg-ink text-gold-soft">
                      <Star size={10} className="fill-current" /> Signature · Most Popular
                    </span>
                  )}
                  <img
                    src={packageImages[p.slug]}
                    alt={p.name}
                    className="w-full aspect-[16/9] object-cover mb-6"
                  />
                  <h3 className="text-2xl pr-4">{p.name}</h3>
                  <p className="mt-3 script text-3xl text-gold">{p.price}</p>
                  <p className="mt-4 text-sm italic text-muted-foreground leading-relaxed">{p.tagline}</p>

                  {p.includes && (
                    <div className="mt-6">
                      <p className="eyebrow text-[0.65rem] mb-3">Includes</p>
                      <ul className="space-y-2">
                        {p.includes.map((i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <Check size={14} className="text-gold mt-1 shrink-0" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.perfectFor && (
                    <div className="mt-5">
                      <p className="eyebrow text-[0.65rem] mb-2">Perfect for</p>
                      <p className="text-sm text-muted-foreground">{p.perfectFor.join(" · ")}</p>
                    </div>
                  )}

                  {p.outcome && (
                    <p className="mt-5 p-4 border-l-2 border-gold-deep bg-secondary text-sm italic">
                      {p.outcome}
                    </p>
                  )}

                  <div className="mt-auto pt-8">
                    <Link
                      to="/booking"
                      search={{ package: p.slug }}
                      className="inline-flex w-full justify-center items-center px-6 py-3 text-xs tracking-[0.25em] uppercase rounded-sm transition-colors bg-ink text-cream"
                    >
                      Book This Package
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 text-center container-editorial">
        <p className="script text-gold text-4xl">Not sure where to start?</p>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Begin with The Confidence Discovery Session and we'll design your next chapter together.
        </p>
        <Link
          to="/booking"
          className="mt-8 inline-flex items-center px-8 py-4 text-xs tracking-[0.25em] uppercase rounded-sm bg-ink text-cream"
        >
          Book a Consultation
        </Link>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Sparkles, Shirt, Crown, Wand2 } from "lucide-react";
import logoUrl from "@/assets/cnicole-logo.png";
import heroImageUrl from "@/assets/hero-image.png";
import cNicoleImageUrl from '@/assets/cnicole-image.png';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CNicole Stylez — Style with Purpose. Lead with Confidence." },
      { name: "description", content: "Personalized styling, image consulting, wardrobe strategy and fashion production support by Cheryl Nicole." },
      { property: "og:title", content: "CNicole Stylez — Style with Purpose." },
      { property: "og:description", content: "Personalized styling, image consulting and wardrobe strategy by Cheryl Nicole." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  { icon: Sparkles, name: "Personal Styling", desc: "Style assessments and personalized strategy.", to: "/services" },
  { icon: Shirt, name: "Wardrobe Transformation", desc: "Closet edits and curated outfit planning.", to: "/services" },
  { icon: Crown, name: "Executive Image", desc: "Elevated presence for leaders and professionals.", to: "/services" },
  { icon: Wand2, name: "Fashion Show Production", desc: "Creative direction and backstage management.", to: "/fashion-shows" },
] as const;

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_oklab,var(--color-gold-soft)_40%,transparent)] via-background to-background" />
        <div className="container-editorial pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <p className="eyebrow">CNicole Stylez · Est. 2026</p>
            <h1 className="mt-6 text-5xl md:text-7xl leading-[1.05]">
              Style with <span className="script text-gold text-6xl md:text-8xl">Purpose.</span>
              <br />
              Lead with <span className="script text-gold text-6xl md:text-8xl">Confidence.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Elevating image. Building confidence. Through personalized styling, image consulting,
              wardrobe strategy and fashion production support — we help individuals and organizations
              create lasting impressions with authenticity and purpose.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 px-7 py-4 text-xs tracking-[0.25em] uppercase rounded-sm transition-colors bg-ink text-cream"
              >
                Book a Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="text-xs tracking-[0.25em] uppercase border-b border-gold-deep pb-1 text-gold hover:opacity-70">
                View Packages
              </Link>
            </div>
          </div>

          <div className="relative fade-up">
            <div className="absolute -inset-4 rounded-sm bg-gradient-to-br from-[var(--color-gold-soft)] to-transparent blur-2xl opacity-60" />
            <div className="relative mx-auto max-w-md">
            <img
                src={heroImageUrl}
                alt="CNicole Stylez — curated fashion flat lay"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <img
                src={logoUrl}
                alt="CNicole Stylez monogram"
                className="absolute -bottom-6 -right-6 w-28 md:w-36 rounded-full shadow-[0_20px_60px_-20px_rgba(201,162,75,0.6)] bg-cream p-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 border-y border-border">
        <div className="container-editorial max-w-3xl text-center">
          <p className="eyebrow">Our Mission</p>
          <p className="mt-6 font-display text-2xl md:text-3xl leading-relaxed text-foreground">
            To empower individuals through style, confidence, and image enhancement — so they can walk
            into every room feeling <span className="italic text-gold">polished, authentic, and self-assured.</span>
          </p>
          <div className="mt-10 mx-auto w-32 gold-rule" />
        </div>
      </section>

      {/* SERVICES SNAPSHOT */}
      <section className="py-24">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow">What We Offer</p>
              <h2 className="mt-3 text-4xl md:text-5xl">A signature styling experience.</h2>
            </div>
            <Link to="/services" className="text-xs tracking-[0.25em] uppercase text-gold border-b border-gold-deep pb-1 self-start md:self-auto">
              All Packages →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.name}
                to={s.to}
                className="group relative p-8 bg-card border border-border hover:border-gold-deep transition-all duration-300 hover:-translate-y-1"
              >
                <s.icon className="text-gold" size={28} strokeWidth={1.2} />
                <h3 className="mt-6 text-xl">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-gold group-hover:translate-x-1 transition-transform">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER TEASER */}
      <section className="py-24 bg-secondary">
        <div className="container-editorial grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <img src={cNicoleImageUrl}
                alt="Cheryl Nicole — founder"
                className="w-full aspect-[4/5] object-cover rounded-sm"
            />
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Meet the Founder</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Cheryl <span className="script text-gold">Nicole</span></h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Style is more than what you wear — it's how you introduce yourself before saying a single
              word. Cheryl Nicole helps clients align their outward appearance with their personal goals,
              professional aspirations, and authentic identity.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold border-b border-gold-deep pb-1">
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="container-editorial text-center max-w-2xl">
          <p className="script text-gold text-4xl md:text-5xl">Because confidence</p>
          <h2 className="text-4xl md:text-5xl mt-2">never goes out of style.</h2>
          <Link
            to="/booking"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.25em] uppercase rounded-sm bg-ink text-cream"
          >
            Begin Your Transformation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

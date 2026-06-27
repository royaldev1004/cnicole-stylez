import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Instagram, Mail, Phone } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoUrl from "@/assets/cnicole-logo.png";
import { siteConfig } from "@/lib/config";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fashion-shows", label: "Fashion Shows" },
  { to: "/booking", label: "Booking" },
  { to: "/questionnaire", label: "Questionnaire" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background/60 backdrop-blur-sm"
        }`}
      >
        <div className="container-editorial flex items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoUrl} alt={siteConfig.name} className="h-12 w-12 rounded-full object-cover" />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-lg tracking-wide">C Nicole <span className="script text-gold text-xl">Stylez</span></span>
              <span className="eyebrow text-[0.6rem]">{siteConfig.tagline}</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors data-[status=active]:text-gold data-[status=active]:font-medium"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/booking"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.2em] uppercase bg-ink text-cream hover:bg-gold-deep transition-colors rounded-sm"
            >
              Book Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container-editorial flex flex-col py-4">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="py-3 text-sm tracking-wide border-b border-border/50 last:border-0 hover:text-gold"
                >
                  {n.label}
                </Link>
              ))}
              <Link to="/booking" className="mt-4 inline-flex justify-center px-5 py-3 text-xs tracking-[0.2em] uppercase bg-ink text-cream rounded-sm">
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border bg-ink text-cream">
        <div className="container-editorial py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt={siteConfig.name} className="h-14 w-14 rounded-full object-cover bg-cream" />
              <div>
                <div className="font-display text-2xl">C Nicole <span className="script text-gold text-3xl">Stylez</span></div>
                <div className="eyebrow-light text-[0.65rem]">{siteConfig.tagline}</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Elevating image. Building confidence. Through personalized styling, image consulting, wardrobe strategy, and fashion production support.
            </p>
            <p className="mt-6 script text-2xl text-gold">Style with Purpose. Lead with Confidence.</p>
          </div>

          <div>
            <h4 className="eyebrow-light mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-gold transition-colors">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow-light mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <a href={siteConfig.phoneHref} className="hover:text-gold">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={14} className="text-gold" />
                <a href={siteConfig.instagramUrl} className="hover:text-gold">{siteConfig.instagram}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="container-editorial py-6 text-xs text-cream/60 flex flex-col sm:flex-row justify-between gap-2">
            <span>© {siteConfig.name}, LLC {siteConfig.copyrightYear}.</span>
            <span>{siteConfig.website}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { useState, type FormEvent } from "react";
import { Check, Mail, Phone, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { sendFormEmail } from "@/lib/email";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CNicole Stylez" },
      { name: "description", content: "Get in touch with CNicole Stylez for personal styling, image consulting and fashion production inquiries." },
      { property: "og:title", content: "Contact — CNicole Stylez" },
      { property: "og:description", content: "Get in touch with CNicole Stylez." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await sendFormEmail({
        data: {
          type: "contact",
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: (fd.get("phone") as string) ?? "",
          message: fd.get("message") as string,
        },
      });
      setSent(true);
    } catch {
      setError("Something went wrong — please try emailing Connect@cnicolestylez.com directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Let's Connect"
        title={<>Get in <span className="script text-gold text-6xl md:text-8xl">touch.</span></>}
        centered
        className="pb-12"
      />

      <section className="container-editorial pb-20 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl mb-6">Studio Details</h2>
          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 grid place-items-center bg-secondary rounded-full"><Mail size={16} className="text-gold" /></span>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 grid place-items-center bg-secondary rounded-full"><Phone size={16} className="text-gold" /></span>
              <a href={siteConfig.phoneHref} className="hover:text-gold">{siteConfig.phone}</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 grid place-items-center bg-secondary rounded-full"><Instagram size={16} className="text-gold" /></span>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{siteConfig.instagram}</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 grid place-items-center bg-secondary rounded-full"><TikTokIcon size={16} className="text-gold" /></span>
              <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{siteConfig.tiktok}</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 grid place-items-center bg-secondary rounded-full text-gold text-xs">→</span>
              <a href={siteConfig.websiteUrl} className="hover:text-gold">{siteConfig.website}</a>
            </li>
          </ul>

          <div className="mt-10 gold-rule" />
          <p className="mt-10 font-display text-xl leading-relaxed">
            Office hours by appointment only. Most consultations begin with a 15-minute discovery call to
            understand your goals.
          </p>
        </div>

        <div>
          {sent ? (
            <div className="p-10 border border-gold-deep bg-card text-center">
              <Check className="mx-auto text-gold" size={36} />
              <p className="mt-4 font-display text-2xl">Message sent</p>
              <p className="mt-2 text-sm text-muted-foreground">Cheryl will follow up personally within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 p-8 bg-card border border-border">
              <h2 className="text-2xl mb-2">Send a message</h2>
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" />
              <div>
                <label className="eyebrow text-[0.65rem]">Message</label>
                <textarea required name="message" maxLength={1000} rows={5} className="mt-2 w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm" />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 text-xs uppercase tracking-[0.25em] rounded-sm bg-ink text-cream disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container-editorial max-w-3xl text-center">
          <p className="script text-gold text-4xl md:text-5xl">{siteConfig.name}</p>
          <p className="mt-4 font-display text-xl md:text-2xl leading-relaxed text-foreground/85">
            Elevating Image. Building Confidence. Through personalized styling, image consulting,
            wardrobe strategy, and fashion production support, {siteConfig.name} helps individuals and
            organizations create lasting impressions with confidence, authenticity, and purpose.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-[0.65rem]">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="mt-2 w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm"
      />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "Client Styling Questionnaire — CNicole Stylez" },
      { name: "description", content: "Share your sizing, style preferences and goals so Cheryl Nicole can prepare for your styling session." },
      { property: "og:title", content: "Client Styling Questionnaire — CNicole Stylez" },
      { property: "og:description", content: "Pre-appointment styling questionnaire." },
      { property: "og:url", content: "/questionnaire" },
    ],
    links: [{ rel: "canonical", href: "/questionnaire" }],
  }),
  component: Questionnaire,
});

const PANTS_CUTS = ["High Rise","Mid Rise","Low Rise","Flare","Boot Cut","Wide Leg","Straight Leg","Skinny","Slim","Curvy","Cargo"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-10 border-b border-border last:border-0">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl">{title}</h2>
        <div className="flex-1 gold-rule" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", colSpan, required, placeholder, helper }: { label: string; name: string; type?: string; colSpan?: boolean; required?: boolean; placeholder?: string; helper?: string }) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label htmlFor={name} className="eyebrow text-[0.65rem]">{label}{required && " *"}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} maxLength={255}
        className="mt-2 w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm" />
      {helper && <p className="mt-1 text-xs text-muted-foreground italic">{helper}</p>}
    </div>
  );
}

function TextArea({ label, name, rows = 4 }: { label: string; name: string; rows?: number }) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={name} className="eyebrow text-[0.65rem]">{label}</label>
      <textarea id={name} name={name} rows={rows} maxLength={2000}
        className="mt-2 w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm" />
    </div>
  );
}

function Radio({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {options.map((o) => (
        <label key={o} className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="radio" name={name} value={o} className="accent-[var(--color-gold-deep)]" />
          {o}
        </label>
      ))}
    </div>
  );
}

function Questionnaire() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pre-Appointment"
        title={<>Client Styling <span className="script text-gold text-6xl md:text-7xl">Questionnaire</span></>}
        titleClassName="mt-4 text-5xl md:text-6xl"
        subtitle="Help me prepare a styling experience tailored to you. All details remain confidential."
        subtitleClassName="mt-6"
        centered
        className="pb-10"
      />

      <section className="container-editorial pb-24 max-w-4xl">
        {sent ? (
          <div className="p-12 border border-gold-deep bg-card text-center">
            <Check className="mx-auto text-gold" size={48} />
            <p className="mt-6 font-display text-3xl">Thank you!</p>
            <p className="mt-4 max-w-md mx-auto text-muted-foreground">
              Your questionnaire has been received. CNicole Stylez will follow up to confirm your appointment details.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="bg-card border border-border p-8 md:p-12">
            <Section title="Contact Info">
              <Field label="First Name" name="firstName" required />
              <Field label="Last Name" name="lastName" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" required />
            </Section>

            <Section title="Appointment Info">
              <div className="sm:col-span-2">
                <label className="eyebrow text-[0.65rem]">Client Type</label>
                <Radio name="clientType" options={["First time", "Returning"]} />
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">Duration Time</label>
                <select name="duration" className="mt-2 w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm">
                  <option>1 hour</option><option>2 hours</option><option>3 hours</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">Appointment Style</label>
                <Radio name="appointmentStyle" options={["In Person", "Virtual"]} />
              </div>
              <Field label="Location" name="location" colSpan helper="TBD if virtual" />
            </Section>

            <Section title="Client Information">
              <Field label="Shopping For Whom" name="shoppingFor" />
              <Field label="Styling Occasion" name="occasion" />
              <Field label="Gender" name="gender" />
              <Field label="Age" name="age" type="number" />
              <Field label="Height" name="height" />
              <Field label="Weight" name="weight" />
              <Field label="Body Shape" name="bodyShape" />
              <Field label="Extra Coverage Area" name="coverage" />
            </Section>

            <Section title="Client Sizing Information">
              <Field label="Dress Size" name="dressSize" />
              <Field label="Suit Size" name="suitSize" />
              <Field label="Pants Size" name="pantsSize" />
              <Field label="Pants Leg Length" name="legLength" />
              <Field label="Shoe Size" name="shoeSize" />
              <Field label="Waist Size" name="waistSize" />
              <Field label="Shirt Size" name="shirtSize" />
              <Field label="Neck Size / Arm Length" name="neckArm" />
              <Field label="Bra Size" name="braSize" />
            </Section>

            <Section title="Client Styling Information">
              <Field label="Preferred Shirt Style" name="shirtStyle" />
              <Field label="Preferred Shirt Fit" name="shirtFit" />
              <Field label="Preferred Pants Type" name="pantsType" colSpan helper="Slacks / Jeans / Elastic / etc." />
              <div className="sm:col-span-2">
                <label className="eyebrow text-[0.65rem]">Preferred Pants Cut</label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {PANTS_CUTS.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm border border-border px-3 py-2 cursor-pointer hover:border-gold-deep">
                      <input type="checkbox" name="pantsCut" value={c} className="accent-[var(--color-gold-deep)]" />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
              <TextArea label="Bra Style Notes" name="braNotes" rows={2} />
            </Section>

            <Section title="Style Preferences">
              <TextArea label="About Your Style" name="aboutStyle" />
              <TextArea label="Reception to Trends" name="trends" />

              <div className="sm:col-span-2">
                <label className="eyebrow text-[0.65rem]">Favorite Colors / Patterns</label>
                <div className="mt-3 grid sm:grid-cols-3 gap-4">
                  {(["Love","Maybe","Pass"] as const).map((k) => (
                    <div key={k}>
                      <p className="text-xs uppercase tracking-wider text-gold mb-1">{k}</p>
                      <input name={`colors_${k}`} className="w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="eyebrow text-[0.65rem]">Favorite Brands</label>
                <div className="mt-3 grid sm:grid-cols-2 gap-4">
                  {(["Love","Pass"] as const).map((k) => (
                    <div key={k}>
                      <p className="text-xs uppercase tracking-wider text-gold mb-1">{k}</p>
                      <input name={`brands_${k}`} className="w-full p-3 bg-background border border-border focus:border-gold-deep outline-none text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <Field label="Budget Preference" name="budget" colSpan helper="at your discretion" />
            </Section>

            <div className="pt-10">
              <button type="submit" className="w-full py-4 text-xs uppercase tracking-[0.25em] rounded-sm bg-ink text-cream">
                Submit Questionnaire
              </button>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Copyright CNicole's Stylez, LLC 2026
              </p>
            </div>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}

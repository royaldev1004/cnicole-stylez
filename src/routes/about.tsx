import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import cNicoleImageUrl from "@/assets/cnicole-image.png";

const EXPERIENCE = [
  "Tacoma Mall's Personal Stylist",
  "Partnered with AMpowering Pageants organization",
  "Top Model BootCamp organization",
  "Carol Milgard Breast Center",
  "JCPenney retail store",
  "Go Red with American Heart Association",
  "Paint Them All Pink fashion show production with Simon Mall",
  "Boys And Girls Club",
  "Showcase Media Live Magazine",
  "Estée Lauder vendor",
  "Lancôme vendor",
  "MAC Cosmetics vendor",
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Cheryl Nicole — CNicole Stylez" },
      { name: "description", content: "Meet Cheryl Nicole, founder of CNicole Stylez. Personal styling, image consulting and wardrobe transformation rooted in authenticity." },
      { property: "og:title", content: "About Cheryl Nicole — CNicole Stylez" },
      { property: "og:description", content: "Meet the founder of CNicole Stylez." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About the Founder"
        title={<>Meet <span className="script text-gold text-6xl md:text-8xl">C</span> <span className="script text-gold text-6xl md:text-8xl">Nicole</span></>}
        rule
        className="pb-12"
      />

      <section className="container-editorial grid md:grid-cols-5 gap-12 pb-24">
        <div className="md:col-span-2">
          <div className="sticky top-28">
            <img src={cNicoleImageUrl}
                alt="Cheryl Nicole — founder"
                className="w-full aspect-[4/5] object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="md:col-span-3 space-y-6 text-base leading-relaxed text-foreground/85">
          <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
            Style is more than what you wear — it's how you introduce yourself before saying a single word.
          </p>
          <p>
            I'm <strong className="text-gold">Cheryl Nicole</strong>, founder of CNicole Stylez, where I help individuals elevate their confidence
            through intentional style, image consulting, and wardrobe transformation. My passion is helping
            clients align their outward appearance with their personal goals, professional aspirations, and
            authentic identity.
          </p>
          <p>
            Whether you're preparing for a career milestone, building your personal brand, attending a
            special event, stepping into a leadership role, or simply ready to rediscover your confidence,
            I provide a personalized styling experience designed around you. Together, we'll create a
            wardrobe that reflects your lifestyle, enhances your presence, and empowers you to show up
            with confidence in every room you enter.
          </p>
          <p>
            My approach goes beyond fashion trends. I believe style should be practical, refined, and
            authentic — helping you feel comfortable, polished, and confident in every season of life.
          </p>
          <p>
            In addition to personal styling and wardrobe consulting, I offer fashion show styling,
            backstage production support, personal shopping, and image consulting for individuals, brands,
            and organizations seeking a polished and professional experience.
          </p>

          <div>
            <h2 className="font-display text-2xl text-foreground">Experience & Background</h2>
            <div className="mt-3 w-16 gold-rule" />
            <ul className="mt-6 space-y-2 text-sm">
              {EXPERIENCE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-gold mt-1 leading-none">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="mt-14 border-l-2 border-gold-deep pl-8 py-4">
            <blockquote className="script text-4xl md:text-5xl text-gold leading-tight">
              Because confidence never goes out of style.
            </blockquote>
            <figcaption className="mt-4 eyebrow">— C Nicole</figcaption>
          </figure>
        </div>
      </section>
    </SiteLayout>
  );
}

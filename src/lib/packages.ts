export type Package = {
  slug: string;
  name: string;
  price: string;
  tagline: string;
  includes?: string[];
  perfectFor?: string[];
  outcome?: string;
  highlight?: boolean;
};

export type PackageGroup = {
  title: string;
  packages: Package[];
};

export const packageGroups: PackageGroup[] = [
  {
    title: "Personal Styling Packages",
    packages: [
      {
        slug: "confidence-discovery",
        name: "The Confidence Discovery Session",
        price: "$225 / 90 minutes",
        tagline: "Your first step toward discovering a style that reflects your confidence and lifestyle.",
        includes: [
          "Personal style assessment",
          "Lifestyle and wardrobe evaluation",
          "Body shape & color guidance",
          "Image and confidence consultation",
          "Goal-setting session",
          "Personalized Style Confidence Plan",
        ],
        perfectFor: ["First-time styling clients", "Career transitions", "Personal reinvention", "Anyone ready to redefine their style"],
      },
      {
        slug: "wardrobe-revival",
        name: "The Wardrobe Revival",
        price: "Starting at $850",
        tagline: "Transform your closet into a wardrobe that works for your life — not against it.",
        includes: [
          "In-home closet assessment",
          "Wardrobe organization",
          "Keep / Tailor / Donate recommendations",
          "Outfit creation using existing wardrobe",
          "Digital outfit inspiration guide",
          "Shopping recommendations",
        ],
      },
      {
        slug: "signature-shopping",
        name: "The Signature Shopping Experience",
        price: "Starting at $1,500",
        tagline: "A luxury personal shopping experience designed around your goals, budget, and lifestyle.",
        includes: [
          "Pre-shopping consultation",
          "Personalized shopping strategy",
          "Curated shopping itinerary",
          "4-hour shopping session",
          "Wardrobe integration",
          "Styling of new purchases",
          "Digital lookbook",
        ],
        perfectFor: ["Busy professionals", "Executives", "Entrepreneurs", "Special occasions", "Brand photoshoots"],
      },
      {
        slug: "executive-image",
        name: "The Executive Image Experience",
        price: "Starting at $2,500",
        tagline: "Designed for professionals ready to elevate their executive presence.",
        includes: [
          "Personal Brand Consultation",
          "Wardrobe Audit",
          "Personal Shopping",
          "Outfit Styling",
          "Professional Photoshoot Styling",
          "Interview or Speaking Engagement Styling",
          "Signature Color Palette",
          "30-Day Style Support",
        ],
        perfectFor: ["Corporate professionals", "Business owners", "Healthcare leaders", "Public speakers", "Executives"],
      },
      {
        slug: "complete-transformation",
        name: "The Complete Confidence Transformation",
        price: "Starting at $4,500",
        tagline: "This is more than styling — it's a complete image transformation.",
        highlight: true,
        includes: [
          "Comprehensive Image Consultation",
          "Confidence & Personal Brand Coaching",
          "Closet Transformation",
          "Luxury Personal Shopping",
          "Outfit Planning",
          "Event Styling",
          "Photoshoot Styling",
          "Seasonal Wardrobe Planning",
          "Digital Style Lookbook",
          "60 Days of Style Support",
        ],
        outcome: "A polished wardrobe, elevated confidence, and a personal image aligned with your goals.",
      },
    ],
  },
  {
    title: "Event Styling",
    packages: [
      {
        slug: "wedding-special-occasion",
        name: "Wedding & Special Occasion Styling",
        price: "Starting at $350",
        tagline: "Look and feel your best for the moments that matter most.",
        includes: [
          "Wedding guest styling",
          "Bridal party styling",
          "Anniversary celebrations",
          "Gala events",
          "Award ceremonies",
          "Birthday celebrations",
        ],
      },
    ],
  },
  {
    title: "Corporate & Professional",
    packages: [
      {
        slug: "executive-workshops",
        name: "Executive Presence Workshops",
        price: "Custom pricing — Inquire for details.",
        tagline: "Empowering teams and leaders to show up with polish and authority.",
        includes: [
          "Building Confidence Through Style",
          "Dressing for Leadership",
          "Personal Branding",
          "Professional Presence",
          "Style Psychology",
          "First Impressions That Last",
        ],
        perfectFor: [
          "Corporate organizations",
          "Leadership conferences",
          "Healthcare teams",
          "Networking organizations",
          "Professional associations",
        ],
      },
    ],
  },
  {
    title: "VIP Membership",
    packages: [
      {
        slug: "confidence-collective",
        name: "The Confidence Collective",
        price: "$395 / month",
        tagline: "Designed for clients who want ongoing styling support throughout the year.",
        includes: [
          "Monthly styling consultation",
          "Seasonal wardrobe updates",
          "Unlimited outfit advice via text/email (business hours)",
          "Priority booking",
          "Event styling recommendations",
          "Curated shopping links",
          "Exclusive client pricing on select services",
        ],
      },
    ],
  },
];

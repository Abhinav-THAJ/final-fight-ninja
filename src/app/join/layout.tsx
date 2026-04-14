import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Now — Membership Plans",
  description:
    "Join Rogue Ninja Fight Club today. Membership plans from ₹3,500/month. Warrior, Fighter, and Champion tiers available. First class FREE with no commitment. Apply online and our coaches will reach out within 24 hours.",
  alternates: { canonical: "https://rogueninja.in/join" },
  openGraph: {
    title: "Join Rogue Ninja Fight Club | Membership Plans from ₹3,500",
    description:
      "Choose your plan — Warrior, Fighter, or Champion. First class free. No prior experience needed. Apply now and start your combat sports journey in Thiruvananthapuram.",
    url: "https://rogueninja.in/join",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Join RogueNinja FC" }],
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

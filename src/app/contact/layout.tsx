import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Rogue Ninja Fight Club. Find us at Greenfield Stadium, Sasthamangalam, or Perumkadavila in Thiruvananthapuram, Kerala. Call +91 73563 30770 or WhatsApp +91 90485 64432. First class is FREE.",
  alternates: { canonical: "https://rogueninja.in/contact" },
  openGraph: {
    title: "Contact Rogue Ninja Fight Club | 3 Locations in Trivandrum",
    description:
      "3 branches across Thiruvananthapuram. Walk in for a FREE trial class. Call or WhatsApp us today — no prior experience needed.",
    url: "https://rogueninja.in/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact RogueNinja FC" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

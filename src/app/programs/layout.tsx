import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Programs",
  description:
    "Explore Rogue Ninja Fight Club's elite training programs — Kickboxing, Muay Thai, MMA, BJJ, Sparring, and Strength & Conditioning. Pre-fight camp packages available from ₹5,999. Thiruvananthapuram's best combat sports academy.",
  alternates: { canonical: "https://rogueninja.in/programs" },
  openGraph: {
    title: "Elite Training Programs | Rogue Ninja Fight Club",
    description:
      "Kickboxing, Muay Thai, MMA, BJJ & S&C programs. Pre-fight camp packages. Train with national champions in Thiruvananthapuram, Kerala.",
    url: "https://rogueninja.in/programs",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RogueNinja FC Training Programs" }],
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

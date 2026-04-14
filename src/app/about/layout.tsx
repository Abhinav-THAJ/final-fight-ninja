import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Rogue Ninja Fight Club. Built in just 1½ years, we've forged national champions, state champions, and the Overall Trophy at TVM District Kickboxing Championship. Learn our coaching philosophy and history.",
  alternates: { canonical: "https://rogueninja.in/about" },
  openGraph: {
    title: "About Rogue Ninja Fight Club | Our Story & Legacy",
    description:
      "From a single dojo to Kerala's dominant combat sports force. Meet our champion coaches and discover what makes RogueNinja FC the standard.",
    url: "https://rogueninja.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rogue Ninja Fight Club — About Us" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

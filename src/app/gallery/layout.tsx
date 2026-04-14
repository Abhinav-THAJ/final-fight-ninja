import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the action inside Rogue Ninja Fight Club. Browse real training sessions, sparring, championship moments, and the team that forged Kerala's top combat sports athletes.",
  alternates: { canonical: "https://rogueninja.in/gallery" },
  openGraph: {
    title: "Gallery | Rogue Ninja Fight Club",
    description:
      "Every image tells a story of sacrifice and excellence. Real fighters, real training, real results at RogueNinja FC, Thiruvananthapuram.",
    url: "https://rogueninja.in/gallery",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RogueNinja FC Gallery" }],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

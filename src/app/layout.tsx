import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollUpButton from "@/components/ScrollUpButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rogueninja.in"),

  // ── Core ──────────────────────────────────────────────────────────
  title: {
    default: "Rogue Ninja Fight Club | Train Like a Fighter. Live Like a Warrior.",
    template: "%s | Rogue Ninja Fight Club",
  },
  description:
    "Kerala's premier combat sports academy. Kickboxing, Muay Thai, MMA & strength training in Thiruvananthapuram. National champions forged here. First class FREE — join now at rogueninja.in",
  keywords: [
    "Rogue Ninja Fight Club",
    "RogueNinja FC",
    "kickboxing Thiruvananthapuram",
    "MMA Kerala",
    "Muay Thai Trivandrum",
    "martial arts academy Kerala",
    "kickboxing classes Trivandrum",
    "combat sports Kerala",
    "fight training Thiruvananthapuram",
    "self defense classes Trivandrum",
    "BJJ Kerala",
    "boxing gym Trivandrum",
    "strength conditioning Kerala",
    "Greenfield Stadium gym",
    "Sasthamangalam martial arts",
    "Perumkadavila kickboxing",
    "national kickboxing champions India",
    "TVM District Kickboxing Championship",
  ],

  // ── Canonical & Alternates ────────────────────────────────────────
  alternates: {
    canonical: "https://rogueninja.in",
  },

  // ── Authorship ────────────────────────────────────────────────────
  authors: [{ name: "Rogue Ninja Fight Club", url: "https://rogueninja.in" }],
  creator: "Rogue Ninja Fight Club",
  publisher: "Rogue Ninja Fight Club",
  category: "Sports & Fitness",

  // ── Open Graph ────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rogueninja.in",
    siteName: "Rogue Ninja Fight Club",
    title: "Rogue Ninja Fight Club | Train Like a Fighter. Live Like a Warrior.",
    description:
      "Kerala's premier combat sports academy. Kickboxing, Muay Thai, MMA & strength training in Thiruvananthapuram. National champions forged here.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rogue Ninja Fight Club — Train Like a Fighter",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Rogue Ninja Fight Club | Train Like a Fighter. Live Like a Warrior.",
    description:
      "Kerala's premier combat sports academy. Kickboxing, Muay Thai, MMA & strength training in Thiruvananthapuram.",
    images: ["/og-image.png"],
    site: "@rogueninja_fc",
    creator: "@rogueninja_fc",
  },

  // ── Robots ────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add your codes here once available) ─────────────
  verification: {
    google: "add-your-google-search-console-token-here",
  },
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060404",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    name: "Rogue Ninja Fight Club",
    alternateName: "RogueNinja FC",
    url: "https://rogueninja.in",
    logo: "https://rogueninja.in/logo.png",
    image: "https://rogueninja.in/og-image.png",
    description:
      "Kerala's premier combat sports academy specialising in Kickboxing, Muay Thai, MMA and Strength & Conditioning. National champions forged here.",
    telephone: ["+917356330770", "+919048564432"],
    email: "rogueninjafc@gmail.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        opens: "06:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
    location: [
      {
        "@type": "Place",
        name: "Greenfield Stadium Branch",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Travancore International Convention Centre, Greenfield International Stadium",
          addressLocality: "Thiruvananthapuram",
          addressRegion: "Kerala",
          postalCode: "695581",
          addressCountry: "IN",
        },
      },
      {
        "@type": "Place",
        name: "Sasthamangalam Branch",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4th Floor, Sharmees Tower, Sasthamangalam Maruthankuzhi Rd",
          addressLocality: "Thiruvananthapuram",
          addressRegion: "Kerala",
          postalCode: "695010",
          addressCountry: "IN",
        },
      },
      {
        "@type": "Place",
        name: "Perumkadavila Branch",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Venkateshwara Towers, Amaravila - Perumkadavila Rd",
          addressLocality: "Thiruvananthapuram",
          addressRegion: "Kerala",
          postalCode: "695124",
          addressCountry: "IN",
        },
      },
    ],
    sameAs: [
      "https://www.instagram.com/rogueninja_fc",
      "https://www.facebook.com/rogueninja_fc",
    ],
    sport: ["Kickboxing", "Muay Thai", "MMA", "Brazilian Jiu-Jitsu", "Boxing"],
    hasMap: "https://maps.app.goo.gl/cy8rrgsP9P9gbr2s9",
  };

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://rogueninja.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#060404] text-white overflow-x-hidden cursor-none">
        <CustomCursor />
        <PreloaderWrapper />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <ScrollUpButton />
      </body>
    </html>
  );
}

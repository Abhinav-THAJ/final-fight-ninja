import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";

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
  title: "Rogue Ninja Fight Club | Train Like a Fighter. Live Like a Warrior.",
  description:
    "Premium fight training at Rogue Ninja Fight Club. Kickboxing, MMA, BJJ, and elite conditioning. Step into the dojo. Transform your life.",
  keywords: [
    "fight club",
    "martial arts",
    "rogue ninja",
    "kickboxing",
    "MMA",
    "BJJ",
    "muay thai",
    "boxing",
    "self defense",
    "fight training",
    "gym",
  ],
  openGraph: {
    title: "Rogue Ninja Fight Club",
    description: "Train Like a Fighter. Live Like a Warrior.",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rogue Ninja Fight Club",
    description: "Train Like a Fighter. Live Like a Warrior.",
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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-full bg-[#060404] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

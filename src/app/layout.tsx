import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import LayoutContent from "@/components/LayoutContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Home | JUST READ",
    template: "%s | JUST READ",
  },

  description:
    "JUST READ is a modern book discovery platform where users can explore books, discover authors, save favorite books, and follow recent Open Library activity.",

  keywords: [
    "JUST READ",
    "books",
    "authors",
    "book library",
    "digital library",
    "Open Library",
    "book discovery",
    "reading",
  ],

  authors: [
    {
      name: "JUST READ Team",
    },
  ],

  creator: "JUST READ Team",

  publisher: "JUST READ",

  icons: {
    icon: [
      {
        url: "/images/just-read-logo.png",
        type: "image/png",
      },
    ],

    shortcut: "/images/just-read-logo.png",

    apple: "/images/just-read-logo.png",
  },

  openGraph: {
    title: "JUST READ",

    description:
      "Discover books, explore authors, save your favorites, and find your next story with JUST READ.",

    url: siteUrl,

    siteName: "JUST READ",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/images/just-read-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "JUST READ - Discover Your Story",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "JUST READ",

    description:
      "Discover books, explore authors, save your favorites, and find your next story with JUST READ.",

    images: ["/images/just-read-thumbnail.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}

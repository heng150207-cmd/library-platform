import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "Home | JUST READ",
    template: "%s | JUST READ",
  },

  description:
    "JUST READ is a book discovery platform where users can explore books, discover authors, save favorite books, and view recent Open Library activity.",

  keywords: [
    "JUST READ",
    "Books",
    "Authors",
    "Open Library",
    "Reading",
    "Saved Books",
    "Book Discovery",
  ],

  icons: {
    icon: "/images/just-read-logo.png",
    shortcut: "/images/just-read-logo.png",
    apple: "/images/just-read-logo.png",
  },

  openGraph: {
    title: {
      default: "Home | JUST READ",
      template: "%s | JUST READ",
    },

    description:
      "Discover books, explore authors, save your favorites, and find your next story with JUST READ.",

    siteName: "JUST READ",

    type: "website",

    images: [
      {
        url: "/images/just-read-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "JUST READ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "JUST READ",

    description:
      "Discover books, explore authors, save your favorites, and find your next story with JUST READ.",

    images: [
      "/images/just-read-thumbnail.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          bg-[#F7F8FC]
          text-[#20233A]
          transition-colors
          duration-300

          dark:bg-[#11131C]
          dark:text-[#F1F2F7]
        "
      >
        <ThemeProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
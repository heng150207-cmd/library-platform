import type {
  Metadata,
} from "next";

import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import NavbarComponent from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";

export const metadata: Metadata = {
  title: "BookLibrary",
  description:
    "Discover books, authors and stories.",
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
          <NavbarComponent />

          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
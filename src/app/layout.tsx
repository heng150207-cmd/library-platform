import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BlockEcommerce',
    default: 'BlockEcommerce'
  },
  description: "BlockEcommerce is the plateform which manage the products which manage the products with many feature providing saling items and clothes ",
  keywords: "Product, Clothes for men, Clothes for women, Clothes for kids, E-Commerce website.",
  openGraph: {
    title: {
      template: '%s | BlockEcommerce',
      default: 'BlockEcommerce'
    },
    description: 'This is product page which list down many products from the website.',
    images: ['A1_Thumbnail_project.png']
  }
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
      
              <NavbarComponent/>
              {children}
              <FooterComponent/>
      </body>
    </html>
  );
}

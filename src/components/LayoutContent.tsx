"use client";

import { usePathname } from "next/navigation";

import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({
  children,
}: LayoutContentProps) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavbarFooter && (
        <div id="site-navbar">
          <NavbarComponent />
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      {!hideNavbarFooter && (
        <div id="site-footer">
          <FooterComponent />
        </div>
      )}
    </div>
  );
}
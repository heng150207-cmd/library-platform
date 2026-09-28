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
        <NavbarComponent />
      )}

      <main
        className={
          hideNavbarFooter
            ? "flex-1"
            : "flex-1 pt-[76px]"
        }
      >
        {children}
      </main>

      {!hideNavbarFooter && (
        <FooterComponent />
      )}
    </div>
  );
}
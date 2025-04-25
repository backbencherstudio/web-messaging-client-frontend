"use client";
import { usePathname } from "next/navigation";
import NavBar from "./";

export default function ClientOnlyAdminWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBar />}
      {children}
    </>
  );
}

"use client";

import "./globals.css";
import { ThemeProvider } from "./Components/context/ThemeContext";
import NavBar from "./Components/SharedComponent/NavBar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {!isAdminRoute && <NavBar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

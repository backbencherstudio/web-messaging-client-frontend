"use client";

import "./globals.css";
import { ThemeProvider } from "./Components/context/ThemeContext";
import NavBar from "./Components/SharedComponent/NavBar";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            {!isAdminRoute && <NavBar />}
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

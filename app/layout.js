"use client";

import "./globals.css";
import { ThemeProvider } from "./Components/context/ThemeContext";
import NavBar from "./Components/SharedComponent/NavBar";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
                success: {
                  style: {
                    background: "#379d00",
                  },
                },
                error: {
                  style: {
                    background: "#d81a1a",
                  },
                },
                warning: {
                  style: {
                    background: "#ffc500",
                    color: "#333",
                  },
                },
              }}
            />
            {!isAdminRoute && <NavBar />}
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

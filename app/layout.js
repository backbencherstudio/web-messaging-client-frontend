import "./globals.css";
import { ThemeProvider } from "./Components/context/ThemeContext";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "./Components/GoogleAnalytics";
import { Suspense } from "react";
import ClientOnlyAdminWrapper from "./Components/ClientOnlyAdminWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2000,
                style: { background: "#333", color: "#fff" },
                success: { style: { background: "#379d00" } },
                error: { style: { background: "#d81a1a" } },
                warning: { style: { background: "#ffc500", color: "#333" } },
              }}
            />
            <Suspense fallback={null}>
              <ClientOnlyAdminWrapper>{children}</ClientOnlyAdminWrapper>
            </Suspense>
          </ThemeProvider>
        </Providers>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}

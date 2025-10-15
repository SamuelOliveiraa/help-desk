import { Toaster } from "react-hot-toast";
import "./globals.css";

import { CircleCheckBig, CircleX } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen overflow-x-hidden ${lato.className}`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff"
            },
            success: {
              style: {
                background: "#508B26",
                color: "#fff"
              },
              icon: <CircleCheckBig />
            },
            error: {
              style: {
                background: "#ff4d4f", // vermelho
                color: "#fff"
              },
              icon: <CircleX />
            },
            loading: {
              style: {
                background: "#1e1e1e",
                color: "#fff"
              }
            },
            duration: 3000
          }}
        />
      </body>
    </html>
  );
}

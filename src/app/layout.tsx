import { Toaster } from "react-hot-toast";
import "./globals.css";

import { CircleCheckBig, CircleX } from "lucide-react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://help-desk-samuel.vercel.app"),

  title: {
    default: "HelpDesk — Sistema de Gestão de Chamados e Suporte",
    template: "%s | HelpDesk",
  },
  description:
    "Plataforma completa de Help Desk para organizar chamados, gerenciar a disponibilidade de técnicos e otimizar o atendimento ao cliente.",

  keywords: [
    "Help Desk",
    "Gestão de Chamados",
    "Sistema de Suporte",
    "Atendimento ao Cliente",
    "Ticketing System",
    "SaaS Suporte",
  ],

  authors: [
    { name: "Samuel Oliveira", url: "https://help-desk-samuel.vercel.app" },
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://help-desk-samuel.vercel.app",
    siteName: "HelpDesk",
    title: "HelpDesk — Gestão de Chamados e Suporte Simplificada",
    description:
      "Organize solicitações, acompanhe horários da equipe e entregue uma experiência de suporte impecável para seus clientes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview da plataforma HelpDesk",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HelpDesk — Gestão de Chamados e Suporte Simplificada",
    description:
      "Organize solicitações, acompanhe horários da equipe e entregue uma experiência de suporte impecável.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`flex flex-col  ${lato.className}`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "#508B26",
                color: "#fff",
              },
              icon: <CircleCheckBig />,
            },
            error: {
              style: {
                background: "#ff4d4f", // vermelho
                color: "#fff",
              },
              icon: <CircleX />,
            },
            loading: {
              style: {
                background: "#1e1e1e",
                color: "#fff",
              },
            },
            duration: 3000,
          }}
        />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

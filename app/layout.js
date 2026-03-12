import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://enviosmanda.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Envios Manda",
  title: {
    default: "Envios Manda | Envía dinero sin complicaciones",
    template: "%s | Envios Manda",
  },
  description:
    "Envios Manda: remesas sin complicaciones impulsadas por IA, con soporte humano y proceso claro.",
  keywords: [
    "envios manda",
    "enviosmanda",
    "remesas",
    "envío de dinero",
    "remesas con ia",
    "transferencias con ia",
    "enviar dinero por whatsapp",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Envios Manda | Envía dinero sin complicaciones",
    description:
      "Remesas sin complicaciones impulsadas por IA con un proceso rápido, claro y humano.",
    url: "/",
    siteName: "Envios Manda",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Envios Manda | Envía dinero sin complicaciones",
    description:
      "Remesas impulsadas por IA con proceso simple, acompañamiento humano y confirmación en cada envío.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

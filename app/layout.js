import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cerocomplicado.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "CERO COMPLICADO",
  title: {
    default: "CERO COMPLICADO | Envía dinero sin complicaciones",
    template: "%s | CERO COMPLICADO",
  },
  description:
    "CERO COMPLICADO: remesas sin complicaciones impulsadas por IA, con soporte humano y proceso claro.",
  keywords: [
    "cero complicado",
    "cero.complicado",
    "0 complicado",
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
    title: "CERO COMPLICADO | Envía dinero sin complicaciones",
    description:
      "Remesas sin complicaciones impulsadas por IA con un proceso rápido, claro y humano.",
    url: "/",
    siteName: "CERO COMPLICADO",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CERO COMPLICADO | Envía dinero sin complicaciones",
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

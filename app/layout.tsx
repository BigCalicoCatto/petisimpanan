import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://petisimpanan.vercel.app"),
  title: "Peti Simpanan — Mesej Rahsia, Musnah Selepas Dibaca",
  description:
    "Hantar mesej rahsia dengan enkripsi penuh. Tiada log, tiada jejak — mesej musnah serta-merta selepas dibaca.",
  keywords: [
    "mesej rahsia",
    "encrypted message",
    "burn after reading",
    "zero knowledge",
    "peti simpanan",
    "secret message",
    "enkripsi",
  ],
  authors: [{ name: "Peti Simpanan" }],
  openGraph: {
    type: "website",
    url: "https://petisimpanan.vercel.app",
    siteName: "Peti Simpanan",
    title: "Peti Simpanan — Mesej Rahsia, Musnah Selepas Dibaca",
    description:
      "Mesej rahsia anda, dienkripsi sepenuhnya. Musnah selepas dibaca. Tiada siapa tahu.",
    locale: "ms_MY",
  },
  twitter: {
    card: "summary",
    title: "Peti Simpanan",
    description:
      "Mesej rahsia anda, dienkripsi sepenuhnya. Musnah selepas dibaca. Tiada siapa tahu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body style={{ margin: 0, background: "#000" }}>{children}</body>
    </html>
  );
}

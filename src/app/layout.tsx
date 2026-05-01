import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const metadata: Metadata = {
  title: "Paisante Cleaning Services | Pennsylvania",
  description:
    "With over 22 years of experience, Paisante Cleaning Services offers personalized residential and commercial cleaning across Pennsylvania.",
  keywords:
    "cleaning services, Pennsylvania, residential cleaning, commercial cleaning, house cleaning, office cleaning",
  openGraph: {
    title: "Paisante Cleaning Services | Pennsylvania",
    description:
      "Over 22 years of personalized, professional cleaning for homes and businesses across Pennsylvania.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientEffects />
      </body>
      {/* GA4 + Google Ads — one shared gtag.js, both configured from a single init */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </html>
  );
}
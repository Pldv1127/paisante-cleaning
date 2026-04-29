import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";

// Replace AW-XXXXXXXXXX with your Google Ads ID once you have it
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX";

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
      {/* Google Ads tag — loads after page is interactive so it never blocks render */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </html>
  );
}
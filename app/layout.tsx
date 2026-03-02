import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** * SEO BRANDING - This builds the Bibliano Music brand and Robin Thomas's authority.
 */
export const metadata: Metadata = {
  title: "Bibliano Music Vault | Hindi Qurbana & Christian Music | Founder Robin Thomas",
  description: "Founded by Robin Thomas, Bibliano Music is the official vault for Hindi Qurbana and Christian tracks in Hindi, English, and Malayalam for the Malankara Orthodox Syrian Church.",
  keywords: [
    "Bibliano Music", "Robin Thomas", "Hindi Qurbana", "MOSC", 
    "Malankara Orthodox Syrian Church", "Christian Music Hindi", 
    "Malayalam Christian Songs", "English Hymns", "Karaoke"
  ],
  authors: [{ name: "Robin Thomas" }],
  creator: "Robin Thomas",
  publisher: "Bibliano Music",
  verification: {
    google: "JvGWO80QfwQDINnxO6qZH46lKVumUlzSkY6my__hdIE",
  },
  openGraph: {
    title: "Bibliano Music Vault - Founder Robin Thomas",
    description: "Promoting Christian Music across Hindi, English, and Malayalam for the MOSC community.",
    type: "website",
    siteName: "Bibliano Music",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is the "Organization Schema" that makes you look professional to Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bibliano Music",
    "founder": {
      "@type": "Person",
      "name": "Robin Thomas"
    },
    "url": "https://bibliano-music-hindi-qurbana-mosc.netlify.app",
    "description": "Dedicated to promoting Christian Music in Hindi, English, and Malayalam for the Malankara Orthodox Syrian Church.",
    "sameAs": [
      "https://www.facebook.com/YOUR_FB_PAGE",
      "https://www.instagram.com/YOUR_INSTA_PAGE",
      "https://www.youtube.com/YOUR_YOUTUBE_CHANNEL"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808]`}
      >
        {children}
      </body>
    </html>
  );
}

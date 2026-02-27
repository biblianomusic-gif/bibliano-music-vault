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

/** * SEO BRANDING - This builds the Bibliano Music brand on the internet.
 */
export const metadata: Metadata = {
  title: "Bibliano Music Vault | Hindi Qurbana Songs & Karaoke",
  description: "The official digital repository for Hindi Qurbana Songs and Karaoke Tracks of the Malankara Orthodox Syrian Church.",
  keywords: ["Hindi Qurbana", "Bibliano Music", "Malankara Orthodox", "Syrian Church", "Christian Karaoke"],
  authors: [{ name: "Bibliano Music" }],
  openGraph: {
    title: "Bibliano Music Vault",
    description: "Digital library for Malankara Orthodox Syrian Church Hindi Qurbana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808]`}
      >
        {children}
      </body>
    </html>
  );
}

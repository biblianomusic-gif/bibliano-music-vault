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

/** * BRANDING: Bibliano Music (Personal Property of Robin Thomas) 
 * BLESSING: H.G. Geevarghese Mar Coorilos, Metropolitan of the Bombay Diocese (MOSC)
 */
export const metadata: Metadata = {
  title: "Bibliano Music Vault | Hindi Qurbana | Robin Thomas",
  description: "Independent digital repository for Hindi Qurbana tracks. Created by Robin Thomas. Blessed by H.G. Geevarghese Mar Coorilos, Metropolitan of the Bombay Diocese.",
  keywords: [
    "Bibliano Music", "Robin Thomas", "Hindi Qurbana", "Bombay Diocese", 
    "H.G. Geevarghese Mar Coorilos", "Malankara Orthodox Syrian Church", 
    "MOSC Hindi Songs", "Christian Karaoke Hindi"
  ],
  authors: [{ name: "Robin Thomas" }],
  creator: "Robin Thomas",
  publisher: "Bibliano Music",
  verification: {
    google: "JvGWO80QfwQDINnxO6qZH46lKVumUlzSkY6my__hdIE",
  },
  openGraph: {
    title: "Bibliano Music Vault - Hindi Qurbana Resources",
    description: "A personal mission by Robin Thomas to preserve Hindi liturgical music, blessed by the Metropolitan of the Bombay Diocese.",
    type: "website",
    siteName: "Bibliano Music",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": "Bibliano Music Vault",
    "creator": {
      "@type": "Person",
      "name": "Robin Thomas"
    },
    "description": "Independent repository for Hindi liturgical music of the Malankara Orthodox Syrian Church.",
    "honorificPrefix": "Blessed by H.G. Geevarghese Mar Coorilos, Metropolitan of the Bombay Diocese",
    "sameAs": [
      "https://facebook.com/biblianomusic",
      "https://instagram.com/biblianomusic",
      "https://youtube.com/@biblianomusic"
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808] text-white`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer: Detailed Ownership + Official Diocese Blessing */}
        <footer className="w-full py-16 px-6 border-t border-gray-800 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h2 className="text-2xl font-bold text-red-600 tracking-tighter">BIBLIANO MUSIC</h2>
              <p className="text-sm text-gray-400 mt-1 italic">Founded & Managed by Robin Thomas</p>
              
              <div className="mt-8 p-5 border-l-4 border-red-700 bg-[#111] rounded-r-lg shadow-lg">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Ecclesiastical Blessing</p>
                <p className="text-sm leading-relaxed text-gray-200">
                  This digital vault is humbly dedicated to the faithful of the Malankara Orthodox Syrian Church, carrying the paternal blessings of:
                </p>
                <p className="mt-3 text-md font-semibold text-white">
                  H.G. Geevarghese Mar Coorilos
                </p>
                <p className="text-xs text-red-500 font-medium uppercase tracking-wide">
                  Metropolitan of the Bombay Diocese
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Connect With Bibliano</h3>
              <p className="text-right text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
                Preserving liturgical heritage through Christian Music in Hindi, English, and Malayalam.
              </p>
              <div className="flex gap-6">
                <a href="https://facebook.com/biblianomusic" target="_blank" className="hover:text-red-500 transition-all transform hover:scale-110">Facebook</a>
                <a href="https://instagram.com/biblianomusic" target="_blank" className="hover:text-red-500 transition-all transform hover:scale-110">Instagram</a>
                <a href="https://youtube.com/@biblianomusic" target="_blank" className="hover:text-red-500 transition-all transform hover:scale-110">YouTube</a>
              </div>
              <div className="mt-12 text-right">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">An Independent Project by Robin Thomas</p>
                <p className="text-[10px] text-gray-700 uppercase tracking-tighter">
                  © {new Date().getFullYear()} Bibliano Music. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

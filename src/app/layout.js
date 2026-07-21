import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Beacon Green One | Elevated Living Between Mountains & Modernity",
  description: "Dehradun's first budget premium housing project in the foothills of Mussoorie Hills. Nestled in challang, offering 1 BHK and 2 BHK elite residences with stunning panoramic views.",
  keywords: ["Beacon Green One", "Dehradun Real Estate", "Foothill living", "Mussoorie hills housing", "NCR Builder Dehradun", "Budget premium flats Dehradun", "1 BHK Dehradun", "2 BHK Dehradun"],
  icons: {
    icon: "/images/beacon-favicon-dark.png",
    shortcut: "/images/beacon-favicon-dark.png",
    apple: "/images/beacon-favicon-dark.png",
  },
  openGraph: {
    title: "Beacon Green One | Elevated Living Between Mountains & Modernity",
    description: "Dehradun's first budget premium housing project in the foothills of Mussoorie Hills.",
    url: "https://beacongreenone.com",
    siteName: "Beacon Green One",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jetbrains.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Preload heavy MapLibre satellite map engine and style sheets for lag-free scroll caching */}
        <link rel="preload" href="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.js" as="script" />
        <link rel="preload" href="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css" as="style" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBFBFA] text-[#1A202C]">
        {children}
      </body>
    </html>
  );
}


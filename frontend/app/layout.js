import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Turkcell GreenConnect - Yeşil Yaşam Takip Sistemi",
  description: "Karbon ayak izinizi takip edin, yeşil yaşam hedeflerinize ulaşın",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} font-display antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

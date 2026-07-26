import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "footpryx.com // Footprint Intelligence Engine",
  description: "Advanced OSINT threat intelligence and digital footprint reconnaissance platform.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black font-mono">
        {children}
      </body>
    </html>
  );
}
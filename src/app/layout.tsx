import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CALIBRATIONS 2026–2027 | Kollywood × College Freshers Cultural Festival",
  description:
    "Official website for CALIBRATIONS 2026–2027. A Tamil-cinema-inspired collegiate cultural campaign from Sri Venkateswara College of Engineering (SVCE), Pennalur, Sriperumbudur / Chennai. Exclusively for First Year Freshers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
        />
      </head>
      <body className="bg-cinema-black text-cinema-paper antialiased selection:bg-cinema-red selection:text-cinema-paper">
        {children}
      </body>
    </html>
  );
}

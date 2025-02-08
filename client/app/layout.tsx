import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/_components/Navbar";

export const metadata: Metadata = {
  title: "Find My Killer: Season 2",
  description: "An Internet Mystery Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          <Navbar />
          {children}
      </body>
    </html>
  );
}

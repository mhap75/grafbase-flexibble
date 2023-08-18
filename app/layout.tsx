import { Footer, Navbar } from "@/components";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flexibble",
  description: "Explore outstanding and remarkable design ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid min-h-[100dvh] grid-rows-[auto,1fr,auto]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

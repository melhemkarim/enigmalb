// app/layout.tsx (for Next.js App Router)
import "./globals.css";
import { Kode_Mono } from "next/font/google";
import { CartProvider } from "./context/CartContext"; // ✅ Import your provider

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Enigma",
  description: "Enigma E-commerce Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kodeMono.className}>
        {/* ✅ Wrap children with CartProvider */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

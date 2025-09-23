import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { FavoritosProvider } from "@/contexts/FavoritosContext";

export const metadata: Metadata = {
  title: "Rick and Morty Episodios",
  description: "Gestión de episodios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <FavoritosProvider>
          {children}
          <Toaster position="top-right" />
        </FavoritosProvider>
      </body>
    </html>
  );
}
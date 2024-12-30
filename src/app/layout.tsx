import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/components/ui/fonts";
import { Header } from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import {Footer} from "@/components/footer";

export const metadata: Metadata = {
  title: "Talent app",
  description: "Created by Salt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased overscroll-none p-0`}>
          <main className="space-y-1 w-full">
            <Header />
            {children}
            <Toaster />
            <Footer/>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

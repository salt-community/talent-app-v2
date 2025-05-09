import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Header } from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Talent app",
  description: "Created by Salt",
};

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased overscroll-none p-0`}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
              <Suspense>{children}</Suspense>
            </main>
            <Toaster position="bottom-right" reverseOrder={false} />

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

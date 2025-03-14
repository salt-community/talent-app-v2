import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Header } from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import Loading from "./loading";

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
              {" "}
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
            <Toaster />
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import PromoBar from "@/components/ui/PromoBar";
import Card from "@/components/ui/Cards/Card";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Power Parlay",
  description: "A fantasy sports game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <Nav />
          <PromoBar />
          <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
            <div className="w-fixed w-full lg:w-1/4 flex-shrink flex-grow-0 px-4 ">
              {[1, 2, 3].map((e, i) => (
                <Card key={i} />
              ))}
            </div>
            <main role="main" className="w-full lg:w-1/2 flex-grow pt-1 px-3">
              {children}
            </main>
            <div className="w-fixed w-full lg:w-1/4 flex-shrink flex-grow-0 px-4 ">
              {[1, 2, 3].map((e, i) => (
                <Card key={i} />
              ))}
            </div>
          </div>
          <Footer />
        </body>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </html>
  );
}

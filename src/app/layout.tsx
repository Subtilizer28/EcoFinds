import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import NavBar from "~/components/NavBar";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "EcoFinds",
  description: "Your one-stop shop for eco-friendly products",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="min-h-screen bg-[linear-gradient(90deg,rgba(18,18,22,1)_0%,rgba(18,18,22,1)_7.692%,rgba(23,22,26,1)_7.692%,rgba(23,22,26,1)_15.385%,rgba(27,26,31,1)_15.385%,rgba(27,26,31,1)_23.077%,rgba(32,31,35,1)_23.077%,rgba(32,31,35,1)_30.769%,rgba(36,35,39,1)_30.769%,rgba(36,35,39,1)_38.462%,rgba(40,39,43,1)_38.462%,rgba(40,39,43,1)_46.154%,rgba(44,43,47,1)_46.154%,rgba(44,43,47,1)_53.846%,rgba(48,47,51,1)_53.846%,rgba(48,47,51,1)_61.538%,rgba(51,50,55,1)_61.538%,rgba(51,50,55,1)_69.231%,rgba(55,54,58,1)_69.231%,rgba(55,54,58,1)_76.923%,rgba(57,56,61,1)_76.923%,rgba(57,56,61,1)_84.615%,rgba(60,59,64,1)_84.615%,rgba(60,59,64,1)_92.308%,rgba(62,61,66,1)_92.308%,rgba(62,61,66,1)_100%)]">
        <NavBar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "RFP Marketplace",
  description: "Generate leads and find new opportunities with our RFP marketplace.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="dark min-h-screen bg-glow bg-contain bg-bottom bg-no-repeat">
        <ClerkProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import PrelineScript from "@/components/PrelineScript";

export const metadata: Metadata = {
  title: "Planet Interview",
  description: "Your one-stop hiring solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
      <PrelineScript />
    </html>
  );
}

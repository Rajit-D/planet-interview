import type { Metadata } from "next";
import Providers from "@/app/providers";
import PrelineScript from "@/components/PrelineScript";
import AdminDashboard from "@/components/AdminDashboard";

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
    <>
      <div className="w-screen flex justify-start">
        <Providers>
          <AdminDashboard /> {children}
        </Providers>
      </div>
      <PrelineScript />
    </>
  );
}

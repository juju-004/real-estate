import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import { SessionProvider } from "@/context/SessionContext";
import { initAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

export const metadata = {
  title: "Rent-it",
  description: "Rent properties",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lucia = await initAuth();
  const cookie = (await cookies()).get("session")?.value ?? "";
  const { user } = await lucia.validateSession(cookie ?? "");

  return (
    <html lang="en">
      <body>
        <SessionProvider initialUser={user}>
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}

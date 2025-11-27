import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/ui/NavBar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Omni - Tools for content",
    description: "Un-complicate creating. Focus on self expression.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`antialiased overflow-x-hidden`}
            >
            <NavBar/>
                {children}
                <Toaster position="top-center"/>
            </body>
        </html>
    );
}

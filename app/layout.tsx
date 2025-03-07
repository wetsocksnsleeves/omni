import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/ui/NavBar";

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
        <html lang="en">
            <body
                className={`antialiased overflow-hidden`}
            >
            <NavBar/>
                {children}
            </body>
        </html>
    );
}

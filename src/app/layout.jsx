import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Molten Orbit - Digital Agency",
    description: "Building the future of web experiences.",
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
            >
                <AuthProvider>
                    <Toaster position="bottom-right" />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

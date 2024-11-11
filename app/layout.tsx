import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-do App",
  description: "Get things done with this simple to-do app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}

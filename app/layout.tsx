import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Geist({ variable: "--font-body", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://undatedlace.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ismail Shaikh — Senior Full Stack Software Engineer",
  description:
    "Portfolio of Ismail Shaikh, a full stack software engineer building web apps with Node.js, NestJS, Angular and React.",
  openGraph: {
    title: "Ismail Shaikh — Senior Full Stack Software Engineer",
    description: "Full stack engineer: Node.js, NestJS, Angular, React, PostgreSQL, MongoDB, AWS.",
    type: "website",
    url: siteUrl,
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

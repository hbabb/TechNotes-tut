import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

const interItalic = localFont({
  src: "./fonts/InterVariable-Italic.woff2",
  variable: "--font-inter-italic",
  weight: "100 900",
});

const firaCode = localFont({
  src: "./fonts/FiraCode-VF.woff2",
  variable: "--font-fira-code",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Computer Repair Shop",
    default: "Computer Repair Shop",
  },
  description: "Computer Repair Shop - Demo",
  applicationName: "RepairShop-Demo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${interItalic.variable} ${firaCode.variable} h-screen w-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

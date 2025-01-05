import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/lib/Providers";
import { ScrollToTop } from "@/components/modules/Shared/ScrollToTop";

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

export const metadata: Metadata = {
  title: "Pomodoro - Your Ultimate Time Management App",
  description:
    "Boost your productivity with Pomodoro, the ultimate time management app! Manage your tasks effectively, stay focused, and take breaks at the right time. Whether you're studying, working, or just trying to stay organized, Pomodoro is designed to help you achieve your goals. Enjoy a sleek interface, customizable session lengths, and insightful productivity stats for an optimized workflow.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Воздушный Севастополь",
  description: "Официальный сайт проекта Воздушный Севастополь",
  metadataBase: new URL("https://vozdushny-sevastopol.vercel.app"),
  openGraph: {
    title: "Воздушный Севастополь",
    description: "Официальный сайт проекта Воздушный Севастополь",
    url: "https://vozdushny-sevastopol.vercel.app",
    siteName: "Воздушный Севастополь",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

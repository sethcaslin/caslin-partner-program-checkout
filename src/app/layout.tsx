import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Sora } from "next/font/google"

import "./globals.css"

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
})

const headingFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Caslin Partner Program Checkout",
  description: "Secure checkout for the Caslin Partner Program.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aadarsh Chandra | Developer & Builder",
  description: "Aadarsh Chandra - Full-stack web, Python/Rust backend, and core systems developer. Self-employed since 18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          {/* Fonts: Clean Sans-Serif like Inter */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
              rel="stylesheet"
          />

          {/* Material / Remix Icons for clean vectors */}
          <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />

          {/* Devicon for authentic Tech Stack logos */}
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="pro-theme">
        {children}
      </body>
    </html>
  );
}

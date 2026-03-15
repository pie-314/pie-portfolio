import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aadarsh Chandra (Pi) | Software Developer & Builder",
  description: "Portfolio of Aadarsh Chandra (Pi) - an 18-year-old self-employed developer specializing in full-stack web, Python/Rust backend, and core systems development (C, Kernel).",
  keywords: ["Aadarsh Chandra", "Aadarsh", "Chandra", "Pi", "pie-314", "pidev", "pidev.tech", "Software Developer", "Software Engineer", "Rust", "Python", "C", "Full-stack", "Backend", "Portfolio", "Systems Engineer", "Machine Learning", "Adarsh", "adarsh chandra", "aadarsh developer", "pi developer"],
  authors: [{ name: "Aadarsh Chandra", url: "https://pidev.tech" }],
  creator: "Aadarsh Chandra",
  publisher: "Aadarsh Chandra",
  alternates: {
    canonical: "https://pidev.tech",
    languages: {
      "en-US": "https://pidev.tech",
    },
  },
  openGraph: {
    title: "Aadarsh Chandra (Pi) | Software Developer & Builder",
    description: "Portfolio of Aadarsh Chandra (Pi) - an 18-year-old self-employed developer specializing in full-stack web, Python/Rust backend, and core systems development.",
    url: "https://pidev.tech",
    siteName: "Aadarsh Chandra",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "Aadarsh Chandra Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadarsh Chandra (Pi) | Software Developer & Builder",
    description: "Portfolio of Aadarsh Chandra (Pi) - an 18-year-old self-employed developer specializing in full-stack web, Python/Rust backend, and core systems development.",
    creator: "@pie314n",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://pidev.tech"),
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

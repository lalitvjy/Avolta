import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { AmplitudeScript } from '@/components/analytics/AmplitudeScript';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AmplitudeScript />
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.avoltaworld.com/themes/wndrs/assets/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.avoltaworld.com/themes/wndrs/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.avoltaworld.com/themes/wndrs/assets/favicons/favicon-16x16.png" />
        <link rel="manifest" href="https://www.avoltaworld.com/themes/wndrs/assets/favicons/site.webmanifest" />
        <link rel="mask-icon" href="https://www.avoltaworld.com/themes/wndrs/assets/favicons/safari-pinned-tab.svg" color="#8f53f0" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="relative flex flex-col max-h-screen w-full bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}

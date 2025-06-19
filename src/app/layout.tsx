import AmplitudeProvider from "@/components/amplitude-provider/amplitude-provider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "./globals.css";
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
      <body className={`${inter.variable} antialiased`}>
        <AmplitudeProvider />
        <div className="relative flex flex-col min-h-screen w-full bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}

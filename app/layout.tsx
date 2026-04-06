import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { LandingPageNavbar } from "@/app/_components/landingPage";
import "./globals.css";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "SkillANA",
  description: "Website for collect Tech Badge and Create a Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
        <body>
          <LandingPageNavbar />
            
          <main>
            {children}
          </main>

          <footer>

          </footer>
        </body>
    </html>
  );
}
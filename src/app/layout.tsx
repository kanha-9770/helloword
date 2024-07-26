// app/layout.tsx (or your specific layout file)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import Navbar, { NavbarDemo } from '@/components/Navbar/Navbar';
import "@fontsource/montserrat"; // Defaults to weight 400
import NavbarDemo from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
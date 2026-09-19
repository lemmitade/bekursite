import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'BEKUR General Trading PLC | Infrastructure, Technology & Sustainable Solutions',
  description: 'Bekur General Trading PLC is a diversified Ethiopian business group committed to infrastructure development, innovative technologies, sustainable business solutions, and strategic investments.',
  keywords: 'Bekur, infrastructure solutions Ethiopia, smart city technologies, lighting solutions, sustainable development, trading company Ethiopia',
  openGraph: {
    title: 'BEKUR General Trading PLC',
    description: 'Infrastructure, Technology & Sustainable Solutions for a Changing Ethiopia',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  verification: {
    google: 'googled36fd8bf3b89b1c8',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

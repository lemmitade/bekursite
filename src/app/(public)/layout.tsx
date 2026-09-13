import prisma from '@/lib/prisma';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let settings;
  let sectors: { title: string; slug: string }[] = [];

  try {
    settings = await prisma.siteSettings.findFirst({ where: { id: 'main' } });
    sectors = await prisma.sector.findMany({
      where: { enabled: true },
      select: { title: true, slug: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    // DB might not be ready yet
  }

  const navSettings = {
    companyName: settings?.companyName || 'BEKUR GENERAL TRADING PLC',
    whatsappNumber: settings?.whatsappNumber || '+251946757671',
    whatsappMessage: settings?.whatsappMessage || 'Hello Bekur General Trading PLC, I would like to learn more about your solutions and services.',
    primaryCtaText: settings?.primaryCtaText || 'PARTNER WITH BEKUR',
  };

  const footerSettings = {
    companyName: settings?.companyName || 'BEKUR GENERAL TRADING PLC',
    tagline: settings?.tagline || '',
    email: settings?.email || '',
    phone1: settings?.phone1 || '',
    phone2: settings?.phone2 || '',
    whatsappNumber: settings?.whatsappNumber || '',
    copyright: settings?.copyright || '',
    facebookUrl: settings?.facebookUrl || '',
    linkedinUrl: settings?.linkedinUrl || '',
    twitterUrl: settings?.twitterUrl || '',
    instagramUrl: settings?.instagramUrl || '',
    telegramUrl: settings?.telegramUrl || '',
  };

  return (
    <>
      <Navbar settings={navSettings} />
      <main>{children}</main>
      <Footer settings={footerSettings} sectors={sectors} />
    </>
  );
}

import prisma from '@/lib/prisma';
import Hero from '@/components/public/Hero';
import CompanyIntro from '@/components/public/CompanyIntro';
import SectorsGrid from '@/components/public/SectorsGrid';
import ProductsSection from '@/components/public/ProductsSection';
import WhyBekur from '@/components/public/WhyBekur';
import VisionMission from '@/components/public/VisionMission';
import CoreValues from '@/components/public/CoreValues';
import PartnershipsSection from '@/components/public/PartnershipsSection';
import Testimonials from '@/components/public/Testimonials';
import FutureExpansion from '@/components/public/FutureExpansion';
import FinalCTA from '@/components/public/FinalCTA';

async function getHomepageData() {
  try {
    const [settings, sections, sectors, products, values, partners, testimonials] = await Promise.all([
      prisma.siteSettings.findFirst({ where: { id: 'main' } }),
      prisma.homepageSection.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.sector.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.product.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' }, include: { sector: true } }),
      prisma.coreValue.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.partner.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.testimonial.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } }),
    ]);
    return { settings, sections, sectors, products, values, partners, testimonials };
  } catch {
    return { settings: null, sections: [], sectors: [], products: [], values: [], partners: [], testimonials: [] };
  }
}

export default async function HomePage() {
  const { settings, sections, sectors, products, values, partners, testimonials } = await getHomepageData();

  const getSection = (key: string) => sections.find((s) => s.sectionKey === key);
  const hero = getSection('hero');
  const intro = getSection('intro');
  const sectorsSection = getSection('sectors');
  const solutionsSection = getSection('solutions');
  const whySection = getSection('whybekur');
  const vmSection = getSection('visionmission');
  const valuesSection = getSection('values');
  const partnershipsSection = getSection('partnerships');
  const testimonialsSection = getSection('testimonials');
  const futureSection = getSection('future');
  const finalCtaSection = getSection('finalcta');

  const vmData = vmSection?.extraData ? JSON.parse(vmSection.extraData) : {};
  const futureData = futureSection?.extraData ? JSON.parse(futureSection.extraData) : {};

  const whatsappNumber = settings?.whatsappNumber || '+251946757671';
  const whatsappMessage = settings?.whatsappMessage || '';

  return (
    <>
      {hero?.enabled !== false && (
        <Hero
          title={hero?.title || 'BUILDING WHAT\'S NEXT.'}
          subtitle={hero?.subtitle || ''}
          ctaText={hero?.ctaText || settings?.primaryCtaText || 'PARTNER WITH BEKUR'}
          ctaLink={hero?.ctaLink || 'whatsapp'}
          imageUrl={hero?.imageUrl || ''}
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          secondaryCtaText={settings?.secondaryCtaText || 'EXPLORE OUR BUSINESS'}
        />
      )}

      {intro?.enabled !== false && (
        <CompanyIntro
          title={intro?.title || 'A DIVERSIFIED BUSINESS GROUP'}
          content={intro?.content || ''}
          ctaText={intro?.ctaText || 'DISCOVER BEKUR'}
          ctaLink={intro?.ctaLink || '/about'}
          imageUrl={intro?.imageUrl || ''}
        />
      )}

      {sectorsSection?.enabled !== false && sectors.length > 0 && (
        <SectorsGrid
          title={sectorsSection?.title || 'OUR BUSINESS SECTORS'}
          subtitle={sectorsSection?.subtitle || ''}
          sectors={sectors}
        />
      )}

      {solutionsSection?.enabled !== false && products.length > 0 && (
        <ProductsSection
          title={solutionsSection?.title || 'SOLUTIONS FOR MODERN ENVIRONMENTS'}
          subtitle={solutionsSection?.subtitle || 'Our product portfolio delivers innovative solutions for modern cities, businesses, institutions, and public infrastructure.'}
          products={products}
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
        />
      )}

      {whySection?.enabled !== false && (
        <WhyBekur
          title={whySection?.title || 'WHY BEKUR'}
          subtitle={whySection?.subtitle || ''}
        />
      )}

      {vmSection?.enabled !== false && (
        <VisionMission
          vision={vmData.vision || 'To become a leading Ethiopian business group recognized for innovation, quality, and sustainable development across diverse industries.'}
          mission={vmData.mission || 'To deliver exceptional products, services, and business solutions that create value for customers, empower communities, and contribute to national development through integrity, innovation, and strategic partnerships.'}
        />
      )}

      {valuesSection?.enabled !== false && values.length > 0 && (
        <CoreValues
          title={valuesSection?.title || 'OUR CORE VALUES'}
          subtitle={valuesSection?.subtitle || ''}
          values={values}
        />
      )}

      {partnershipsSection?.enabled !== false && partners.length > 0 && (
        <PartnershipsSection
          title={partnershipsSection?.title || 'STRONGER THROUGH PARTNERSHIP'}
          subtitle={partnershipsSection?.subtitle || ''}
          partners={partners}
        />
      )}

      {testimonialsSection?.enabled !== false && testimonials.length > 0 && (
        <Testimonials
          title={testimonialsSection?.title || 'WHAT OUR PARTNERS SAY'}
          testimonials={testimonials}
        />
      )}

      {futureSection?.enabled !== false && (
        <FutureExpansion
          title={futureSection?.title || 'THE NEXT CHAPTER'}
          content={futureSection?.content || ''}
          highlights={futureData.highlights || []}
          closingStatement={futureData.closingStatement || ''}
          imageUrl={futureSection?.imageUrl || ''}
        />
      )}

      {finalCtaSection?.enabled !== false && (
        <FinalCTA
          title={finalCtaSection?.title || 'Ready to Build the Future Together?'}
          subtitle={finalCtaSection?.subtitle || ''}
          ctaText={finalCtaSection?.ctaText || settings?.primaryCtaText || 'PARTNER WITH BEKUR'}
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
        />
      )}
    </>
  );
}

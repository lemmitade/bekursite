import prisma from '@/lib/prisma';
import Hero from '@/components/public/Hero';
import CompanyIntro from '@/components/public/CompanyIntro';
import SectorsGrid from '@/components/public/SectorsGrid';
import ProductsSection from '@/components/public/ProductsSection';
import ProductionResultsSection, { ProductionVideo } from '@/components/public/ProductionResultsSection';
import WhyBekur from '@/components/public/WhyBekur';
import VisionMission from '@/components/public/VisionMission';
import CoreValues from '@/components/public/CoreValues';
import PartnershipsSection from '@/components/public/PartnershipsSection';
import TikTokSection, { TikTokVideo } from '@/components/public/TikTokSection';
import Testimonials from '@/components/public/Testimonials';
import FutureExpansion from '@/components/public/FutureExpansion';
import FinalCTA from '@/components/public/FinalCTA';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEFAULT_PRODUCTION_VIDEOS: ProductionVideo[] = [
  {
    id: 'vid-1',
    title: 'Precision Laser Cutting & Metal Fabrication',
    category: 'production',
    description: 'High-precision automated CNC laser cutting of heavy-duty structural steel components for our smart poles and stadium floodlight towers.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/images/videos/production-fabrication.jpg',
    duration: '01:24',
    location: 'Bekur Engineering Plant, Addis Ababa',
    badge: 'Manufacturing',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'vid-2',
    title: 'Smart City Lighting Assembly & Sensor Testing',
    category: 'production',
    description: 'Clean-room calibration of IoT environmental sensors, integrated solar panels, and high-efficiency LED controllers.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/images/videos/production-assembly.jpg',
    duration: '02:10',
    location: 'Electronics & Quality Lab',
    badge: 'Engineering',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'vid-res-1',
    title: 'Custom Material Engineering & Precision Fitting',
    category: 'result',
    description: 'No templates. No shortcuts. Just custom material that fits right the first time. Real-world structural fabrication and installation results.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/images/videos/tiktok-user-2.jpg',
    duration: '00:45',
    location: 'Bekur Project Facility',
    badge: 'Custom Fitting',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7654280983373516039?lang=en',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'vid-res-2',
    title: 'On-Site Infrastructure Execution & Delivery',
    category: 'result',
    description: 'Live demonstration of final infrastructure assembly, structural alignment, and testing delivered to the highest industrial specifications.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: '/images/videos/tiktok-user-1.jpg',
    duration: '00:58',
    location: 'Addis Ababa',
    badge: 'On-Site Execution',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7653834753560333586?lang=en',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'vid-res-3',
    title: 'Finished Structural Components & Quality Check',
    category: 'result',
    description: 'Completed heavy-duty metal fabrication pieces ready for urban deployment with protective powder coating and structural guarantees.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/images/videos/tiktok-user-3.jpg',
    duration: '00:50',
    location: 'Engineering Site',
    badge: 'Quality Tested',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7656135524930964743?lang=en',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'vid-res-4',
    title: 'Commercial Infrastructure & Modern City Solutions',
    category: 'result',
    description: 'Deploying sustainable, modern infrastructure solutions across commercial and public sector developments in Ethiopia.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: '/images/videos/tiktok-user-4.jpg',
    duration: '01:15',
    location: 'Addis Ababa Commercial Center',
    badge: 'Commercial Deliverable',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7686454118990433544?lang=en',
    enabled: true,
    sortOrder: 5,
  },
  {
    id: 'vid-res-5',
    title: 'Client Delivery & Material Longevity Showcase',
    category: 'result',
    description: 'Addressing client requirements directly with proven material durability, weather resistance, and long-term warranties.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: '/images/videos/tiktok-user-5.jpg',
    duration: '01:05',
    location: 'Client Site Q&A',
    badge: 'Client Delivery',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7655375736932551944?lang=en',
    enabled: true,
    sortOrder: 6,
  },
  {
    id: 'vid-3',
    title: 'Bole Avenue Smart Solar Pole Grid',
    category: 'result',
    description: 'Full-scale twilight illumination test on modern urban avenues. Autonomous dusk-to-dawn lighting with integrated surveillance and live digital banner displays.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: '/images/videos/result-smartpole.jpg',
    duration: '01:45',
    location: 'Bole Road, Addis Ababa',
    badge: 'Completed Project',
    enabled: true,
    sortOrder: 7,
  },
  {
    id: 'vid-4',
    title: 'National Sports Stadium High-Mast Illumination',
    category: 'result',
    description: 'Turnkey delivery of 30-meter high-mast stadium floodlights with precision glare control, providing broadcast-standard 2000 Lux illumination.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: '/images/videos/result-highmast.jpg',
    duration: '02:30',
    location: 'Sports Arena Project',
    badge: 'Turnkey Result',
    enabled: true,
    sortOrder: 8,
  },
];

const DEFAULT_TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: 'tt-1',
    title: 'No templates. No shortcuts. Just custom material that fits right the first time.',
    thumbnailUrl: '/images/videos/tiktok-user-2.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7654280983373516039?lang=en',
    caption: 'No templates. No shortcuts. Just custom material that fits right the first time. #Engineering #CustomFabrication #BekurTrading',
    views: '45.2K',
    likes: '3.2K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'tt-2',
    title: 'Live Infrastructure Execution & On-Site Assembly',
    thumbnailUrl: '/images/videos/tiktok-user-1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7653834753560333586?lang=en',
    caption: 'On-site execution and structural delivery across our infrastructure projects in Addis Ababa! #EthiopiaTech #AddisAbaba #BekurTrading',
    views: '58.9K',
    likes: '4.5K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'tt-3',
    title: 'Precision Fabrication & Structural Quality Inspection',
    thumbnailUrl: '/images/videos/tiktok-user-3.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7656135524930964743?lang=en',
    caption: 'Quality control check on heavy-duty components before site deployment. Built for longevity. #QualityControl #Manufacturing',
    views: '37.4K',
    likes: '2.8K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'tt-4',
    title: 'Modern Urban Infrastructure Solutions in Ethiopia',
    thumbnailUrl: '/images/videos/tiktok-user-4.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7686454118990433544?lang=en',
    caption: 'Delivering modern infrastructure solutions that power our cities forward. #SmartCity #EthiopiaInfrastructure #BekurTrading',
    views: '62.1K',
    likes: '5.0K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'tt-5',
    title: 'Client Q&A: Material Durability, Longevity & Quality',
    thumbnailUrl: '/images/videos/tiktok-user-5.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7655375736932551944?lang=en',
    caption: 'Answering client questions directly regarding material selection, weather durability, and warranties. #ClientSatisfaction #BekurTrading',
    views: '41.6K',
    likes: '3.1K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 4,
  },
];

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
  const prodSection = getSection('production_videos');
  const whySection = getSection('whybekur');
  const vmSection = getSection('visionmission');
  const valuesSection = getSection('values');
  const partnershipsSection = getSection('partnerships');
  const tiktokSection = getSection('tiktok_videos');
  const testimonialsSection = getSection('testimonials');
  const futureSection = getSection('future');
  const finalCtaSection = getSection('finalcta');

  const vmData = vmSection?.extraData ? JSON.parse(vmSection.extraData) : {};
  const futureData = futureSection?.extraData ? JSON.parse(futureSection.extraData) : {};

  let prodData: any = {};
  if (prodSection?.extraData) {
    try { prodData = JSON.parse(prodSection.extraData); } catch {}
  }
  const prodVideos = Array.isArray(prodData.videos) && prodData.videos.length > 0 ? prodData.videos : DEFAULT_PRODUCTION_VIDEOS;

  let tiktokData: any = {};
  if (tiktokSection?.extraData) {
    try { tiktokData = JSON.parse(tiktokSection.extraData); } catch {}
  }
  const ttHandle = tiktokData.accountHandle || '@bekurtrading';
  const ttAccountUrl = tiktokData.accountUrl || 'https://www.tiktok.com/@bekurtrading';
  const ttFollowers = tiktokData.followerCount || '12.4K';
  const ttVideos = Array.isArray(tiktokData.videos) && tiktokData.videos.length > 0 ? tiktokData.videos : DEFAULT_TIKTOK_VIDEOS;

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

      {prodSection?.enabled !== false && (
        <ProductionResultsSection
          title={prodSection?.title || 'PRECISION PRODUCTION & FINAL RESULTS'}
          subtitle={prodSection?.subtitle || 'Discover how Bekur transforms concept to reality — from high-precision CNC metal fabrication in our facilities to turnkey infrastructure landmarks across Ethiopia.'}
          videos={prodVideos}
          whatsappNumber={whatsappNumber}
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

      {tiktokSection?.enabled !== false && (
        <TikTokSection
          title={tiktokSection?.title || 'BEKUR ON TIKTOK'}
          subtitle={tiktokSection?.subtitle || 'Behind-the-scenes engineering, real-time testing, and short-form tech highlights. Tap any reel for an interactive preview.'}
          accountHandle={ttHandle}
          accountUrl={ttAccountUrl}
          followerCount={ttFollowers}
          videos={ttVideos}
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

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

const DEFAULT_SECTORS: any[] = [
  { id: 'sec-1', title: 'Infrastructure Solutions', slug: 'infrastructure-solutions', description: 'Delivering robust infrastructure solutions for government institutions, commercial developments, and public projects across Ethiopia.', imageUrl: '/images/sectors/infrastructure-solutions.jpg', sortOrder: 0 },
  { id: 'sec-2', title: 'Lighting Technologies', slug: 'lighting-technologies', description: 'Advanced lighting systems for urban environments, industrial facilities, and public infrastructure projects.', imageUrl: '/images/sectors/lighting-technologies.jpg', sortOrder: 1 },
  { id: 'sec-3', title: 'Urban Development Solutions', slug: 'urban-development', description: 'Comprehensive urban development services shaping modern, sustainable, and livable cities.', imageUrl: '/images/sectors/urban-development.jpg', sortOrder: 2 },
  { id: 'sec-4', title: 'Smart City Technologies', slug: 'smart-city-technologies', description: 'Innovative smart city solutions integrating technology, connectivity, and sustainable urban planning.', imageUrl: '/images/sectors/smart-city-technologies.jpg', sortOrder: 3 },
  { id: 'sec-5', title: 'Coffee Trading & Export', slug: 'coffee-trading-export', description: 'Premium Ethiopian coffee sourcing, processing, and export to international markets.', imageUrl: '/images/sectors/coffee-trading-export.jpg', sortOrder: 4 },
  { id: 'sec-6', title: 'Procurement & Supply', slug: 'procurement-supply', description: 'Professional procurement and supply chain management for government and private sector organizations.', imageUrl: '/images/sectors/procurement-supply.jpg', sortOrder: 5 },
  { id: 'sec-7', title: 'Entertainment & Recreation', slug: 'entertainment-recreation', description: 'Creating world-class entertainment and recreational facilities for communities and businesses.', imageUrl: '/images/sectors/entertainment-recreation.jpg', sortOrder: 6 },
  { id: 'sec-8', title: 'Strategic Investments', slug: 'strategic-investments', description: 'Identifying and investing in high-growth opportunities across diverse sectors in Ethiopia and beyond.', imageUrl: '/images/sectors/strategic-investments.jpg', sortOrder: 7 },
];

const DEFAULT_PRODUCTS: any[] = [
  {
    id: 'prod-1',
    name: 'Smart Pole Solutions',
    slug: 'smart-pole-solutions',
    description: 'Smarter cities. Brighter tomorrows. Engineered for sustainable, connected, and people-friendly urban environments with integrated IoT capabilities.',
    imageUrl: '/images/products/smart-pole.jpg',
    images: '["/images/products/smart-pole.jpg", "/images/products/catalog/smart-pole-sheet.jpg"]',
    techInfo: 'Smart Adaptive Lighting • IoT Ready Architecture • Modern Urban Geometric Cantilever Design • Recessed Blue LED Accent Channel • Safe & Durable Anchor Base • Energy Efficient Operation',
    sortOrder: 0,
  },
  {
    id: 'prod-2',
    name: 'Garden Pole Solutions',
    slug: 'garden-pole-systems',
    description: 'Garden Pole solutions combine sleek modern aesthetics and precision functionality to illuminate outdoor spaces, landscaped pathways, and public plazas.',
    imageUrl: '/images/products/garden-pole.jpg',
    images: '["/images/products/garden-pole.jpg", "/images/products/catalog/garden-pole-sheet.jpg"]',
    techInfo: 'Modern Geometric Square Luminaire • Precision Optics • Custom Heights Available • Durable Structure • Sturdy Base Foundation • Recessed Blue Accent LED Strip • Long Service Life',
    sortOrder: 1,
  },
  {
    id: 'prod-3',
    name: 'Charger Box Stations',
    slug: 'charger-box-stations',
    description: 'The Charger Box provides convenient, reliable, and weather-resistant public and commercial electric vehicle and device charging solutions.',
    imageUrl: '/images/products/charger-box.jpg',
    images: '["/images/products/charger-box.jpg", "/images/products/catalog/charger-box-sheet.jpg"]',
    techInfo: 'Clean Architectural Tower • Illuminated Overhead LED Canopy • USB-A Ports • USB-C Fast Charging • Optional Wireless Charging • Heavy-Duty Cable Holders • Weather Resistant (IP65+) • Smart Monitoring Capability',
    sortOrder: 2,
  },
  {
    id: 'prod-4',
    name: 'High Mast Lighting Systems',
    slug: 'high-mast-lighting',
    description: 'High Mast Lighting systems deliver powerful, wide-area illumination for large-scale environments including highways, airports, logistics centers, and ports.',
    imageUrl: '/images/products/high-mast-lighting.jpg',
    images: '["/images/products/high-mast-lighting.jpg", "/images/products/catalog/high-mast-lighting-sheet.jpg"]',
    techInfo: 'High-Performance LED Floodlight Arrays • Circular Crown Ring Design • Custom Heights Available (15m–40m) • Safe Maintenance Access Ladder • Durable Engineered Base Structure • Reduced Maintenance Overhead',
    sortOrder: 3,
  },
  {
    id: 'prod-5',
    name: 'Sports Field Lighting',
    slug: 'sports-field-lighting',
    description: 'Professional sports lighting solutions designed for high-level training and competitive environments, providing uniform illumination with optimal glare reduction.',
    imageUrl: '/images/products/sports-field-lighting.jpg',
    images: '["/images/products/sports-field-lighting.jpg", "/images/products/catalog/sports-field-lighting-sheet.jpg"]',
    techInfo: 'High-Lumen Output LED Technology • Precision Glare-Controlled Optics • Corrosion-Resistant Powder Coating • Smart Remote Control Options • Multiple Fixture Configurations • Rugged Lattice & Tubular Construction',
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
    return {
      settings,
      sections,
      sectors: sectors.length > 0 ? sectors : DEFAULT_SECTORS,
      products: products.length > 0 ? products : DEFAULT_PRODUCTS,
      values,
      partners,
      testimonials,
    };
  } catch {
    return {
      settings: null,
      sections: [],
      sectors: DEFAULT_SECTORS,
      products: DEFAULT_PRODUCTS,
      values: [],
      partners: [],
      testimonials: [],
    };
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
          imageUrl={hero?.imageUrl || '/images/hero-infrastructure.jpg'}
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
          imageUrl={intro?.imageUrl || '/images/company-intro.jpg'}
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
          imageUrl={futureSection?.imageUrl || '/images/future-expansion.jpg'}
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

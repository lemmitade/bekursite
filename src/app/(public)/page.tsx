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
    id: 'vid-prod-vimeo-1',
    title: 'Illumination Assembly & Baseplate Welding',
    category: 'production',
    description: 'Precision welding and assembly of custom geometric LED street lighting columns with live lighting test strips.',
    videoUrl: 'https://vimeo.com/1228309071',
    thumbnailUrl: '/images/videos/vimeo-1228309071.jpg',
    duration: '00:21',
    location: 'Bekur Metal Fabrication Plant',
    badge: 'Welding & Fitting',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'vid-prod-vimeo-2',
    title: 'Structural Steel Column Fabrication & Joinery',
    category: 'production',
    description: 'Heavy-duty arc welding and alignment of tubular steel pole columns built to withstand severe wind and weather loads.',
    videoUrl: 'https://vimeo.com/1228309073',
    thumbnailUrl: '/images/videos/vimeo-1228309073.jpg',
    duration: '00:15',
    location: 'Bekur Engineering Workshop',
    badge: 'Structural Steel',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'vid-prod-vimeo-3',
    title: 'High-Amperage Arc Welding of Heavy Baseplates',
    category: 'production',
    description: 'Artisan close-up electric arc welding reinforcing structural foundation baseplates and mounting anchor gussets.',
    videoUrl: 'https://vimeo.com/1228309074',
    thumbnailUrl: '/images/videos/vimeo-1228309074.jpg',
    duration: '00:02',
    location: 'Bekur Metal Plant',
    badge: 'Arc Welding',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'vid-prod-vimeo-4',
    title: 'CNC Geometric Lighting Arm Profiles & Channels',
    category: 'production',
    description: 'Finished angular steel arm channels precision-cut and fitted with interior conduits for LED diffusers and weather-sealed wiring.',
    videoUrl: 'https://vimeo.com/1228309128',
    thumbnailUrl: '/images/videos/vimeo-1228309128.jpg',
    duration: '00:05',
    location: 'Bekur Fabrication Facility',
    badge: 'CNC Fabrication',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'vid-prod-vimeo-5',
    title: 'Finished Powder-Coated Poles & Quality Inspection',
    category: 'production',
    description: 'Comprehensive batch inspection, dimension verification, and quality audit of powder-coated architectural street lighting poles.',
    videoUrl: 'https://vimeo.com/1228309127',
    thumbnailUrl: '/images/videos/vimeo-1228309127.jpg',
    duration: '00:06',
    location: 'Assembly & Quality Yard',
    badge: 'Quality Inspection',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'vid-prod-vimeo-6',
    title: 'Logistics Dispatch & On-Site Project Delivery',
    category: 'production',
    description: 'Protective film wrapping and careful vehicle loading of custom fabricated lighting poles ready for installation delivery.',
    videoUrl: 'https://vimeo.com/1228309195',
    thumbnailUrl: '/images/videos/vimeo-1228309195.jpg',
    duration: '00:39',
    location: 'Bekur Dispatch Bay, Addis Ababa',
    badge: 'Dispatch & Delivery',
    enabled: true,
    sortOrder: 5,
  },
  {
    id: 'vid-prod-vimeo-7',
    title: 'Final Finishing & Luminaire Component Assembly',
    category: 'production',
    description: 'Assembly of electrical luminaire fixtures, optical lenses, and quality assurance testing before site shipment.',
    videoUrl: 'https://vimeo.com/1228309075',
    thumbnailUrl: '/images/videos/vimeo-1228309075.jpg',
    duration: '00:15',
    location: 'Bekur Plant',
    badge: 'Assembly & QC',
    enabled: true,
    sortOrder: 6,
  },
  {
    id: 'vid-res-vimeo-1',
    title: 'Illuminated Multi-Tier Flower Smart Pole at Night',
    category: 'result',
    description: 'Completed installation and night illumination of custom multi-tier lotus-style decorative street pole with integrated blue vertical LED accent lines.',
    videoUrl: 'https://vimeo.com/1228307451',
    thumbnailUrl: '/images/videos/vimeo-1228307451.jpg',
    duration: '00:28',
    location: 'Addis Ababa Urban Project',
    badge: 'Smart Lighting',
    enabled: true,
    sortOrder: 7,
  },
  {
    id: 'vid-res-vimeo-2',
    title: 'Architectural Pathway & Garden Promenade Lighting',
    category: 'result',
    description: 'Finished deployment of custom geometric angular walkway lighting fixtures providing warm, uniform illumination across landscaped public grounds.',
    videoUrl: 'https://vimeo.com/1228307450',
    thumbnailUrl: '/images/videos/vimeo-1228307450.jpg',
    duration: '00:07',
    location: 'Commercial & Hospitality Grounds',
    badge: 'Walkway Project',
    enabled: true,
    sortOrder: 8,
  },
  {
    id: 'vid-res-vimeo-3',
    title: 'On-Site Installation & Night Testing with Crane Truck',
    category: 'result',
    description: 'Live testing and calibration of decorative floral high-mast street lighting tower in front of contemporary commercial architecture.',
    videoUrl: 'https://vimeo.com/1228307448',
    thumbnailUrl: '/images/videos/vimeo-1228307448.jpg',
    duration: '00:11',
    location: 'City Boulevard Infrastructure',
    badge: 'Live Testing',
    enabled: true,
    sortOrder: 9,
  },
  {
    id: 'vid-res-vimeo-4',
    title: 'Precision Fabricated Angular Garden Poles Quality Inspection',
    category: 'result',
    description: 'Array of completed custom angular LED garden poles undergoing final electrical check, luminous intensity testing, and structural finishing inspection.',
    videoUrl: 'https://vimeo.com/1228307367',
    thumbnailUrl: '/images/videos/vimeo-1228307367.jpg',
    duration: '00:13',
    location: 'Bekur Fabrication Facility',
    badge: 'Quality Verified',
    enabled: true,
    sortOrder: 10,
  },
  {
    id: 'vid-res-vimeo-5',
    title: 'Night Illumination & Luminaire Output Showcase',
    category: 'result',
    description: 'Full dynamic lighting test showcasing 360-degree illumination, multi-angle floral petals, and high-efficiency optical performance.',
    videoUrl: 'https://vimeo.com/1228307368',
    thumbnailUrl: '/images/videos/vimeo-1228307368.jpg',
    duration: '00:28',
    location: 'Addis Ababa',
    badge: 'Luminous Test',
    enabled: true,
    sortOrder: 11,
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

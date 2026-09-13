import { PrismaClient } from '@prisma/client';

const connectionUrl = process.env.STORAGE_PRISMA_URL || process.env.STORAGE_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient(connectionUrl ? { datasourceUrl: connectionUrl } : undefined);

async function main() {
  console.log('🔄 Updating Products, Sectors, and Homepage Sections with new imagery and specifications...');

  // Update Homepage Sections
  await prisma.homepageSection.updateMany({
    where: { sectionKey: 'hero' },
    data: { imageUrl: '/images/hero-infrastructure.jpg' },
  });

  await prisma.homepageSection.updateMany({
    where: { sectionKey: 'intro' },
    data: { imageUrl: '/images/company-intro.jpg' },
  });

  await prisma.homepageSection.updateMany({
    where: { sectionKey: 'future' },
    data: { imageUrl: '/images/future-expansion.jpg' },
  });

  // Update Sectors with images
  await prisma.sector.updateMany({
    where: { slug: 'infrastructure-solutions' },
    data: { imageUrl: '/images/sectors/infrastructure-solutions.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'lighting-technologies' },
    data: { imageUrl: '/images/sectors/lighting-technologies.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'urban-development' },
    data: { imageUrl: '/images/sectors/urban-development.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'smart-city-technologies' },
    data: { imageUrl: '/images/sectors/smart-city-technologies.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'coffee-trading-export' },
    data: { imageUrl: '/images/sectors/coffee-trading-export.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'procurement-supply' },
    data: { imageUrl: '/images/sectors/procurement-supply.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'entertainment-recreation' },
    data: { imageUrl: '/images/sectors/entertainment-recreation.jpg' },
  });

  await prisma.sector.updateMany({
    where: { slug: 'strategic-investments' },
    data: { imageUrl: '/images/sectors/strategic-investments.jpg' },
  });

  // Update SiteSettings logo
  await prisma.siteSettings.updateMany({
    where: { id: 'main' },
    data: {
      logoUrl: '/images/logo-light.png',
      faviconUrl: '/images/logo.png',
    },
  });

  // Update Products
  const productsData = [
    {
      slug: 'smart-pole-solutions',
      name: 'Smart Pole Solutions',
      description: 'Smarter cities. Brighter tomorrows. Engineered for sustainable, connected, and people-friendly urban environments with integrated IoT capabilities.',
      imageUrl: '/images/products/smart-pole.jpg',
      images: JSON.stringify([
        '/images/products/smart-pole.jpg',
        '/images/products/catalog/smart-pole-sheet.jpg'
      ]),
      techInfo: 'Smart Adaptive Lighting • IoT Ready Architecture • Modern Urban Geometric Cantilever Design • Recessed Blue LED Accent Channel • Safe & Durable Anchor Base • Energy Efficient Operation',
      seoTitle: 'Connected Smart Pole Systems | IoT Urban Infrastructure',
      seoDesc: 'Next-generation smart city poles integrating intelligent LED lighting, IoT connectivity, and modern urban design.',
      sortOrder: 0,
    },
    {
      slug: 'garden-pole-systems',
      name: 'Garden Pole Solutions',
      description: 'Garden Pole solutions combine sleek modern aesthetics and precision functionality to illuminate outdoor spaces, landscaped pathways, and public plazas.',
      imageUrl: '/images/products/garden-pole.jpg',
      images: JSON.stringify([
        '/images/products/garden-pole.jpg',
        '/images/products/catalog/garden-pole-sheet.jpg'
      ]),
      techInfo: 'Modern Geometric Square Luminaire • Precision Optics • Custom Heights Available • Durable Structure • Sturdy Base Foundation • Recessed Blue Accent LED Strip • Long Service Life',
      seoTitle: 'Modern Garden Pole Lighting | Outdoor Architectural Illumination',
      seoDesc: 'Architectural garden lighting poles combining elegant geometric design, energy efficiency, and durable construction for parks, resorts, and public spaces.',
      sortOrder: 1,
    },
    {
      slug: 'charger-box-stations',
      name: 'Charger Box Stations',
      description: 'The Charger Box provides convenient, reliable, and weather-resistant public and commercial electric vehicle and device charging solutions.',
      imageUrl: '/images/products/charger-box.jpg',
      images: JSON.stringify([
        '/images/products/charger-box.jpg',
        '/images/products/catalog/charger-box-sheet.jpg'
      ]),
      techInfo: 'Clean Architectural Tower • Illuminated Overhead LED Canopy • USB-A Ports • USB-C Fast Charging • Optional Wireless Charging • Heavy-Duty Cable Holders • Weather Resistant (IP65+) • Smart Monitoring Capability',
      seoTitle: 'Commercial Charger Box Stations | Public & Commercial EV Charging',
      seoDesc: 'Smart public charging kiosks and EV charging stations designed for shopping centers, airports, universities, and commercial plazas.',
      sortOrder: 2,
    },
    {
      slug: 'high-mast-lighting',
      name: 'High Mast Lighting Systems',
      description: 'High Mast Lighting systems deliver powerful, wide-area illumination for large-scale environments including highways, airports, logistics centers, and ports.',
      imageUrl: '/images/products/high-mast-lighting.jpg',
      images: JSON.stringify([
        '/images/products/high-mast-lighting.jpg',
        '/images/products/catalog/high-mast-lighting-sheet.jpg'
      ]),
      techInfo: 'High-Performance LED Floodlight Arrays • Circular Crown Ring Design • Custom Heights Available (15m–40m) • Safe Maintenance Access Ladder • Durable Engineered Base Structure • Reduced Maintenance Overhead',
      seoTitle: 'High Mast Lighting Systems | Industrial & Highway Illumination',
      seoDesc: 'Powerful high mast lighting systems engineered for airports, highways, logistics centers, and large-scale public infrastructure.',
      sortOrder: 3,
    },
    {
      slug: 'sports-field-lighting',
      name: 'Sports Field Lighting',
      description: 'Professional sports lighting solutions designed for high-level training and competitive environments, providing uniform illumination with optimal glare reduction.',
      imageUrl: '/images/products/sports-field-lighting.jpg',
      images: JSON.stringify([
        '/images/products/sports-field-lighting.jpg',
        '/images/products/catalog/sports-field-lighting-sheet.jpg'
      ]),
      techInfo: 'High-Lumen Output LED Technology • Precision Glare-Controlled Optics • Corrosion-Resistant Powder Coating • Smart Remote Control Options • Multiple Fixture Configurations • Rugged Lattice & Tubular Construction',
      seoTitle: 'Sports Field & Stadium Lighting | Professional LED Systems',
      seoDesc: 'High-performance LED sports stadium lighting engineered for football fields, athletic facilities, and competitive sporting venues.',
      sortOrder: 4,
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        description: prod.description,
        imageUrl: prod.imageUrl,
        images: prod.images,
        techInfo: prod.techInfo,
        seoTitle: prod.seoTitle,
        seoDesc: prod.seoDesc,
        sortOrder: prod.sortOrder,
      },
      create: {
        ...prod,
      },
    });
    console.log(`✅ Updated product: ${prod.name}`);
  }

  console.log('🎉 Database update completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error updating DB:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

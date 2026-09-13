import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bekur.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'BekurAdmin2024!';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashSync(adminPassword, 12),
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log(`✅ Admin user created: ${adminEmail}`);

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      companyName: 'BEKUR GENERAL TRADING PLC',
      tagline: 'Reliable infrastructure, innovative technologies, sustainable solutions, and strategic partnerships.',
      email: 'bekurgeneraltradingplc@gmail.com',
      phone1: '+251 946 757 671',
      phone2: '+251 977 467 509',
      whatsappNumber: '+251946757671',
      whatsappMessage: 'Hello Bekur General Trading PLC, I would like to learn more about your solutions and services.',
      primaryCtaText: 'PARTNER WITH BEKUR',
      secondaryCtaText: 'EXPLORE OUR BUSINESS',
      contactCtaText: 'TALK TO BEKUR',
      footerText: 'Reliable infrastructure, innovative technologies, sustainable solutions, and strategic partnerships.',
      copyright: '© 2024 Bekur General Trading PLC. All rights reserved.',
    },
  });
  console.log('✅ Site settings created');

  // Homepage Sections
  const homepageSections = [
    {
      sectionKey: 'hero',
      title: 'BUILDING WHAT\'S NEXT.',
      subtitle: 'Reliable infrastructure, innovative technologies, sustainable solutions, and strategic partnerships for a changing Ethiopia.',
      ctaText: 'PARTNER WITH BEKUR',
      ctaLink: 'whatsapp',
      imageUrl: '/images/hero-infrastructure.jpg',
      overlayOpacity: 0.55,
      sortOrder: 0,
    },
    {
      sectionKey: 'intro',
      title: 'A DIVERSIFIED BUSINESS GROUP',
      content: 'Bekur General Trading PLC is a diversified Ethiopian business group committed to infrastructure development, innovative technologies, sustainable business solutions, and strategic investments.',
      ctaText: 'DISCOVER BEKUR',
      ctaLink: '/about',
      imageUrl: '/images/company-intro.jpg',
      sortOrder: 1,
    },
    {
      sectionKey: 'sectors',
      title: 'OUR BUSINESS SECTORS',
      subtitle: 'Driving growth across diverse industries with innovation and expertise.',
      sortOrder: 2,
    },
    {
      sectionKey: 'solutions',
      title: 'SOLUTIONS FOR MODERN ENVIRONMENTS',
      subtitle: 'Our product portfolio delivers innovative solutions for modern cities, businesses, institutions, and public infrastructure.',
      sortOrder: 3,
    },
    {
      sectionKey: 'whybekur',
      title: 'WHY BEKUR',
      subtitle: 'A trusted partner for infrastructure, technology, and sustainable development.',
      sortOrder: 4,
    },
    {
      sectionKey: 'visionmission',
      title: 'VISION & MISSION',
      sortOrder: 5,
      extraData: JSON.stringify({
        vision: 'To become a leading Ethiopian business group recognized for innovation, quality, and sustainable development across diverse industries.',
        mission: 'To deliver exceptional products, services, and business solutions that create value for customers, empower communities, and contribute to national development through integrity, innovation, and strategic partnerships.',
      }),
    },
    {
      sectionKey: 'values',
      title: 'OUR CORE VALUES',
      subtitle: 'The principles that guide everything we do.',
      sortOrder: 6,
    },
    {
      sectionKey: 'partnerships',
      title: 'STRONGER THROUGH PARTNERSHIP',
      subtitle: 'Building meaningful relationships that drive mutual growth and innovation.',
      sortOrder: 7,
    },
    {
      sectionKey: 'testimonials',
      title: 'WHAT OUR PARTNERS SAY',
      sortOrder: 8,
    },
    {
      sectionKey: 'future',
      title: 'THE NEXT CHAPTER',
      content: 'Bekur General Trading PLC aims to expand its operations through the adoption of new infrastructure technologies, regional market expansion, renewable energy solutions, and strategic investments.',
      imageUrl: '/images/future-expansion.jpg',
      sortOrder: 9,
      extraData: JSON.stringify({
        highlights: [
          'New infrastructure technologies',
          'Regional market expansion',
          'Renewable energy solutions',
          'Strategic investments',
          'Smart city development',
          'Subsidiary expansion',
        ],
        closingStatement: 'Bekur envisions becoming a leading diversified business group in Ethiopia and beyond, driving sustainable growth, innovation, and long-term value across multiple sectors.',
      }),
    },
    {
      sectionKey: 'finalcta',
      title: 'Ready to Build the Future Together?',
      subtitle: 'Partner with Bekur for infrastructure, technology, and sustainable development solutions.',
      ctaText: 'PARTNER WITH BEKUR',
      ctaLink: 'whatsapp',
      sortOrder: 10,
    },
  ];

  for (const section of homepageSections) {
    await prisma.homepageSection.upsert({
      where: { sectionKey: section.sectionKey },
      update: {},
      create: section,
    });
  }
  console.log('✅ Homepage sections created');

  // Sectors
  const sectors = [
    {
      title: 'Infrastructure Solutions',
      slug: 'infrastructure-solutions',
      description: 'Delivering robust infrastructure solutions for government institutions, commercial developments, and public projects across Ethiopia.',
      imageUrl: '/images/sectors/infrastructure-solutions.jpg',
      sortOrder: 0,
      fullContent: 'Bekur General Trading PLC provides comprehensive infrastructure solutions that support Ethiopia\'s growing development needs. From planning to execution, we deliver projects that meet international standards of quality and durability.',
    },
    {
      title: 'Lighting Technologies',
      slug: 'lighting-technologies',
      description: 'Advanced lighting systems for urban environments, industrial facilities, and public infrastructure projects.',
      imageUrl: '/images/sectors/lighting-technologies.jpg',
      sortOrder: 1,
      fullContent: 'Our lighting technology division provides innovative, energy-efficient lighting solutions for cities, industries, and institutions. From smart poles to high mast lighting, we deliver systems that enhance safety and sustainability.',
    },
    {
      title: 'Urban Development Solutions',
      slug: 'urban-development',
      description: 'Comprehensive urban development services shaping modern, sustainable, and livable cities.',
      imageUrl: '/images/sectors/urban-development.jpg',
      sortOrder: 2,
      fullContent: 'We support urban transformation through innovative planning, sustainable construction practices, and integrated development solutions that create modern, livable urban environments.',
    },
    {
      title: 'Smart City Technologies',
      slug: 'smart-city-technologies',
      description: 'Innovative smart city solutions integrating technology, connectivity, and sustainable urban planning.',
      imageUrl: '/images/sectors/smart-city-technologies.jpg',
      sortOrder: 3,
      fullContent: 'Bekur is at the forefront of smart city development in Ethiopia, bringing connected technologies and intelligent systems that improve urban efficiency, safety, and quality of life.',
    },
    {
      title: 'Coffee Trading & Export',
      slug: 'coffee-trading-export',
      description: 'Premium Ethiopian coffee sourcing, processing, and export to international markets.',
      imageUrl: '/images/sectors/coffee-trading-export.jpg',
      sortOrder: 4,
      fullContent: 'Ethiopia is the birthplace of coffee. Bekur leverages this rich heritage to source, process, and export premium Ethiopian coffee to discerning international markets.',
    },
    {
      title: 'Procurement & Supply',
      slug: 'procurement-supply',
      description: 'Professional procurement and supply chain management for government and private sector organizations.',
      imageUrl: '/images/sectors/procurement-supply.jpg',
      sortOrder: 5,
      fullContent: 'Our procurement division ensures reliable, timely, and cost-effective supply of quality products and materials for diverse industries and government institutions.',
    },
    {
      title: 'Entertainment & Recreation',
      slug: 'entertainment-recreation',
      description: 'Creating world-class entertainment and recreational facilities for communities and businesses.',
      imageUrl: '/images/sectors/entertainment-recreation.jpg',
      sortOrder: 6,
      fullContent: 'Bekur develops entertainment and recreational spaces that bring communities together and contribute to quality of life across Ethiopia.',
    },
    {
      title: 'Strategic Investments',
      slug: 'strategic-investments',
      description: 'Identifying and investing in high-growth opportunities across diverse sectors in Ethiopia and beyond.',
      imageUrl: '/images/sectors/strategic-investments.jpg',
      sortOrder: 7,
      fullContent: 'Our strategic investments division identifies opportunities across real estate, technology, manufacturing, and emerging sectors to generate long-term value and drive economic growth.',
    },
  ];

  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { slug: sector.slug },
      update: { imageUrl: sector.imageUrl },
      create: sector,
    });
  }
  console.log('✅ Sectors created');

  // Products
  const lightingSector = await prisma.sector.findUnique({
    where: { slug: 'lighting-technologies' },
  });

  const products = [
    {
      name: 'Smart Pole Solutions',
      slug: 'smart-pole-solutions',
      description: 'Smarter cities. Brighter tomorrows. Engineered for sustainable, connected, and people-friendly urban environments with integrated IoT capabilities.',
      imageUrl: '/images/products/smart-pole.jpg',
      images: JSON.stringify(['/images/products/smart-pole.jpg', '/images/products/catalog/smart-pole-sheet.jpg']),
      techInfo: 'Smart Adaptive Lighting • IoT Ready Architecture • Modern Urban Geometric Cantilever Design • Recessed Blue LED Accent Channel • Safe & Durable Anchor Base • Energy Efficient Operation',
      sectorId: lightingSector?.id,
      sortOrder: 0,
    },
    {
      name: 'Garden Pole Solutions',
      slug: 'garden-pole-systems',
      description: 'Garden Pole solutions combine sleek modern aesthetics and precision functionality to illuminate outdoor spaces, landscaped pathways, and public plazas.',
      imageUrl: '/images/products/garden-pole.jpg',
      images: JSON.stringify(['/images/products/garden-pole.jpg', '/images/products/catalog/garden-pole-sheet.jpg']),
      techInfo: 'Modern Geometric Square Luminaire • Precision Optics • Custom Heights Available • Durable Structure • Sturdy Base Foundation • Recessed Blue Accent LED Strip • Long Service Life',
      sectorId: lightingSector?.id,
      sortOrder: 1,
    },
    {
      name: 'Charger Box Stations',
      slug: 'charger-box-stations',
      description: 'The Charger Box provides convenient, reliable, and weather-resistant public and commercial electric vehicle and device charging solutions.',
      imageUrl: '/images/products/charger-box.jpg',
      images: JSON.stringify(['/images/products/charger-box.jpg', '/images/products/catalog/charger-box-sheet.jpg']),
      techInfo: 'Clean Architectural Tower • Illuminated Overhead LED Canopy • USB-A Ports • USB-C Fast Charging • Optional Wireless Charging • Heavy-Duty Cable Holders • Weather Resistant (IP65+) • Smart Monitoring Capability',
      sectorId: lightingSector?.id,
      sortOrder: 2,
    },
    {
      name: 'High Mast Lighting Systems',
      slug: 'high-mast-lighting',
      description: 'High Mast Lighting systems deliver powerful, wide-area illumination for large-scale environments including highways, airports, logistics centers, and ports.',
      imageUrl: '/images/products/high-mast-lighting.jpg',
      images: JSON.stringify(['/images/products/high-mast-lighting.jpg', '/images/products/catalog/high-mast-lighting-sheet.jpg']),
      techInfo: 'High-Performance LED Floodlight Arrays • Circular Crown Ring Design • Custom Heights Available (15m–40m) • Safe Maintenance Access Ladder • Durable Engineered Base Structure • Reduced Maintenance Overhead',
      sectorId: lightingSector?.id,
      sortOrder: 3,
    },
    {
      name: 'Sports Field Lighting',
      slug: 'sports-field-lighting',
      description: 'Professional sports lighting solutions designed for high-level training and competitive environments, providing uniform illumination with optimal glare reduction.',
      imageUrl: '/images/products/sports-field-lighting.jpg',
      images: JSON.stringify(['/images/products/sports-field-lighting.jpg', '/images/products/catalog/sports-field-lighting-sheet.jpg']),
      techInfo: 'High-Lumen Output LED Technology • Precision Glare-Controlled Optics • Corrosion-Resistant Powder Coating • Smart Remote Control Options • Multiple Fixture Configurations • Rugged Lattice & Tubular Construction',
      sectorId: lightingSector?.id,
      sortOrder: 4,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log('✅ Products created');

  // Partners
  const partners = [
    {
      name: 'SA Bamboo PLC',
      description: 'Bekur General Trading PLC proudly collaborates with SA Bamboo PLC, a recognized leader in sustainable manufacturing and innovative bamboo-based infrastructure solutions. The partnership supports environmentally responsible development and durable sustainable products for modern infrastructure projects.',
      sortOrder: 0,
    },
    {
      name: 'Green Soul Trading PLC',
      description: 'Green Soul Trading PLC shares our commitment to innovation, sustainability, and long-term value creation. Through this partnership, Bekur expands access to advanced technologies and sustainable infrastructure solutions that improve communities and support economic development.',
      sortOrder: 1,
    },
  ];

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({
      where: { name: partner.name },
    });
    if (!existing) {
      await prisma.partner.create({ data: partner });
    }
  }
  console.log('✅ Partners created');

  // Testimonials
  const testimonials = [
    {
      quote: 'Bekur General Trading PLC has proven to be a dependable and professional partner. Their commitment to quality and customer satisfaction aligns perfectly with our values.',
      author: 'SA Bamboo PLC',
      organization: 'SA Bamboo PLC',
      sortOrder: 0,
    },
    {
      quote: 'Our partnership with Bekur is built on trust, transparency, and shared goals. Their professionalism and dedication continue to deliver outstanding results.',
      author: 'Green Soul Trading PLC',
      organization: 'Green Soul Trading PLC',
      sortOrder: 1,
    },
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { quote: testimonial.quote },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
  console.log('✅ Testimonials created');

  // Core Values
  const values = [
    { number: '01', title: 'Integrity', description: 'We conduct business with honesty, transparency, and ethical responsibility in every interaction and decision.', sortOrder: 0 },
    { number: '02', title: 'Customer Focus', description: 'Our clients are at the center of everything we do. We deliver solutions that exceed expectations and create lasting value.', sortOrder: 1 },
    { number: '03', title: 'Excellence', description: 'We pursue the highest standards of quality in our products, services, and operations across every business sector.', sortOrder: 2 },
    { number: '04', title: 'Sustainability', description: 'We are committed to environmentally responsible practices that contribute to a sustainable future for Ethiopia and beyond.', sortOrder: 3 },
    { number: '05', title: 'Innovation', description: 'We embrace new technologies, creative thinking, and forward-looking solutions to drive progress and competitive advantage.', sortOrder: 4 },
    { number: '06', title: 'Partnership', description: 'We build strong, lasting relationships with partners, clients, and communities based on mutual trust and shared goals.', sortOrder: 5 },
  ];

  for (const value of values) {
    const existing = await prisma.coreValue.findFirst({
      where: { title: value.title },
    });
    if (!existing) {
      await prisma.coreValue.create({ data: value });
    }
  }
  console.log('✅ Core values created');

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

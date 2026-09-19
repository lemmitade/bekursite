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
    update: {
      logoUrl: '/images/logo-light.png',
      faviconUrl: '/images/logo.png',
    },
    create: {
      id: 'main',
      companyName: 'BEKUR GENERAL TRADING PLC',
      tagline: 'Reliable infrastructure, innovative technologies, sustainable solutions, and strategic partnerships.',
      logoUrl: '/images/logo-light.png',
      faviconUrl: '/images/logo.png',
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
      sectionKey: 'production_videos',
      title: 'PRECISION PRODUCTION & FINAL RESULTS',
      subtitle: 'Discover how Bekur transforms concept to reality — from high-precision CNC metal fabrication in our facilities to turnkey infrastructure landmarks across Ethiopia.',
      sortOrder: 4,
      extraData: JSON.stringify({
        videos: [
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
        ],
      }),
    },
    {
      sectionKey: 'whybekur',
      title: 'WHY BEKUR',
      subtitle: 'A trusted partner for infrastructure, technology, and sustainable development.',
      sortOrder: 5,
    },
    {
      sectionKey: 'visionmission',
      title: 'VISION & MISSION',
      sortOrder: 6,
      extraData: JSON.stringify({
        vision: 'To become a leading Ethiopian business group recognized for innovation, quality, and sustainable development across diverse industries.',
        mission: 'To deliver exceptional products, services, and business solutions that create value for customers, empower communities, and contribute to national development through integrity, innovation, and strategic partnerships.',
      }),
    },
    {
      sectionKey: 'values',
      title: 'OUR CORE VALUES',
      subtitle: 'The principles that guide everything we do.',
      sortOrder: 7,
    },
    {
      sectionKey: 'partnerships',
      title: 'STRONGER THROUGH PARTNERSHIP',
      subtitle: 'Building meaningful relationships that drive mutual growth and innovation.',
      sortOrder: 8,
    },
    {
      sectionKey: 'tiktok_videos',
      title: 'BEKUR ON TIKTOK',
      subtitle: 'Behind-the-scenes engineering, real-time testing, and short-form tech highlights. Tap any reel for an interactive preview.',
      sortOrder: 9,
      extraData: JSON.stringify({
        accountHandle: '@bekurtrading',
        accountUrl: 'https://www.tiktok.com/@bekurtrading',
        followerCount: '12.4K',
        videos: [
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
        ],
      }),
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
      update: {
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        ctaText: section.ctaText,
        ctaLink: section.ctaLink,
        imageUrl: section.imageUrl,
        sortOrder: section.sortOrder,
        extraData: section.extraData,
      },
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
      logoUrl: '/images/partners/sa-bamboo.png',
      sortOrder: 0,
    },
    {
      name: 'Green Soul Trading PLC',
      description: 'Green Soul Trading PLC shares our commitment to innovation, sustainability, and long-term value creation. Through this partnership, Bekur expands access to advanced technologies and sustainable infrastructure solutions that improve communities and support economic development.',
      logoUrl: '/images/partners/green-soul.png',
      sortOrder: 1,
    },
  ];

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({
      where: { name: partner.name },
    });
    if (existing) {
      await prisma.partner.update({
        where: { id: existing.id },
        data: { logoUrl: partner.logoUrl, description: partner.description },
      });
    } else {
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

  // Sister Companies
  const sisterCompanies = [
    {
      name: 'Kebron Coffee',
      slug: 'kebron-coffee',
      tagline: 'Specialty Ethiopian Coffee Sourcing, Artisanal Roasting & Global Export',
      description: 'Kebron Coffee is dedicated to sourcing, roasting, and exporting the finest single-origin and specialty Ethiopian Arabica coffees. Partnering directly with high-altitude farming washing stations in Yirgacheffe, Guji, and Sidama, Kebron Coffee blends ancestral coffee traditions with state-of-the-art cupping and clean roasting technology to supply distinguished buyers worldwide.',
      imageUrl: '/images/companies/kebron-coffee.jpg',
      website: 'https://bekurtrading.com/sister-companies#kebron-coffee',
      enabled: true,
      sortOrder: 0,
    },
    {
      name: 'Kebron Light',
      slug: 'kebron-light',
      tagline: 'Architectural, Commercial & Decorative Illumination Systems',
      description: 'Kebron Light transforms commercial spaces, luxury residences, hospitality resorts, and urban landscapes through high-performance architectural lighting fixtures. Specializing in minimalist linear LEDs, custom bespoke chandeliers, smart ambiance controls, and energy-saving illumination engineering, Kebron Light delivers brilliant aesthetics with industrial reliability.',
      imageUrl: '/images/companies/kebron-light.jpg',
      website: 'https://bekurtrading.com/sister-companies#kebron-light',
      enabled: true,
      sortOrder: 1,
    },
    {
      name: 'Kebron Skate',
      slug: 'kebron-skate',
      tagline: 'Youth Culture, Skatepark Infrastructure & Active Street Lifestyle',
      description: 'Kebron Skate is at the forefront of East Africa\'s emerging skateboarding and youth action-sports movement. Combining custom skateboard design, durable grip-tape manufacturing, active street apparel, and community skatepark civil construction, Kebron Skate empowers young creators and athletes through movement, discipline, and community development.',
      imageUrl: '/images/companies/kebron-skate.jpg',
      website: 'https://bekurtrading.com/sister-companies#kebron-skate',
      enabled: true,
      sortOrder: 2,
    },
  ];

  for (const company of sisterCompanies) {
    await prisma.sisterCompany.upsert({
      where: { slug: company.slug },
      update: {
        name: company.name,
        tagline: company.tagline,
        description: company.description,
        imageUrl: company.imageUrl,
        website: company.website,
        enabled: company.enabled,
        sortOrder: company.sortOrder,
      },
      create: company,
    });
  }
  console.log('✅ Sister companies created');

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

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

const productMeta: Record<string, {
  category: string;
  tagline: string;
  applications: string[];
  benefits: string[];
  specDetails: { label: string; value: string }[];
  catalogSheet: string;
}> = {
  'smart-pole-solutions': {
    category: 'Smart Urban Design',
    tagline: 'Smarter cities. Brighter tomorrows.',
    applications: ['Highways & Expressways', 'Smart City Districts', 'Urban Boulevards', 'Public Squares', 'Commercial Hubs'],
    benefits: ['Smart Adaptive Lighting', 'IoT Sensor Ready', 'Energy Efficient LEDs', 'Safe & Durable Structural Base', 'Smarter City Connectivity'],
    specDetails: [
      { label: 'Design Type', value: 'Modern Urban Geometric Cantilever' },
      { label: 'Lighting Tech', value: 'High Efficiency LED Array + Vertical Accent Strip' },
      { label: 'Connectivity', value: 'IoT Gateway / 4G / 5G / Smart Sensors' },
      { label: 'Installation', value: 'Heavy-Duty Reinforced Anchor Base Flange' },
      { label: 'Finish', value: 'Corrosion-Resistant Industrial Powder Coating' },
    ],
    catalogSheet: '/images/products/catalog/smart-pole-sheet.jpg',
  },
  'garden-pole-systems': {
    category: 'Outdoor Lighting Solutions',
    tagline: 'Aesthetics meets architectural functionality.',
    applications: ['Public Parks', 'Luxury Resorts', 'Residential Compounds', 'Hotels & Hospitality', 'Pedestrian Walkways'],
    benefits: ['Elegant Geometric Luminaire', 'High Energy Efficiency', 'Long Service Life', 'Enhanced Security Illumination'],
    specDetails: [
      { label: 'Luminaire Form', value: 'Open-Frame Geometric Square LED' },
      { label: 'Accent Feature', value: 'Recessed Vertical Blue LED Channel' },
      { label: 'Heights', value: 'Custom Heights Available upon Request' },
      { label: 'Structure', value: 'Heavy Gauge Weather-Resistant Alloy' },
      { label: 'Base', value: 'Precision Engineered Sturdy Foundation' },
    ],
    catalogSheet: '/images/products/catalog/garden-pole-sheet.jpg',
  },
  'charger-box-stations': {
    category: 'Smart Charging Solutions',
    tagline: 'Clean design. Smart function.',
    applications: ['Shopping Centers', 'Airports & Terminals', 'Universities & Campuses', 'Public Squares', 'Commercial Plazas'],
    benefits: ['Easy Accessibility', 'Durable Weatherproof Enclosure', 'Smart Monitoring Capability', 'User-Friendly Fast Charging'],
    specDetails: [
      { label: 'Port Options', value: 'USB-A, USB-C High-Speed Fast Charging' },
      { label: 'Wireless Option', value: 'Qi Wireless Charging Pad (Optional)' },
      { label: 'Protection', value: 'Weather Resistant Outdoor Enclosure (IP65+)' },
      { label: 'Cable Management', value: 'Heavy-Duty Industrial Cable Holders' },
      { label: 'Overhead Canopy', value: 'Illuminated LED Ambient Crown' },
    ],
    catalogSheet: '/images/products/catalog/charger-box-sheet.jpg',
  },
  'high-mast-lighting': {
    category: 'High Mast Infrastructure',
    tagline: 'Powerful illumination for large-scale environments.',
    applications: ['Highways & Interchanges', 'Airports & Flight Tarmacs', 'Industrial Complexes', 'Logistics Centers', 'Public Infrastructure'],
    benefits: ['Expansive Wide-Area Coverage', 'Reduced Maintenance Needs', 'Superior Energy Efficiency', 'Engineered Wind & Corrosion Resistance'],
    specDetails: [
      { label: 'Mounting Heights', value: '15 meters to 40 meters (Customizable)' },
      { label: 'Crown System', value: 'Heavy Duty Circular Ring with Multiple Fixtures' },
      { label: 'Access System', value: 'Integrated Safe Maintenance Ladder & Rest Platforms' },
      { label: 'Base System', value: 'Multi-Ribbed Heavy Steel Flange Foundation' },
      { label: 'Optics', value: 'Long-Throw Precision High Lumen LED Floodlights' },
    ],
    catalogSheet: '/images/products/catalog/high-mast-lighting-sheet.jpg',
  },
  'sports-field-lighting': {
    category: 'Sports & Stadium Lighting',
    tagline: 'Engineered for training and championship competition.',
    applications: ['Football & Soccer Stadiums', 'Athletic Arenas', 'Training Facilities', 'Multi-Purpose Sports Centers'],
    benefits: ['Uniform Pitch Illumination', 'Improved Visibility & Glare Control', 'Energy-Efficient Operation', 'Enhanced Spectator & Broadcast Experience'],
    specDetails: [
      { label: 'Luminaire Technology', value: 'High Lumen High-CRI Stadium LED Modules' },
      { label: 'Optics', value: 'Precision Asymmetric & Glare-Controlled Lenses' },
      { label: 'Control Systems', value: 'Smart Dimming & Scene Control Options' },
      { label: 'Mounting Structure', value: 'Rugged Lattice / High Strength Tubular Pole' },
      { label: 'Foundation', value: 'Reinforced Stable Concrete-Anchored Base' },
    ],
    catalogSheet: '/images/products/catalog/sports-field-lighting-sheet.jpg',
  },
};

const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  'smart-pole-solutions': '/images/products/smart-pole.jpg',
  'garden-pole-systems': '/images/products/garden-pole.jpg',
  'charger-box-stations': '/images/products/charger-box.jpg',
  'high-mast-lighting': '/images/products/high-mast-lighting.jpg',
  'sports-field-lighting': '/images/products/sports-field-lighting.jpg',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return { title: 'Product Not Found' };
    return {
      title: `${product.seoTitle || product.name} | BEKUR General Trading PLC`,
      description: product.seoDesc || product.description,
    };
  } catch {
    return { title: 'Product | BEKUR' };
  }
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  let product;
  let settings;
  try {
    [product, settings] = await Promise.all([
      prisma.product.findUnique({
        where: { slug },
        include: { sector: true },
      }),
      prisma.siteSettings.findFirst({ where: { id: 'main' } }),
    ]);
  } catch {}

  if (!product) notFound();

  const fallbackImg = DEFAULT_PRODUCT_IMAGES[slug] || '/images/hero-infrastructure.jpg';

  const meta = productMeta[slug] || {
    category: product.sector?.title || 'Infrastructure Solution',
    tagline: 'Engineered for modern infrastructure.',
    applications: ['Industrial', 'Urban Infrastructure', 'Commercial Environments'],
    benefits: ['Energy Efficient', 'Durable Construction', 'Superior Reliability'],
    specDetails: [],
    catalogSheet: product.imageUrl || fallbackImg,
  };

  const whatsappNumber = settings?.whatsappNumber || '+251946757671';
  const whatsappMessage = settings?.whatsappMessage || '';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">{product.name.split(' ')[0]}</div>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb__sep">/</span>
            <Link href="/solutions">Solutions</Link><span className="breadcrumb__sep">/</span>
            <span>{product.name}</span>
          </div>
          <span className="label">{meta.category}</span>
          <h1>{product.name}</h1>
          <p className="page-hero__desc">{meta.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div className="split">
            {/* Left Column: Product Render & Catalog Sheet Preview */}
            <div>
              <div className="intro__image-wrapper" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img
                  src={product.imageUrl || fallbackImg}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Official Catalog Sheet Banner */}
              <div style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-6)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: 'var(--text-base)' }}>
                      Official Catalog Brochure
                    </h4>
                    <p className="body-sm" style={{ color: 'var(--text-secondary)' }}>
                      View original technical spec sheet and dimension layouts
                    </p>
                  </div>
                  <a
                    href={meta.catalogSheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Open Spec Sheet (Full Resolution)
                  </a>
                </div>

                <div style={{ marginTop: 'var(--space-4)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                  <a href={meta.catalogSheet} target="_blank" rel="noopener noreferrer">
                    <img
                      src={meta.catalogSheet}
                      alt={`${product.name} Catalog Sheet`}
                      style={{ width: '100%', display: 'block', transition: 'transform var(--transition-base)' }}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Product Specs & Inquiry */}
            <div>
              <div className="gold-line" />
              <h2>Product Overview</h2>
              <p className="body-lg mt-6" style={{ lineHeight: 1.8 }}>
                {product.description}
              </p>

              {/* Core Benefits */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: 'var(--text-lg)' }}>
                  Key Benefits & Value
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                  {meta.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: 'var(--text-lg)' }}>
                  Target Applications
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                  {meta.applications.map((app, i) => (
                    <span
                      key={i}
                      style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'rgba(243, 188, 62, 0.1)',
                        border: '1px solid rgba(243, 188, 62, 0.3)',
                        color: 'var(--navy)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                      }}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              {meta.specDetails.length > 0 && (
                <div style={{ marginTop: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
                    Engineering Specifications
                  </h3>
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    {meta.specDetails.map((spec, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '160px 1fr',
                          padding: 'var(--space-3) var(--space-5)',
                          background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--card-bg)',
                          borderBottom: i < meta.specDetails.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{spec.label}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Tags */}
              {product.techInfo && (
                <div style={{ marginTop: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    Feature Highlights
                  </h3>
                  <div className="product-card__tech">
                    {product.techInfo.split('•').map((t: string, j: number) => (
                      t.trim() && <span key={j} className="product-card__tech-tag">{t.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="btn-group mt-10">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`${whatsappMessage} I am interested in ordering or requesting a quote for: ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--lg"
                >
                  Inquire via WhatsApp
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
                <Link href="/contact" className="btn btn--secondary btn--lg">Contact Sales Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Sister Companies | Bekur General Trading PLC',
  description:
    'Explore Bekur Group sister companies — Kebron Coffee, Kebron Light, and Kebron Skate — delivering excellence across specialty commodities, architectural lighting, and youth recreation in Ethiopia.',
};

interface SisterCompanyItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  imageUrl: string;
  website: string;
  enabled: boolean;
  sortOrder: number;
}

const DEFAULT_SISTER_COMPANIES: SisterCompanyItem[] = [
  {
    id: 'sc-1',
    name: 'Kebron Coffee',
    slug: 'kebron-coffee',
    tagline: 'Specialty Ethiopian Coffee Sourcing, Artisanal Roasting & Global Export',
    description:
      'Kebron Coffee is dedicated to celebrating and exporting the finest single-origin and specialty Ethiopian Arabica coffees. Partnering directly with high-altitude washing stations across Yirgacheffe, Guji, and Sidama, Kebron Coffee blends ancestral coffee traditions with state-of-the-art cupping and clean roasting technology to supply distinguished global buyers.',
    imageUrl: '/images/companies/kebron-coffee.jpg',
    website: 'https://wa.me/251946757671?text=Hello%20Bekur%20Group%2C%20I%20am%20interested%20in%20Kebron%20Coffee%20sourcing%20and%20export.',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'sc-2',
    name: 'Kebron Light',
    slug: 'kebron-light',
    tagline: 'Architectural, Commercial & Decorative Illumination Systems',
    description:
      'Kebron Light transforms commercial complexes, luxury residential developments, hospitality venues, and urban landmarks through high-performance architectural lighting fixtures. Specializing in minimalist linear LEDs, bespoke chandeliers, smart ambiance controls, and energy-saving illumination engineering, Kebron Light delivers brilliant aesthetics with industrial reliability.',
    imageUrl: '/images/companies/kebron-light.jpg',
    website: 'https://wa.me/251946757671?text=Hello%20Bekur%20Group%2C%20I%20am%20interested%20in%20Kebron%20Light%20fixtures%20and%20architectural%20systems.',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'sc-3',
    name: 'Kebron Skate',
    slug: 'kebron-skate',
    tagline: 'Youth Culture, Skatepark Infrastructure & Active Street Lifestyle',
    description:
      "Kebron Skate is at the forefront of East Africa's emerging skateboarding and youth action-sports movement. Combining custom skateboard deck design, durable grip-tape manufacturing, active street apparel, and community skatepark civil construction, Kebron Skate empowers young creators and athletes through movement, discipline, and community development.",
    imageUrl: '/images/companies/kebron-skate.jpg',
    website: 'https://wa.me/251946757671?text=Hello%20Bekur%20Group%2C%20I%20am%20interested%20in%20Kebron%20Skate%20initiatives%20and%20skatepark%20projects.',
    enabled: true,
    sortOrder: 2,
  },
];

const COMPANY_SPECIALTIES: Record<string, string[]> = {
  'kebron-coffee': [
    '☕ Single-Origin Specialty Arabica',
    '🌱 Direct Washing Station Partnerships',
    '🔥 Small-Batch Artisanal Roasting',
    '🌍 International Green & Roasted Export',
    '📜 Certified Quality Grading & Cupping',
  ],
  'kebron-light': [
    '💡 Architectural LED Luminaires',
    '✨ Bespoke Custom Chandeliers',
    '🏢 Commercial & Hospitality Illumination',
    '🎛 Smart Dimmable Scene Controls',
    '⚡ High-Efficiency Low-Glare Engineering',
  ],
  'kebron-skate': [
    '🛹 Custom Hard-Maple Skateboard Decks',
    '🛹 Skatepark Civil Design & Ramps',
    '👕 Active Urban Streetwear & Apparel',
    '🏆 Youth Sports Clinics & Mentorship',
    '🎨 Grassroots Urban Creative Culture',
  ],
};

async function getSisterCompanies() {
  try {
    const [companies, settings] = await Promise.all([
      prisma.sisterCompany.findMany({
        where: { enabled: true },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.siteSettings.findFirst({ where: { id: 'main' } }),
    ]);

    return {
      companies: companies.length > 0 ? companies : DEFAULT_SISTER_COMPANIES,
      settings,
    };
  } catch {
    return {
      companies: DEFAULT_SISTER_COMPANIES,
      settings: null,
    };
  }
}

export default async function SisterCompaniesPage() {
  const { companies, settings } = await getSisterCompanies();
  const whatsappNumber = settings?.whatsappNumber || '+251946757671';

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'var(--space-16) var(--space-4) var(--space-12)',
          background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.95) 0%, rgba(10, 10, 12, 1) 100%)',
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(243, 188, 62, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold)',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(243, 188, 62, 0.1)',
              border: '1px solid rgba(243, 188, 62, 0.25)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Bekur Group Ecosystem
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
              color: '#ffffff',
            }}
          >
            OUR SISTER COMPANIES
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              margin: '0 auto',
            }}
          >
            Specialized independent enterprises driving excellence across specialty commodities, architectural illumination,
            and youth lifestyle culture in Ethiopia and beyond.
          </p>
        </div>
      </section>

      {/* Companies Showcase List */}
      <section style={{ padding: 'var(--space-16) var(--space-4)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: 'var(--space-16)' }}>
          {companies.map((company, index) => {
            const isEven = index % 2 === 0;
            const companyImg = company.imageUrl || (company.slug === 'kebron-coffee' ? '/images/companies/kebron-coffee.jpg' : company.slug === 'kebron-light' ? '/images/companies/kebron-light.jpg' : '/images/companies/kebron-skate.jpg');
            const specialties = COMPANY_SPECIALTIES[company.slug] || [
              '⭐ Premium Quality Standards',
              '🏆 Proven Operational Reliability',
              '🤝 Strategic Partnerships',
            ];
            const inquiryUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hello Bekur General Trading PLC, I am inquiring about ${company.name}.`
            )}`;

            return (
              <article
                key={company.id}
                id={company.slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'var(--space-10)',
                  alignItems: 'center',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(var(--space-6), 4vw, var(--space-10))',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 1 High-Resolution Image */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
                    background: '#000',
                  }}
                >
                  <img
                    src={companyImg}
                    alt={company.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      left: 'var(--space-3)',
                      background: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--gold)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(243, 188, 62, 0.3)',
                    }}
                  >
                    Sister Entity #{index + 1}
                  </div>
                </div>

                {/* Content & Description */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <h2
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {company.name}
                    </h2>
                  </div>

                  {company.tagline && (
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {company.tagline}
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.7,
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    {company.description}
                  </p>

                  {/* Highlights / Specializations */}
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h4
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--color-text-muted)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      Key Focus & Capabilities
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {specialties.map((spec, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 500,
                            padding: '6px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      <span>Inquire via WhatsApp</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>

                    {company.website && !company.website.startsWith('#') && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                      >
                        Visit Website ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Synergies Section */}
      <section
        style={{
          padding: 'var(--space-16) var(--space-4)',
          background: 'linear-gradient(180deg, var(--surface-bg) 0%, rgba(10, 10, 12, 1) 100%)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h3
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 'var(--space-3)',
            }}
          >
            Partnering Across Diverse Industries
          </h3>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)',
            }}
          >
            From urban smart infrastructure and lighting technologies to specialty coffee exports and youth recreation, Bekur
            Group provides integrated business capabilities for long-term sustainable growth in Ethiopia.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--primary">
              Contact Bekur Group
            </Link>
            <Link href="/solutions" className="btn btn--secondary">
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

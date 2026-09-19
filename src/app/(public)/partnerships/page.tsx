import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partnerships | BEKUR General Trading PLC',
  description: 'Discover Bekur\'s strategic partnerships with SA Bamboo PLC, Green Soul Trading PLC, and other organizations driving sustainable development.',
};

const DEFAULT_PARTNER_LOGOS: Record<string, string> = {
  'sa bamboo': '/images/partners/sa-bamboo.png',
  'green soul': '/images/partners/green-soul.png',
};

function getPartnerLogo(partner: { name: string; logoUrl?: string }) {
  if (partner.logoUrl) return partner.logoUrl;
  const lower = partner.name.toLowerCase();
  for (const [k, v] of Object.entries(DEFAULT_PARTNER_LOGOS)) {
    if (lower.includes(k)) return v;
  }
  return '';
}

export default async function PartnershipsPage() {
  let partners: any[] = [];
  let testimonials: any[] = [];
  try {
    partners = await prisma.partner.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } });
    testimonials = await prisma.testimonial.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } });
  } catch {}

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">PARTNERS</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb__sep">/</span><span>Partnerships</span>
          </div>
          <span className="label">Collaboration</span>
          <h1>Stronger Through Partnership</h1>
          <p className="page-hero__desc">Building meaningful relationships that drive mutual growth, innovation, and sustainable development.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
            {partners.map(partner => {
              const logo = getPartnerLogo(partner);
              return (
                <div key={partner.id} className="partner-card">
                  <div className="partner-card__logo">
                    {logo ? (
                      <img src={logo} alt={partner.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      partner.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
                    )}
                  </div>
                  <div>
                    <h3 className="h3">{partner.name}</h3>
                    <p className="body-sm mt-4" style={{ lineHeight: 1.7 }}>{partner.description}</p>
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="btn btn--secondary mt-6" style={{ fontSize: 'var(--text-xs)' }}>
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="text-center mb-10">
              <span className="label">Testimonials</span>
              <h2>What Our Partners Say</h2>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-8)', maxWidth: '800px', margin: '0 auto' }}>
              {testimonials.map(t => (
                <div key={t.id} className="testimonial-card" style={{ padding: 'var(--space-10) 0' }}>
                  <div className="testimonial-card__quote-mark">&ldquo;</div>
                  <p className="testimonial-card__text">{t.quote}</p>
                  <div className="testimonial-card__author">— {t.author}</div>
                  <div className="testimonial-card__org">{t.organization}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

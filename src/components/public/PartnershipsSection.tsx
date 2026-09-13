'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
}

export default function PartnershipsSection({ title, subtitle, partners }: { title: string; subtitle: string; partners: Partner[] }) {
  useScrollReveal();

  return (
    <section className="section" id="partnerships">
      <div className="container">
        <div className="text-center reveal mb-10">
          <span className="label">Collaboration</span>
          <h2>{title}</h2>
          {subtitle && <p className="body-lg mt-4 mx-auto" style={{ maxWidth: '600px' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-6)', maxWidth: '900px', margin: '0 auto' }}>
          {partners.map((partner, i) => (
            <div key={partner.id} className={`partner-card reveal reveal--delay-${i + 1}`}>
              <div className="partner-card__logo">
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={partner.name} />
                ) : (
                  partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)
                )}
              </div>
              <div>
                <h3 className="h3">{partner.name}</h3>
                <p className="body-sm mt-4" style={{ lineHeight: 1.7 }}>{partner.description}</p>
                {partner.website && (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="btn btn--secondary mt-6" style={{ fontSize: 'var(--text-xs)' }}>
                    Visit Website
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Sectors | BEKUR General Trading PLC',
  description: 'Explore Bekur\'s diverse business sectors: infrastructure solutions, lighting technologies, smart city development, coffee trading, procurement, and strategic investments.',
};

const sectorColors = [
  'linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)',
  'linear-gradient(135deg, #132640 0%, #1E3350 100%)',
  'linear-gradient(135deg, #071525 0%, #0B1F3A 100%)',
  'linear-gradient(135deg, #1E3350 0%, #2a4a6c 100%)',
  'linear-gradient(135deg, #0B1F3A 0%, #132640 100%)',
  'linear-gradient(135deg, #162A45 0%, #1E3350 100%)',
  'linear-gradient(135deg, #071525 0%, #162A45 100%)',
  'linear-gradient(135deg, #132640 0%, #0B1F3A 100%)',
];

export default async function SectorsPage() {
  let sectors: any[] = [];
  try {
    sectors = await prisma.sector.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } });
  } catch {}

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">SECTORS</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb__sep">/</span><span>Sectors</span>
          </div>
          <span className="label">Our Business</span>
          <h1>Business Sectors</h1>
          <p className="page-hero__desc">Driving growth across diverse industries with innovation, quality, and strategic vision.</p>
        </div>
      </section>

      <section className="section">
        <div className="sectors-grid">
          {sectors.map((sector, i) => (
            <Link href={`/sectors/${sector.slug}`} key={sector.id} className="sector-card">
              <div className="sector-card__image">
                {sector.imageUrl ? (
                  <img src={sector.imageUrl} alt={sector.title} loading="lazy" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: sectorColors[i % sectorColors.length] }} />
                )}
              </div>
              <div className="sector-card__overlay" />
              <div className="sector-card__content">
                <span className="sector-card__number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="sector-card__title">{sector.title}</h3>
                <p className="sector-card__desc">{sector.description}</p>
                <span className="sector-card__cta">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

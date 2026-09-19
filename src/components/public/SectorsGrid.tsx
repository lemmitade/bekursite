'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Sector {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

interface SectorsGridProps {
  title: string;
  subtitle: string;
  sectors: Sector[];
}

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

const DEFAULT_SECTOR_IMAGES: Record<string, string> = {
  'infrastructure-solutions': '/images/sectors/infrastructure-solutions.jpg',
  'lighting-technologies': '/images/sectors/lighting-technologies.jpg',
  'urban-development': '/images/sectors/urban-development.jpg',
  'smart-city-technologies': '/images/sectors/smart-city-technologies.jpg',
  'coffee-trading-export': '/images/sectors/coffee-trading-export.jpg',
  'procurement-supply': '/images/sectors/procurement-supply.jpg',
  'entertainment-recreation': '/images/sectors/entertainment-recreation.jpg',
  'strategic-investments': '/images/sectors/strategic-investments.jpg',
};

export default function SectorsGrid({ title, subtitle, sectors }: SectorsGridProps) {
  useScrollReveal();

  return (
    <section className="section section--alt" id="sectors">
      <div className="container">
        <div className="text-center reveal mb-10">
          <span className="label">What We Do</span>
          <h2>{title}</h2>
          {subtitle && <p className="body-lg mt-4 mx-auto" style={{ maxWidth: '600px' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="sectors-grid reveal">
        {sectors.map((sector, i) => {
          const imgSrc = sector.imageUrl || DEFAULT_SECTOR_IMAGES[sector.slug];
          return (
            <Link href={`/sectors/${sector.slug}`} key={sector.id} className="sector-card">
              <div className="sector-card__image">
                {imgSrc ? (
                  <img src={imgSrc} alt={sector.title} loading="lazy" />
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
          );
        })}
      </div>
    </section>
  );
}

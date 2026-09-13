import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions & Products | BEKUR General Trading PLC',
  description: 'Explore Bekur\'s innovative product portfolio: smart poles, garden lighting, EV charger stations, high mast lighting, and sports field lighting for modern infrastructure.',
};

const productCatalogSheets: Record<string, string> = {
  'smart-pole-solutions': '/images/products/catalog/smart-pole-sheet.jpg',
  'garden-pole-systems': '/images/products/catalog/garden-pole-sheet.jpg',
  'charger-box-stations': '/images/products/catalog/charger-box-sheet.jpg',
  'high-mast-lighting': '/images/products/catalog/high-mast-lighting-sheet.jpg',
  'sports-field-lighting': '/images/products/catalog/sports-field-lighting-sheet.jpg',
};

export default async function SolutionsPage() {
  let products: any[] = [];
  let settings: any = null;
  try {
    products = await prisma.product.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: 'asc' },
      include: { sector: true },
    });
    settings = await prisma.siteSettings.findFirst({ where: { id: 'main' } });
  } catch {}

  const whatsappNumber = settings?.whatsappNumber || '+251946757671';
  const whatsappMessage = settings?.whatsappMessage || '';
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">SOLUTIONS</div>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb__sep">/</span><span>Solutions</span>
          </div>
          <span className="label">Products & Solutions</span>
          <h1>Solutions for Modern Environments</h1>
          <p className="page-hero__desc">
            Our specialized product portfolio delivers next-generation illumination, smart city connectivity, and charging infrastructure for modern cities, businesses, and public facilities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
            {products.map((product, i) => {
              const sheetUrl = productCatalogSheets[product.slug];
              return (
                <div key={product.id} className="product-card" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <div className="product-card__image" style={{ position: 'relative' }}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} loading="lazy" />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        background: `linear-gradient(135deg, ${i % 2 === 0 ? '#0B1F3A, #1E3350' : '#071525, #132640'})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(243,188,62,0.15)',
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, textTransform: 'uppercase',
                        padding: '2rem', textAlign: 'center',
                      }}>{product.name}</div>
                    )}
                    {sheetUrl && (
                      <a
                        href={sheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          position: 'absolute',
                          bottom: 'var(--space-3)',
                          left: 'var(--space-3)',
                          background: 'rgba(7, 21, 37, 0.85)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(243, 188, 62, 0.4)',
                          color: 'var(--gold)',
                          padding: 'var(--space-1) var(--space-3)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 500,
                          borderRadius: 'var(--radius-sm)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>
                        Spec Sheet
                      </a>
                    )}
                  </div>
                  <div className="product-card__body">
                    <span className="editorial-number">{String(i + 1).padStart(2, '0')}</span>
                    {product.sector && <span className="label mt-4">{product.sector.title}</span>}
                    <h3 className="mt-4">{product.name}</h3>
                    <p className="body-md mt-4" style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                      {product.description}
                    </p>
                    {product.techInfo && (
                      <div className="product-card__tech mt-6">
                        {product.techInfo.split('•').map((t: string, j: number) => (
                          t.trim() && <span key={j} className="product-card__tech-tag">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    <div className="btn-group mt-8">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`${whatsappMessage} I am interested in: ${product.name}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn--primary"
                      >
                        Inquire via WhatsApp
                      </a>
                      <Link href={`/solutions/${product.slug}`} className="btn btn--secondary">
                        View Details & Specs
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

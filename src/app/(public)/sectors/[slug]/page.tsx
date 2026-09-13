import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const sector = await prisma.sector.findUnique({ where: { slug } });
    if (!sector) return { title: 'Sector Not Found' };
    return {
      title: `${sector.seoTitle || sector.title} | BEKUR General Trading PLC`,
      description: sector.seoDesc || sector.description,
    };
  } catch {
    return { title: 'Sector | BEKUR' };
  }
}

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let sector;
  let products: any[] = [];
  try {
    sector = await prisma.sector.findUnique({ where: { slug } });
    if (sector) {
      products = await prisma.product.findMany({
        where: { sectorId: sector.id, enabled: true },
        orderBy: { sortOrder: 'asc' },
      });
    }
  } catch {}

  if (!sector) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">{sector.title.split(' ')[0]}</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb__sep">/</span>
            <a href="/sectors">Sectors</a><span className="breadcrumb__sep">/</span>
            <span>{sector.title}</span>
          </div>
          <span className="label">Business Sector</span>
          <h1>{sector.title}</h1>
          <p className="page-hero__desc">{sector.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div className="split">
            <div>
              <div className="gold-line" />
              <h2>Overview</h2>
              <p className="body-lg mt-6">{sector.fullContent || sector.description}</p>
              <Link href="/contact" className="btn btn--primary mt-8">INQUIRE ABOUT THIS SECTOR</Link>
            </div>
            <div>
              <div className="intro__image-wrapper">
                {sector.imageUrl ? (
                  <img src={sector.imageUrl} alt={sector.title} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, #0B1F3A, #1E3350)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(243,188,62,0.15)',
                    fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 700,
                  }}>{sector.title.split(' ').map((w: string) => w[0]).join('')}</div>
                )}
                <div className="intro__image-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="section section--alt">
          <div className="container container--content">
            <div className="text-center mb-10">
              <span className="label">Related Products</span>
              <h2>Solutions in This Sector</h2>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
              {products.map(product => (
                <Link href={`/solutions/${product.slug}`} key={product.id} className="product-card">
                  <div className="product-card__image">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        background: 'linear-gradient(135deg, #0B1F3A, #132640)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(243,188,62,0.2)',
                        fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600,
                      }}>{product.name}</div>
                    )}
                  </div>
                  <div className="product-card__body">
                    <span className="label">Product</span>
                    <h3>{product.name}</h3>
                    <p className="body-sm mt-4">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Expansion | BEKUR General Trading PLC',
  description: 'Bekur\'s vision for the future: new infrastructure technologies, regional market expansion, renewable energy solutions, and strategic investments.',
};

export default async function FuturePage() {
  let section: any = null;
  try {
    section = await prisma.homepageSection.findUnique({ where: { sectionKey: 'future' } });
  } catch {}

  const data = section?.extraData ? JSON.parse(section.extraData) : {};

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">FUTURE</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb__sep">/</span><span>Future</span>
          </div>
          <span className="label">Looking Ahead</span>
          <h1>The Next Chapter</h1>
          <p className="page-hero__desc">Expanding operations through innovation, technology, and strategic vision.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div className="split">
            <div>
              <div className="gold-line" />
              <h2>Our Growth Vision</h2>
              <p className="body-lg mt-6">{section?.content || 'Bekur General Trading PLC aims to expand its operations through the adoption of new infrastructure technologies, regional market expansion, renewable energy solutions, and strategic investments.'}</p>
            </div>
            <div>
              <div className="intro__image-wrapper">
                <img
                  src={section?.imageUrl || '/images/future-expansion.jpg'}
                  alt="Bekur Future Expansion"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="intro__image-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--content text-center">
          <span className="label">Strategic Focus Areas</span>
          <h2 className="mb-10">Where We&apos;re Headed</h2>
          <div className="cinematic__highlights" style={{ justifyContent: 'center' }}>
            {(data.highlights || [
              'New infrastructure technologies',
              'Regional market expansion',
              'Renewable energy solutions',
              'Strategic investments',
              'Smart city development',
              'Subsidiary expansion',
            ]).map((h: string, i: number) => (
              <span key={i} className="cinematic__tag" style={{ borderColor: 'rgba(243,188,62,0.4)', color: 'var(--gold)' }}>{h}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cinematic">
        <div className="cinematic__bg">
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #071525 0%, #0B1F3A 50%, #071525 100%)' }} />
        </div>
        <div className="cinematic__overlay" />
        <div className="cinematic__content container">
          <div className="gold-line gold-line--center" />
          <h2 className="text-white">Our Promise</h2>
          <p className="cinematic__closing" style={{ marginTop: 'var(--space-8)' }}>
            {data.closingStatement || 'Bekur envisions becoming a leading diversified business group in Ethiopia and beyond, driving sustainable growth, innovation, and long-term value across multiple sectors.'}
          </p>
          <a href="/contact" className="btn btn--primary btn--lg mt-10">PARTNER WITH BEKUR</a>
        </div>
      </section>
    </>
  );
}

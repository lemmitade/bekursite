import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | BEKUR General Trading PLC',
  description: 'Learn about Bekur General Trading PLC — a diversified Ethiopian business group committed to infrastructure development, innovative technologies, and sustainable solutions.',
};

async function getAboutData() {
  try {
    const [sections, values] = await Promise.all([
      prisma.homepageSection.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.coreValue.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);
    return { sections, values };
  } catch {
    return { sections: [], values: [] };
  }
}

export default async function AboutPage() {
  const { sections, values } = await getAboutData();
  const vmSection = sections.find(s => s.sectionKey === 'visionmission');
  const vmData = vmSection?.extraData ? JSON.parse(vmSection.extraData) : {};

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">ABOUT</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb__sep">/</span>
            <span>About</span>
          </div>
          <span className="label">About Bekur</span>
          <h1>A Diversified Ethiopian Business Group</h1>
          <p className="page-hero__desc">Building infrastructure, driving innovation, and creating sustainable value for Ethiopia&apos;s future.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div className="split">
            <div>
              <span className="editorial-number">01</span>
              <div className="gold-line" />
              <h2>Who We Are</h2>
              <p className="body-lg mt-6">
                Bekur General Trading PLC is a diversified Ethiopian business group committed to infrastructure development, innovative technologies, sustainable business solutions, and strategic investments.
              </p>
              <p className="body-lg mt-4">
                The company serves government institutions, private organizations, industrial facilities, commercial developments, and public infrastructure projects.
              </p>
              <p className="body-lg mt-4">
                Bekur combines strong partnerships, innovative solutions, quality products, and professional service to contribute to Ethiopia&apos;s economic growth.
              </p>
            </div>
            <div>
              <div className="intro__image-wrapper">
                <img
                  src="/images/about-corporate.jpg"
                  alt="Bekur General Trading Headquarters & Operations"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="intro__image-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--content">
          <div className="split">
            <div>
              <span className="editorial-number">02</span>
              <div className="gold-line" />
              <h2>Our Name</h2>
              <p className="body-lg mt-6">
                The name &ldquo;Bekur&rdquo; represents <strong>leadership</strong>, <strong>responsibility</strong>, and a <strong>pioneering spirit</strong>. Our visual identity is established, confident, sophisticated, and forward-looking.
              </p>
            </div>
            <div>
              <span className="editorial-number">03</span>
              <div className="gold-line" />
              <h2>Who We Serve</h2>
              <p className="body-lg mt-6">
                Government institutions, private organizations, industrial facilities, commercial developments, and public infrastructure projects across Ethiopia and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="vm-split">
        <div className="vm-panel vm-panel--vision">
          <span className="vm-panel__label">Our Vision</span>
          <p className="vm-panel__text">{vmData.vision || 'To become a leading Ethiopian business group recognized for innovation, quality, and sustainable development across diverse industries.'}</p>
          <div className="vm-panel__accent" />
        </div>
        <div className="vm-panel vm-panel--mission">
          <span className="vm-panel__label">Our Mission</span>
          <p className="vm-panel__text">{vmData.mission || 'To deliver exceptional products, services, and business solutions that create value for customers, empower communities, and contribute to national development through integrity, innovation, and strategic partnerships.'}</p>
          <div className="vm-panel__accent" />
        </div>
      </div>

      {values.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center mb-10">
              <span className="label">Our Foundation</span>
              <h2>Core Values</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map(value => (
              <div key={value.id} className="value-card">
                <div className="value-card__number">{value.number}</div>
                <h4 className="value-card__title">{value.title}</h4>
                <p className="value-card__desc">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

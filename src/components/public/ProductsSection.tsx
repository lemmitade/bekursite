'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  techInfo: string;
  sector?: { title: string } | null;
}

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  whatsappNumber: string;
  whatsappMessage: string;
}

// Meta mapping to enrich product display directly from the catalog brochures
const productMeta: Record<string, {
  category: string;
  tagline: string;
  applications: string[];
  benefits: string[];
  highlight: string;
}> = {
  'smart-pole-solutions': {
    category: 'Smart Urban Design',
    tagline: 'Smarter cities. Brighter tomorrows.',
    applications: ['Highways & Boulevards', 'Smart Cities', 'Urban Plazas', 'Commercial Hubs'],
    benefits: ['Smart Lighting & Dimming', 'IoT Sensor Ready', 'Energy Efficient LEDs', 'Safe & Durable Base'],
    highlight: 'IoT Ready & Connected',
  },
  'garden-pole-systems': {
    category: 'Outdoor Lighting Solutions',
    tagline: 'Aesthetics meets architectural functionality.',
    applications: ['Parks & Walkways', 'Resorts', 'Residential Compounds', 'Hotels & Plazas'],
    benefits: ['Elegant Geometric Design', 'Energy Efficient Luminaire', 'Long Service Life', 'Enhanced Security'],
    highlight: 'Precision Geometric LED',
  },
  'charger-box-stations': {
    category: 'Smart Charging Solutions',
    tagline: 'Clean design. Smart function.',
    applications: ['Shopping Centers', 'Airports', 'Universities', 'Public Squares', 'Commercial Buildings'],
    benefits: ['Easy Accessibility', 'Durable Heavy-Duty Steel', 'Smart Monitoring Capability', 'User-Friendly Operation'],
    highlight: 'USB-A/C & EV Capability',
  },
  'high-mast-lighting': {
    category: 'High Mast Infrastructure',
    tagline: 'Powerful illumination for large-scale environments.',
    applications: ['Highways & Interchanges', 'Airports & Runways', 'Industrial Parks', 'Logistics Centers'],
    benefits: ['Wide Area Coverage', 'Reduced Maintenance', 'Superior Energy Efficiency', 'Engineered Wind Resistance'],
    highlight: 'Up to 40m Custom Heights',
  },
  'sports-field-lighting': {
    category: 'Sports & Stadium Lighting',
    tagline: 'Engineered for training and championship competition.',
    applications: ['Football Fields', 'Stadiums', 'Athletic Facilities', 'Community Sports Centers'],
    benefits: ['Uniform Illumination', 'Precision Glare Control', 'Energy-Efficient Operation', 'Broadcast-Quality Visibility'],
    highlight: 'High Lumen Modular Array',
  },
};

export default function ProductsSection({
  title = 'SOLUTIONS FOR MODERN ENVIRONMENTS',
  subtitle = 'Our product portfolio delivers innovative solutions for modern cities, businesses, institutions, and public infrastructure.',
  products,
  whatsappNumber,
  whatsappMessage,
}: ProductsSectionProps) {
  useScrollReveal();
  const [activeSlug, setActiveSlug] = useState<string>(products[0]?.slug || 'smart-pole-solutions');

  const activeProduct = products.find((p) => p.slug === activeSlug) || products[0];
  const meta = activeProduct ? (productMeta[activeProduct.slug] || {
    category: activeProduct.sector?.title || 'Solution',
    tagline: 'Engineered for modern infrastructure.',
    applications: ['Infrastructure', 'Urban Development', 'Public Spaces'],
    benefits: ['Energy Efficient', 'Durable Construction', 'Low Maintenance'],
    highlight: 'Certified Quality',
  }) : null;

  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section className="section section--products" id="solutions-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center reveal mb-10">
          <span className="label">Featured Portfolio</span>
          <h2>{title}</h2>
          {subtitle && (
            <p className="body-lg mt-4 mx-auto" style={{ maxWidth: '680px' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Product Selector Navigation Tabs */}
        <div className="product-tabs reveal mb-10">
          {products.map((prod) => {
            const m = productMeta[prod.slug];
            const isActive = prod.slug === activeProduct?.slug;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveSlug(prod.slug)}
                className={`product-tab-btn ${isActive ? 'product-tab-btn--active' : ''}`}
                type="button"
              >
                <span className="product-tab-btn__cat">{m?.category || 'Product'}</span>
                <span className="product-tab-btn__name">{prod.name.replace(' Systems', '').replace(' Solutions', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Feature Showcase Card */}
        {activeProduct && meta && (
          <div className="product-showcase reveal">
            <div className="product-showcase__grid">
              {/* Image side */}
              <div className="product-showcase__media">
                <div className="product-showcase__image-wrap">
                  <img
                    src={activeProduct.imageUrl || '/images/hero-infrastructure.jpg'}
                    alt={activeProduct.name}
                    className="product-showcase__img"
                  />
                  <div className="product-showcase__badge">
                    <span>{meta.highlight}</span>
                  </div>
                </div>

                {/* Sub-strip with brochure quick preview */}
                <div className="product-showcase__meta-bar">
                  <span className="product-showcase__meta-label">Technical Catalog Sheet:</span>
                  <a
                    href={`/images/products/catalog/${activeProduct.slug === 'smart-pole-solutions' ? 'smart-pole-sheet.jpg' : activeProduct.slug === 'garden-pole-systems' ? 'garden-pole-sheet.jpg' : activeProduct.slug === 'charger-box-stations' ? 'charger-box-sheet.jpg' : activeProduct.slug === 'high-mast-lighting' ? 'high-mast-lighting-sheet.jpg' : 'sports-field-lighting-sheet.jpg'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-showcase__brochure-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    View Official Catalog Spec Sheet
                  </a>
                </div>
              </div>

              {/* Information side */}
              <div className="product-showcase__info">
                <div className="product-showcase__header">
                  <span className="label">{meta.category}</span>
                  <h3 className="product-showcase__title mt-2">{activeProduct.name}</h3>
                  <p className="product-showcase__tagline">{meta.tagline}</p>
                </div>

                <p className="body-md product-showcase__desc mt-4">
                  {activeProduct.description}
                </p>

                {/* Key Benefits */}
                <div className="product-showcase__block mt-6">
                  <h4 className="product-showcase__subtitle">Core Advantages</h4>
                  <div className="product-showcase__benefits-grid">
                    {meta.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="product-showcase__benefit-item">
                        <svg className="product-showcase__check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="product-showcase__block mt-6">
                  <h4 className="product-showcase__subtitle">Key Applications</h4>
                  <div className="product-showcase__apps">
                    {meta.applications.map((app, aIdx) => (
                      <span key={aIdx} className="product-showcase__app-pill">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specs Summary */}
                {activeProduct.techInfo && (
                  <div className="product-showcase__block mt-6">
                    <h4 className="product-showcase__subtitle">Technical Highlights</h4>
                    <div className="product-card__tech">
                      {activeProduct.techInfo.split('•').map((t, idx) => (
                        t.trim() && (
                          <span key={idx} className="product-card__tech-tag">
                            {t.trim()}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="product-showcase__actions mt-8">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`${whatsappMessage} I am interested in inquiring about ${activeProduct.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    Inquire via WhatsApp
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <Link href={`/solutions/${activeProduct.slug}`} className="btn btn--secondary">
                    View Full Specifications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom link to view full catalog */}
        <div className="text-center mt-12 reveal">
          <Link href="/solutions" className="btn btn--outline-white btn--lg">
            Explore All 5 Solutions & Technical Specifications
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

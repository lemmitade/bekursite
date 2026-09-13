'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CompanyIntroProps {
  title: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export default function CompanyIntro({ title, content, ctaText, ctaLink, imageUrl }: CompanyIntroProps) {
  useScrollReveal();

  return (
    <section className="section" id="company-intro">
      <div className="container">
        <div className="split split--asymmetric">
          <div className="reveal" style={{ position: 'relative' }}>
            <span className="editorial-number">01</span>
            <div className="gold-line" />
            <span className="label">About Bekur</span>
            <h2>{title}</h2>
            <p className="body-lg mt-6">{content}</p>
            <a href={ctaLink} className="btn btn--secondary mt-8">
              {ctaText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
          <div className="reveal reveal--delay-2">
            <div className="intro__image-wrapper">
              {imageUrl ? (
                <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #0B1F3A 0%, #132640 50%, #1E3350 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(243,188,62,0.15)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  B
                </div>
              )}
              <div className="intro__image-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

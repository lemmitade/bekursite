'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FinalCTAProps {
  title: string;
  subtitle: string;
  ctaText: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

export default function FinalCTA({ title, subtitle, ctaText, whatsappNumber, whatsappMessage }: FinalCTAProps) {
  useScrollReveal();
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="final-cta reveal" id="final-cta">
      <div className="container">
        <h2 className="final-cta__title">{title}</h2>
        <p className="final-cta__desc">{subtitle}</p>
        <div className="btn-group" style={{ justifyContent: 'center' }}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            {ctaText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="/contact" className="btn btn--outline-white btn--lg">CONTACT US</a>
        </div>
      </div>
    </section>
  );
}

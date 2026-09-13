'use client';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  secondaryCtaText: string;
}

export default function Hero({ title, subtitle, ctaText, ctaLink, imageUrl, whatsappNumber, whatsappMessage, secondaryCtaText }: HeroProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const primaryHref = ctaLink === 'whatsapp' ? whatsappUrl : ctaLink;

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, #071525 0%, #0B1F3A 30%, #132640 60%, #0B1F3A 100%)`,
        }}>
          {imageUrl && <img src={imageUrl} alt="Bekur infrastructure" loading="eager" />}
        </div>
      </div>
      <div className="hero__overlay" />
      <div className="hero__content container">
        <span className="hero__label">BEKUR GENERAL TRADING PLC</span>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__description">{subtitle}</p>
        <div className="btn-group">
          <a href={primaryHref} target={ctaLink === 'whatsapp' ? '_blank' : undefined} rel={ctaLink === 'whatsapp' ? 'noopener noreferrer' : undefined} className="btn btn--primary btn--lg">
            {ctaText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="/sectors" className="btn btn--outline-white btn--lg">
            {secondaryCtaText}
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

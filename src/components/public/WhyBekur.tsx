'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const whyItems = [
  { icon: 'shield', title: 'Reliable & Professional', desc: 'Consistent delivery of professional services backed by years of operational excellence and deep industry expertise.' },
  { icon: 'globe', title: 'Strong Partnerships', desc: 'Strategic local and international partnerships that expand capabilities and create greater value for clients.' },
  { icon: 'lightbulb', title: 'Innovative Solutions', desc: 'Cutting-edge infrastructure and technology solutions designed for the challenges of modern development.' },
  { icon: 'star', title: 'Quality & Excellence', desc: 'Unwavering commitment to the highest standards of quality across all products, services, and operations.' },
  { icon: 'layers', title: 'Diversified Expertise', desc: 'Broad business portfolio spanning infrastructure, technology, energy, coffee, procurement, and entertainment.' },
  { icon: 'leaf', title: 'Sustainable Development', desc: 'Environmentally responsible practices and solutions that contribute to a sustainable future for Ethiopia.' },
  { icon: 'heart', title: 'Long-term Relationships', desc: 'Building enduring partnerships based on trust, transparency, and shared goals for mutual growth.' },
  { icon: 'check', title: 'Proven Capabilities', desc: 'Demonstrated track record of successful project delivery and operational performance across diverse sectors.' },
];

const icons: Record<string, React.ReactNode> = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  lightbulb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L17 8z"/><path d="M20.59 2.41a2 2 0 0 0-2.83 0L12 8.17l2.83 2.83 5.76-5.76a2 2 0 0 0 0-2.83z"/></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

export default function WhyBekur({ title, subtitle }: { title: string; subtitle: string }) {
  useScrollReveal();

  return (
    <section className="section" id="why-bekur">
      <div className="container">
        <div className="text-center reveal mb-10">
          <span className="label">Our Advantage</span>
          <h2>{title}</h2>
          {subtitle && <p className="body-lg mt-4 mx-auto" style={{ maxWidth: '600px' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="why-grid reveal">
        {whyItems.map((item, i) => (
          <div key={i} className={`why-item reveal reveal--delay-${(i % 4) + 1}`}>
            <div className="why-item__icon">{icons[item.icon]}</div>
            <h4 className="why-item__title">{item.title}</h4>
            <p className="why-item__desc">{item.desc}</p>
            <div className="why-item__line" />
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Value {
  id: string;
  number: string;
  title: string;
  description: string;
}

export default function CoreValues({ title, subtitle, values }: { title: string; subtitle: string; values: Value[] }) {
  useScrollReveal();

  return (
    <section className="section section--alt" id="core-values">
      <div className="container">
        <div className="text-center reveal mb-10">
          <span className="label">Our Foundation</span>
          <h2>{title}</h2>
          {subtitle && <p className="body-lg mt-4 mx-auto" style={{ maxWidth: '600px' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="values-grid reveal">
        {values.map((value, i) => (
          <div key={value.id} className={`value-card reveal reveal--delay-${(i % 6) + 1}`}>
            <div className="value-card__number">{value.number}</div>
            <h4 className="value-card__title">{value.title}</h4>
            <p className="value-card__desc">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

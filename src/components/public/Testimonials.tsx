'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  organization: string;
}

export default function Testimonials({ title, testimonials }: { title: string; testimonials: TestimonialData[] }) {
  const [active, setActive] = useState(0);
  useScrollReveal();

  if (!testimonials.length) return null;
  const current = testimonials[active];

  return (
    <section className="section section--alt" id="testimonials">
      <div className="container reveal">
        <div className="text-center">
          <span className="label">Testimonials</span>
          <h2>{title}</h2>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-card__quote-mark">&ldquo;</div>
          <p className="testimonial-card__text">{current.quote}</p>
          <div className="testimonial-card__author">— {current.author}</div>
          <div className="testimonial-card__org">{current.organization}</div>
        </div>
        {testimonials.length > 1 && (
          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === active ? 'testimonial-dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

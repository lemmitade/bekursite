'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FutureExpansionProps {
  title: string;
  content: string;
  highlights: string[];
  closingStatement: string;
  imageUrl: string;
}

export default function FutureExpansion({ title, content, highlights, closingStatement, imageUrl }: FutureExpansionProps) {
  useScrollReveal();

  return (
    <section className="cinematic" id="future">
      <div className="cinematic__bg">
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #071525 0%, #0B1F3A 50%, #071525 100%)',
          }} />
        )}
      </div>
      <div className="cinematic__overlay" />
      <div className="cinematic__content container reveal">
        <span className="label">Looking Ahead</span>
        <h2 className="text-white">{title}</h2>
        <p className="body-lg mt-6" style={{ color: 'rgba(255,255,255,0.75)' }}>{content}</p>
        <div className="cinematic__highlights">
          {highlights.map((h, i) => (
            <span key={i} className="cinematic__tag">{h}</span>
          ))}
        </div>
        <p className="cinematic__closing">{closingStatement}</p>
      </div>
    </section>
  );
}

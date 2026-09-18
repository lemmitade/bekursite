'use client';

import { useState, useEffect } from 'react';

export interface ProductionVideo {
  id: string;
  title: string;
  category: 'production' | 'result';
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  location: string;
  badge: string;
  tiktokUrl?: string;
  enabled?: boolean;
  sortOrder?: number;
}

interface ProductionResultsSectionProps {
  title?: string;
  subtitle?: string;
  videos: ProductionVideo[];
  whatsappNumber?: string;
}

function extractTikTokId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

export default function ProductionResultsSection({
  title = 'PRECISION PRODUCTION & FINAL RESULTS',
  subtitle = 'Discover how Bekur transforms concept to reality — from high-precision CNC metal fabrication in our facilities to turnkey infrastructure landmarks across Ethiopia.',
  videos,
  whatsappNumber = '+251946757671',
}: ProductionResultsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'production' | 'result'>('all');
  const [activeVideo, setActiveVideo] = useState<ProductionVideo | null>(null);

  const activeVideos = videos.filter((v) => v.enabled !== false);
  const filteredVideos =
    filter === 'all' ? activeVideos : activeVideos.filter((v) => v.category === filter);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  if (activeVideos.length === 0) return null;

  const activeTikTokId = activeVideo?.tiktokUrl ? extractTikTokId(activeVideo.tiktokUrl) : null;

  return (
    <section className="section video-showcase" id="production-results">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-10)' }}>
          <span className="label">Industrial Capabilities & Deliverables</span>
          <h2 className="h1">{title}</h2>
          <div className="gold-line" style={{ margin: 'var(--space-4) auto var(--space-6)' }} />
          <p className="body-lg">{subtitle}</p>
        </div>

        {/* Filter Tabs */}
        <div className="video-tabs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`video-tab-btn ${filter === 'all' ? 'video-tab-btn--active' : ''}`}
          >
            <span>All Showcases</span>
            <span style={{ opacity: 0.7, fontSize: '0.75rem' }}>({activeVideos.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('production')}
            className={`video-tab-btn ${filter === 'production' ? 'video-tab-btn--active' : ''}`}
          >
            <span>⚙️ Precision Production</span>
            <span style={{ opacity: 0.7, fontSize: '0.75rem' }}>
              ({activeVideos.filter((v) => v.category === 'production').length})
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('result')}
            className={`video-tab-btn ${filter === 'result' ? 'video-tab-btn--active' : ''}`}
          >
            <span>🏆 Final Results & Deliverables</span>
            <span style={{ opacity: 0.7, fontSize: '0.75rem' }}>
              ({activeVideos.filter((v) => v.category === 'result').length})
            </span>
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="video-card"
              onClick={() => setActiveVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveVideo(video);
                }
              }}
              aria-label={`Play video: ${video.title}`}
            >
              {/* Thumbnail Container */}
              <div className="video-card__thumbnail-wrap">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="video-card__img"
                  loading="lazy"
                />
                <div className="video-card__overlay">
                  <div className="video-play-btn" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2 }}>
                  <span
                    className={`video-badge ${
                      video.category === 'production' ? 'video-badge--production' : 'video-badge--result'
                    }`}
                    style={{ position: 'static' }}
                  >
                    {video.category === 'production' ? '⚙️ Production' : '🏆 Completed Result'}
                  </span>
                  {video.tiktokUrl && (
                    <span
                      style={{
                        background: '#000',
                        color: '#fe2c55',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: '1px solid rgba(254, 44, 85, 0.4)',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.33-6.32V8.7a8.28 8.28 0 0 0 4.92 1.63V6.88a4.88 4.88 0 0 1-1-.19z"/>
                      </svg>
                      TikTok
                    </span>
                  )}
                </div>
                <span className="video-duration">{video.duration}</span>
              </div>

              {/* Card Body */}
              <div className="video-card__body">
                <div className="video-card__meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{video.location}</span>
                </div>
                <h3 className="video-card__title">{video.title}</h3>
                <p className="video-card__desc">{video.description}</p>
                <div className="video-card__footer">
                  <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Watch Reel / Case Study →</span>
                  <span>{video.badge}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="video-modal-backdrop"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          <div
            className={`video-modal-content ${activeTikTokId ? 'video-modal-content--tiktok' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal__close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
            >
              ✕
            </button>

            {/* Video Player or TikTok Iframe */}
            {activeTikTokId ? (
              <div className="video-modal__player-wrap video-modal__player-wrap--tiktok">
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${activeTikTokId}`}
                  title={activeVideo.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-modal__player-wrap">
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="video-modal__video"
                >
                  Your browser does not support HTML5 video.
                </video>
              </div>
            )}

            {/* Modal Details & Inquiry CTA */}
            <div className="video-modal__details">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span
                  className={`video-badge ${
                    activeVideo.category === 'production' ? 'video-badge--production' : 'video-badge--result'
                  }`}
                  style={{ position: 'static' }}
                >
                  {activeVideo.category === 'production' ? '⚙️ Factory Production' : '🏆 Completed Result'}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  📍 {activeVideo.location}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)' }}>
                  Duration: {activeVideo.duration}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-2)' }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)' }}>
                {activeVideo.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--space-4)' }}>
                {activeVideo.tiktokUrl && (
                  <a
                    href={activeVideo.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                    style={{ fontSize: 'var(--text-xs)', padding: '8px 16px', background: '#000', borderColor: '#fe2c55', color: '#fff' }}
                  >
                    Watch on TikTok ↗
                  </a>
                )}
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello Bekur, I watched your video "${activeVideo.title}" and would like to inquire about this solution.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ fontSize: 'var(--text-xs)', padding: '8px 18px' }}
                >
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

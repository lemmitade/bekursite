'use client';

import { useState, useEffect } from 'react';

export interface TikTokVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  tiktokUrl: string;
  caption: string;
  views: string;
  likes: string;
  sound: string;
  enabled?: boolean;
  sortOrder?: number;
}

interface TikTokSectionProps {
  title?: string;
  subtitle?: string;
  accountHandle?: string;
  accountUrl?: string;
  followerCount?: string;
  videos: TikTokVideo[];
}

function extractTikTokId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

export default function TikTokSection({
  title = 'BEKUR ON TIKTOK',
  subtitle = 'Behind-the-scenes engineering, live on-site testing, and short-form tech highlights. Tap any reel for an interactive preview.',
  accountHandle = '@bekurtrading',
  accountUrl = 'https://www.tiktok.com/@bekurtrading',
  followerCount = '12.4K',
  videos,
}: TikTokSectionProps) {
  const [activeReel, setActiveReel] = useState<TikTokVideo | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const activeVideos = videos.filter((v) => v.enabled !== false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveReel(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeReel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeReel]);

  if (activeVideos.length === 0) return null;

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeTikTokId = activeReel ? extractTikTokId(activeReel.tiktokUrl) : null;

  return (
    <section className="section tiktok-section" id="tiktok-reels">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-8)' }}>
          <div className="tiktok-header-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.33-6.32V8.7a8.28 8.28 0 0 0 4.92 1.63V6.88a4.88 4.88 0 0 1-1-.19z"/>
            </svg>
            <span>OFFICIAL TIKTOK REELS</span>
            <span style={{ color: '#fe2c55', fontWeight: 'bold' }}>• {followerCount} FOLLOWERS</span>
          </div>

          <h2 className="h1" style={{ color: 'var(--white)' }}>{title}</h2>
          <div className="gold-line" style={{ margin: 'var(--space-4) auto var(--space-6)' }} />
          <p className="body-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {subtitle}
          </p>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <a
              href={accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: 'var(--text-sm)',
                background: '#fe2c55',
                borderColor: '#fe2c55',
                color: '#fff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.33-6.32V8.7a8.28 8.28 0 0 0 4.92 1.63V6.88a4.88 4.88 0 0 1-1-.19z"/>
              </svg>
              <span>Follow {accountHandle}</span>
            </a>
          </div>
        </div>

        {/* 9:16 Vertical Grid */}
        <div className="tiktok-grid" style={{ gridTemplateColumns: activeVideos.length > 4 ? 'repeat(auto-fit, minmax(220px, 1fr))' : undefined }}>
          {activeVideos.map((reel) => {
            const isLiked = !!likedMap[reel.id];
            return (
              <div
                key={reel.id}
                className="tiktok-card"
                onClick={() => setActiveReel(reel)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveReel(reel);
                  }
                }}
                aria-label={`Preview TikTok: ${reel.title}`}
              >
                {/* Vertical Cover Image */}
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  className="tiktok-card__media"
                  loading="lazy"
                />

                {/* Overlay Elements */}
                <div className="tiktok-card__overlay">
                  {/* Top Bar: Views count */}
                  <div className="tiktok-card__top">
                    <span className="tiktok-card__views-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {reel.views}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleLike(reel.id, e)}
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        color: isLiked ? '#fe2c55' : '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      aria-label="Like reel"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? '#fe2c55' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Center Play Icon with Glow */}
                  <div className="tiktok-card__center-play" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>

                  {/* Bottom: Channel, Caption, Sound */}
                  <div className="tiktok-card__bottom">
                    <div className="tiktok-card__author">
                      <span>{accountHandle}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#25f4ee">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="tiktok-card__caption">{reel.caption || reel.title}</p>
                    <div className="tiktok-card__sound">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 18V5l12-2v13"/>
                        <circle cx="6" cy="18" r="3"/>
                        <circle cx="18" cy="16" r="3"/>
                      </svg>
                      <span>{reel.sound}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Vertical TikTok Preview Modal */}
      {activeReel && (
        <div
          className="video-modal-backdrop"
          onClick={() => setActiveReel(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeReel.title}
        >
          <div
            className="video-modal-content video-modal-content--tiktok"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '460px' }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="video-modal__close"
              onClick={() => setActiveReel(null)}
              aria-label="Close preview"
            >
              ✕
            </button>

            {/* Vertical Player: TikTok Embed or HTML5 */}
            {activeTikTokId ? (
              <div className="video-modal__player-wrap video-modal__player-wrap--tiktok" style={{ height: '560px', maxHeight: '72vh' }}>
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${activeTikTokId}`}
                  title={activeReel.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-modal__player-wrap video-modal__player-wrap--tiktok">
                <video
                  src={activeReel.videoUrl}
                  poster={activeReel.thumbnailUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="video-modal__video"
                >
                  Your browser does not support HTML5 video.
                </video>
              </div>
            )}

            {/* Reel Details & Direct Link */}
            <div style={{ padding: 'var(--space-4)', background: 'var(--deep-navy)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#000',
                      border: '1px solid #fe2c55',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fe2c55',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    B
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: '#fff' }}>
                      {accountHandle}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#25f4ee' }}>Official TikTok</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)' }}>
                  <span>👁 {activeReel.views}</span>
                  <span>❤️ {activeReel.likes}</span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginBottom: '12px' }}>
                {activeReel.caption}
              </p>

              <a
                href={activeReel.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  padding: '10px',
                  background: '#fe2c55',
                  borderColor: '#fe2c55',
                  color: '#fff',
                }}
              >
                Watch on TikTok App / Browser ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

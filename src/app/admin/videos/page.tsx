'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoItem {
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
  enabled: boolean;
  sortOrder: number;
}

interface TikTokItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  tiktokUrl: string;
  caption: string;
  views: string;
  likes: string;
  sound: string;
  enabled: boolean;
  sortOrder: number;
}

const DEFAULT_PRODUCTION_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Precision Laser Cutting & Metal Fabrication',
    category: 'production',
    description: 'High-precision automated CNC laser cutting of heavy-duty structural steel components for our smart poles and stadium floodlight towers.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/images/videos/production-fabrication.jpg',
    duration: '01:24',
    location: 'Bekur Engineering Plant, Addis Ababa',
    badge: 'Manufacturing',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'vid-2',
    title: 'Smart City Lighting Assembly & Sensor Testing',
    category: 'production',
    description: 'Clean-room calibration of IoT environmental sensors, integrated solar panels, and high-efficiency LED controllers.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/images/videos/production-assembly.jpg',
    duration: '02:10',
    location: 'Electronics & Quality Lab',
    badge: 'Engineering',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'vid-res-vimeo-1',
    title: 'Illuminated Multi-Tier Flower Smart Pole at Night',
    category: 'result',
    description: 'Completed installation and night illumination of custom multi-tier lotus-style decorative street pole with integrated blue vertical LED accent lines.',
    videoUrl: 'https://vimeo.com/1228307451',
    thumbnailUrl: '/images/videos/vimeo-1228307451.jpg',
    duration: '00:28',
    location: 'Addis Ababa Urban Project',
    badge: 'Smart Lighting',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'vid-res-vimeo-2',
    title: 'Architectural Pathway & Garden Promenade Lighting',
    category: 'result',
    description: 'Finished deployment of custom geometric angular walkway lighting fixtures providing warm, uniform illumination across landscaped public grounds.',
    videoUrl: 'https://vimeo.com/1228307450',
    thumbnailUrl: '/images/videos/vimeo-1228307450.jpg',
    duration: '00:07',
    location: 'Commercial & Hospitality Grounds',
    badge: 'Walkway Project',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'vid-res-vimeo-3',
    title: 'On-Site Installation & Night Testing with Crane Truck',
    category: 'result',
    description: 'Live testing and calibration of decorative floral high-mast street lighting tower in front of contemporary commercial architecture.',
    videoUrl: 'https://vimeo.com/1228307448',
    thumbnailUrl: '/images/videos/vimeo-1228307448.jpg',
    duration: '00:11',
    location: 'City Boulevard Infrastructure',
    badge: 'Live Testing',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'vid-res-vimeo-4',
    title: 'Precision Fabricated Angular Garden Poles Quality Inspection',
    category: 'result',
    description: 'Array of completed custom angular LED garden poles undergoing final electrical check, luminous intensity testing, and structural finishing inspection.',
    videoUrl: 'https://vimeo.com/1228307367',
    thumbnailUrl: '/images/videos/vimeo-1228307367.jpg',
    duration: '00:13',
    location: 'Bekur Fabrication Facility',
    badge: 'Quality Verified',
    enabled: true,
    sortOrder: 5,
  },
  {
    id: 'vid-res-vimeo-5',
    title: 'Night Illumination & Luminaire Output Showcase',
    category: 'result',
    description: 'Full dynamic lighting test showcasing 360-degree illumination, multi-angle floral petals, and high-efficiency optical performance.',
    videoUrl: 'https://vimeo.com/1228307368',
    thumbnailUrl: '/images/videos/vimeo-1228307368.jpg',
    duration: '00:28',
    location: 'Addis Ababa',
    badge: 'Luminous Test',
    enabled: true,
    sortOrder: 6,
  },
];

const DEFAULT_TIKTOK_VIDEOS: TikTokItem[] = [
  {
    id: 'tt-1',
    title: 'No templates. No shortcuts. Just custom material that fits right the first time.',
    thumbnailUrl: '/images/videos/tiktok-user-2.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7654280983373516039?lang=en',
    caption: 'No templates. No shortcuts. Just custom material that fits right the first time. #Engineering #CustomFabrication #BekurTrading',
    views: '45.2K',
    likes: '3.2K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 0,
  },
  {
    id: 'tt-2',
    title: 'Live Infrastructure Execution & On-Site Assembly',
    thumbnailUrl: '/images/videos/tiktok-user-1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7653834753560333586?lang=en',
    caption: 'On-site execution and structural delivery across our infrastructure projects in Addis Ababa! #EthiopiaTech #AddisAbaba #BekurTrading',
    views: '58.9K',
    likes: '4.5K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'tt-3',
    title: 'Precision Fabrication & Structural Quality Inspection',
    thumbnailUrl: '/images/videos/tiktok-user-3.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7656135524930964743?lang=en',
    caption: 'Quality control check on heavy-duty components before site deployment. Built for longevity. #QualityControl #Manufacturing',
    views: '37.4K',
    likes: '2.8K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'tt-4',
    title: 'Modern Urban Infrastructure Solutions in Ethiopia',
    thumbnailUrl: '/images/videos/tiktok-user-4.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7686454118990433544?lang=en',
    caption: 'Delivering modern infrastructure solutions that power our cities forward. #SmartCity #EthiopiaInfrastructure #BekurTrading',
    views: '62.1K',
    likes: '5.0K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'tt-5',
    title: 'Client Q&A: Material Durability, Longevity & Quality',
    thumbnailUrl: '/images/videos/tiktok-user-5.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    tiktokUrl: 'https://www.tiktok.com/@bekurtrading/video/7655375736932551944?lang=en',
    caption: 'Answering client questions directly regarding material selection, weather durability, and warranties. #ClientSatisfaction #BekurTrading',
    views: '41.6K',
    likes: '3.1K',
    sound: '♬ original sound - Bekur በኩር',
    enabled: true,
    sortOrder: 4,
  },
];

export default function AdminVideosPage() {
  const [activeTab, setActiveTab] = useState<'production' | 'tiktok'>('production');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Production Videos State
  const [prodTitle, setProdTitle] = useState('PRECISION ENGINEERING & REAL-WORLD RESULTS');
  const [prodSubtitle, setProdSubtitle] = useState('Witness our cutting-edge manufacturing, robotic assembly, and proven infrastructure installations transforming Ethiopia.');
  const [prodEnabled, setProdEnabled] = useState(true);
  const [prodVideos, setProdVideos] = useState<VideoItem[]>(DEFAULT_PRODUCTION_VIDEOS);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isNewVideo, setIsNewVideo] = useState(false);

  // TikTok State
  const [ttTitle, setTtTitle] = useState('BEKUR ON TIKTOK');
  const [ttSubtitle, setTtSubtitle] = useState('Behind the scenes, quick tech breakdowns, and live on-site moments. Follow @bekurtrading');
  const [ttHandle, setTtHandle] = useState('@bekurtrading');
  const [ttAccountUrl, setTtAccountUrl] = useState('https://www.tiktok.com/@bekurtrading');
  const [ttFollowers, setTtFollowers] = useState('12.4K');
  const [ttEnabled, setTtEnabled] = useState(true);
  const [ttVideos, setTtVideos] = useState<TikTokItem[]>(DEFAULT_TIKTOK_VIDEOS);
  const [editingTikTok, setEditingTikTok] = useState<TikTokItem | null>(null);
  const [isNewTikTok, setIsNewTikTok] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const prodVideoFileRef = useRef<HTMLInputElement>(null);
  const prodThumbFileRef = useRef<HTMLInputElement>(null);
  const ttVideoFileRef = useRef<HTMLInputElement>(null);
  const ttThumbFileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, field: 'prodVideo' | 'prodThumb' | 'ttVideo' | 'ttThumb') => {
    setUploading(field);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      if (field === 'prodVideo') {
        setEditingVideo((prev) => (prev ? { ...prev, videoUrl: data.url } : null));
      } else if (field === 'prodThumb') {
        setEditingVideo((prev) => (prev ? { ...prev, thumbnailUrl: data.url } : null));
      } else if (field === 'ttVideo') {
        setEditingTikTok((prev) => (prev ? { ...prev, videoUrl: data.url } : null));
      } else if (field === 'ttThumb') {
        setEditingTikTok((prev) => (prev ? { ...prev, thumbnailUrl: data.url } : null));
      }
      setMessage({ type: 'success', text: `Uploaded successfully: ${data.filename}` });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'File upload failed' });
    } finally {
      setUploading(null);
    }
  };

  useEffect(() => {
    fetch('/api/admin/videos')
      .then((res) => res.json())
      .then((data) => {
        if (data.production) {
          if (data.production.title) setProdTitle(data.production.title);
          if (data.production.subtitle) setProdSubtitle(data.production.subtitle);
          setProdEnabled(data.production.enabled ?? true);
          try {
            const extra = JSON.parse(data.production.extraData || '{}');
            if (Array.isArray(extra.videos) && extra.videos.length > 0) {
              setProdVideos(extra.videos);
            }
          } catch {}
        }

        if (data.tiktok) {
          if (data.tiktok.title) setTtTitle(data.tiktok.title);
          if (data.tiktok.subtitle) setTtSubtitle(data.tiktok.subtitle);
          setTtEnabled(data.tiktok.enabled ?? true);
          try {
            const extra = JSON.parse(data.tiktok.extraData || '{}');
            if (extra.accountHandle) setTtHandle(extra.accountHandle);
            if (extra.accountUrl) setTtAccountUrl(extra.accountUrl);
            if (extra.followerCount) setTtFollowers(extra.followerCount);
            if (Array.isArray(extra.videos) && extra.videos.length > 0) {
              setTtVideos(extra.videos);
            }
          } catch {}
        }
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Error loading video sections from database' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSaveProduction = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey: 'production_videos',
          title: prodTitle,
          subtitle: prodSubtitle,
          enabled: prodEnabled,
          extraData: JSON.stringify({
            videos: prodVideos,
          }),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage({ type: 'success', text: 'Production & Results videos saved successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save Production videos.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTikTok = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey: 'tiktok_videos',
          title: ttTitle,
          subtitle: ttSubtitle,
          enabled: ttEnabled,
          extraData: JSON.stringify({
            accountHandle: ttHandle,
            accountUrl: ttAccountUrl,
            followerCount: ttFollowers,
            videos: ttVideos,
          }),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage({ type: 'success', text: 'TikTok videos & configuration saved successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save TikTok section.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setProdVideos((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleDeleteTikTok = (id: string) => {
    if (confirm('Are you sure you want to delete this TikTok reel?')) {
      setTtVideos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSaveVideoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    if (isNewVideo) {
      setProdVideos((prev) => [...prev, editingVideo]);
    } else {
      setProdVideos((prev) => prev.map((v) => (v.id === editingVideo.id ? editingVideo : v)));
    }
    setEditingVideo(null);
  };

  const handleSaveTikTokModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTikTok) return;
    if (isNewTikTok) {
      setTtVideos((prev) => [...prev, editingTikTok]);
    } else {
      setTtVideos((prev) => prev.map((t) => (t.id === editingTikTok.id ? editingTikTok : t)));
    }
    setEditingTikTok(null);
  };

  if (loading) {
    return <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>Loading Video Management...</div>;
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Video & TikTok Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Manage the Production Videos & Final Results showcase, and the interactive TikTok Reels on the public website.
          </p>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            borderRadius: 'var(--radius-sm)',
            background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? '#10b981' : '#ef4444',
            border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          }}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('production')}
          className={`btn ${activeTab === 'production' ? 'btn--primary' : 'btn--secondary'}`}
        >
          ⚙️ Production & Final Results ({prodVideos.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tiktok')}
          className={`btn ${activeTab === 'tiktok' ? 'btn--primary' : 'btn--secondary'}`}
        >
          📱 TikTok Reels ({ttVideos.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTION & FINAL RESULTS */}
      {activeTab === 'production' && (
        <div>
          {/* Section Settings Header Card */}
          <div className="admin-form__section" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Production & Results Section Settings</h2>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
                <input
                  type="checkbox"
                  checked={prodEnabled}
                  onChange={(e) => setProdEnabled(e.target.checked)}
                />
                Show Section on Homepage
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Subtitle / Description</label>
                <input
                  type="text"
                  value={prodSubtitle}
                  onChange={(e) => setProdSubtitle(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleSaveProduction}
                disabled={saving}
                className="btn btn--primary"
              >
                {saving ? 'Saving...' : 'Save Production Section'}
              </button>
            </div>
          </div>

          {/* Videos Grid Header & Add Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Showcase Videos List</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Click &apos;Edit&apos; to update details or add new showcase videos.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsNewVideo(true);
                setEditingVideo({
                  id: `vid-${Date.now()}`,
                  title: '',
                  category: 'production',
                  description: '',
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  thumbnailUrl: '/images/videos/production-fabrication.jpg',
                  duration: '01:30',
                  location: 'Addis Ababa',
                  badge: 'Manufacturing',
                  tiktokUrl: '',
                  enabled: true,
                  sortOrder: prodVideos.length,
                });
              }}
              className="btn btn--primary"
            >
              + Add New Video
            </button>
          </div>

          {/* Videos Table/List */}
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {prodVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-6)',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                }}
              >
                {/* Thumbnail Preview */}
                <div style={{ width: '120px', aspectRatio: '16/9', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                  <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Video Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        background: video.category === 'production' ? 'rgba(243, 188, 62, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: video.category === 'production' ? 'var(--gold)' : '#10b981',
                        border: `1px solid ${video.category === 'production' ? 'rgba(243, 188, 62, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                      }}
                    >
                      {video.category === 'production' ? '⚙️ Production' : '🏆 Final Result'}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>⏱ {video.duration}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>📍 {video.location}</span>
                  </div>
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: '2px 0 4px', color: 'var(--text-primary)' }}>
                    {video.title || 'Untitled Video'}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {video.description}
                  </p>
                </div>

                {/* Status Toggle & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={video.enabled}
                      onChange={(e) => {
                        const updated = prodVideos.map((v) => (v.id === video.id ? { ...v, enabled: e.target.checked } : v));
                        setProdVideos(updated);
                      }}
                    />
                    {video.enabled ? 'Active' : 'Hidden'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewVideo(false);
                      setEditingVideo({ ...video });
                    }}
                    className="btn btn--secondary"
                    style={{ padding: '6px 14px', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(video.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px 10px', fontSize: 'var(--text-xs)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick save banner at bottom */}
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleSaveProduction}
              disabled={saving}
              className="btn btn--primary"
            >
              {saving ? 'Saving...' : 'Save All Video Changes'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: TIKTOK REELS */}
      {activeTab === 'tiktok' && (
        <div>
          {/* TikTok Section Header Card */}
          <div className="admin-form__section" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>TikTok Section & Profile Settings</h2>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
                <input
                  type="checkbox"
                  checked={ttEnabled}
                  onChange={(e) => setTtEnabled(e.target.checked)}
                />
                Show TikTok Section on Homepage
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  value={ttTitle}
                  onChange={(e) => setTtTitle(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input
                  type="text"
                  value={ttSubtitle}
                  onChange={(e) => setTtSubtitle(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label>TikTok Handle</label>
                <input
                  type="text"
                  value={ttHandle}
                  onChange={(e) => setTtHandle(e.target.value)}
                  className="form-input"
                  placeholder="@bekurtrading"
                />
              </div>
              <div className="form-group">
                <label>TikTok Profile URL</label>
                <input
                  type="url"
                  value={ttAccountUrl}
                  onChange={(e) => setTtAccountUrl(e.target.value)}
                  className="form-input"
                  placeholder="https://www.tiktok.com/@bekurtrading"
                />
              </div>
              <div className="form-group">
                <label>Followers Display (e.g. 12.4K)</label>
                <input
                  type="text"
                  value={ttFollowers}
                  onChange={(e) => setTtFollowers(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleSaveTikTok}
                disabled={saving}
                className="btn btn--primary"
              >
                {saving ? 'Saving...' : 'Save TikTok Settings'}
              </button>
            </div>
          </div>

          {/* TikTok Reels Header & Add Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>TikTok Video Cards (9:16 Reels)</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Each card appears with interactive video preview, sound controls, and direct TikTok links.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsNewTikTok(true);
                setEditingTikTok({
                  id: `tt-${Date.now()}`,
                  title: '',
                  thumbnailUrl: '/images/videos/tiktok-reel-1.jpg',
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                  tiktokUrl: ttAccountUrl || 'https://www.tiktok.com/@bekurtrading',
                  caption: '',
                  views: '25.0K',
                  likes: '1.8K',
                  sound: 'Original Sound - Bekur PLC',
                  enabled: true,
                  sortOrder: ttVideos.length,
                });
              }}
              className="btn btn--primary"
            >
              + Add New TikTok Reel
            </button>
          </div>

          {/* TikTok Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {ttVideos.map((reel) => (
              <div
                key={reel.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 9:16 preview */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
                  <img src={reel.thumbnailUrl} alt={reel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px' }}>
                    👁 {reel.views}
                  </div>
                  <div style={{ position: 'absolute', bottom: 8, left: 8, color: '#fff', fontSize: '0.75rem', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    ❤️ {reel.likes}
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {reel.title || 'Untitled Reel'}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '8px', flex: 1, lineClamp: 2 }}>
                    {reel.caption}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', marginBottom: '12px' }}>
                    🎵 {reel.sound}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={reel.enabled}
                        onChange={(e) => {
                          const updated = ttVideos.map((t) => (t.id === reel.id ? { ...t, enabled: e.target.checked } : t));
                          setTtVideos(updated);
                        }}
                      />
                      {reel.enabled ? 'Active' : 'Hidden'}
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsNewTikTok(false);
                          setEditingTikTok({ ...reel });
                        }}
                        className="btn btn--secondary"
                        style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTikTok(reel.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 'var(--text-xs)' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleSaveTikTok}
              disabled={saving}
              className="btn btn--primary"
            >
              {saving ? 'Saving...' : 'Save All TikTok Changes'}
            </button>
          </div>
        </div>
      )}

      {/* EDIT/ADD MODAL FOR PRODUCTION VIDEO */}
      {editingVideo && (
        <div className="video-modal-backdrop" onClick={() => setEditingVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {isNewVideo ? 'Add New Showcase Video' : 'Edit Showcase Video'}
              </h3>
              <button type="button" onClick={() => setEditingVideo(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveVideoModal} className="contact-form">
              <div className="form-group">
                <label>Video Title</label>
                <input
                  type="text"
                  required
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editingVideo.category}
                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="production">⚙️ Production & Manufacturing</option>
                    <option value="result">🏆 Final Deliverable & Result</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration Badge (e.g. 01:45)</label>
                  <input
                    type="text"
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Video Stream / MP4 URL</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                      type="text"
                      required
                      value={editingVideo.videoUrl}
                      onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                      className="form-input"
                      placeholder="https://.../video.mp4 or /uploads/..."
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={prodVideoFileRef}
                      accept="video/mp4,video/webm,video/quicktime"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'prodVideo');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => prodVideoFileRef.current?.click()}
                      disabled={uploading === 'prodVideo'}
                      className="btn btn--secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {uploading === 'prodVideo' ? 'Uploading...' : '📁 Upload MP4'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Poster Thumbnail URL</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                      type="text"
                      required
                      value={editingVideo.thumbnailUrl}
                      onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                      className="form-input"
                      placeholder="/images/videos/..."
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={prodThumbFileRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'prodThumb');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => prodThumbFileRef.current?.click()}
                      disabled={uploading === 'prodThumb'}
                      className="btn btn--secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {uploading === 'prodThumb' ? 'Uploading...' : '📁 Upload Image'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>TikTok URL (optional, enables embedded TikTok player for this project)</label>
                <input
                  type="url"
                  value={editingVideo.tiktokUrl || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, tiktokUrl: e.target.value })}
                  className="form-input"
                  placeholder="https://www.tiktok.com/@bekurtrading/video/7653834753560333586?lang=en"
                />
                <small style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginTop: '4px', display: 'block' }}>
                  If provided, clicking Play will embed this interactive TikTok video directly in the modal.
                </small>
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Location / Client Tag</label>
                  <input
                    type="text"
                    value={editingVideo.location}
                    onChange={(e) => setEditingVideo({ ...editingVideo, location: e.target.value })}
                    className="form-input"
                    placeholder="Addis Ababa"
                  />
                </div>
                <div className="form-group">
                  <label>Badge Label</label>
                  <input
                    type="text"
                    value={editingVideo.badge}
                    onChange={(e) => setEditingVideo({ ...editingVideo, badge: e.target.value })}
                    className="form-input"
                    placeholder="Manufacturing / Completed"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>Description & Project Specs</label>
                <textarea
                  rows={3}
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setEditingVideo(null)} className="btn btn--secondary">Cancel</button>
                <button type="submit" className="btn btn--primary">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD MODAL FOR TIKTOK REEL */}
      {editingTikTok && (
        <div className="video-modal-backdrop" onClick={() => setEditingTikTok(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {isNewTikTok ? 'Add New TikTok Reel' : 'Edit TikTok Reel'}
              </h3>
              <button type="button" onClick={() => setEditingTikTok(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveTikTokModal} className="contact-form">
              <div className="form-group">
                <label>Reel Headline / Title</label>
                <input
                  type="text"
                  required
                  value={editingTikTok.title}
                  onChange={(e) => setEditingTikTok({ ...editingTikTok, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>Caption & Hashtags</label>
                <textarea
                  rows={2}
                  value={editingTikTok.caption}
                  onChange={(e) => setEditingTikTok({ ...editingTikTok, caption: e.target.value })}
                  className="form-input"
                  placeholder="#BekurPLC #SmartCity #EthiopiaTech"
                />
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Video Stream / MP4 Preview URL</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                      type="text"
                      required
                      value={editingTikTok.videoUrl}
                      onChange={(e) => setEditingTikTok({ ...editingTikTok, videoUrl: e.target.value })}
                      className="form-input"
                      placeholder="https://.../video.mp4 or /uploads/..."
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={ttVideoFileRef}
                      accept="video/mp4,video/webm,video/quicktime"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'ttVideo');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => ttVideoFileRef.current?.click()}
                      disabled={uploading === 'ttVideo'}
                      className="btn btn--secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {uploading === 'ttVideo' ? 'Uploading...' : '📁 Upload MP4'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Thumbnail / Cover Image (9:16)</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                      type="text"
                      required
                      value={editingTikTok.thumbnailUrl}
                      onChange={(e) => setEditingTikTok({ ...editingTikTok, thumbnailUrl: e.target.value })}
                      className="form-input"
                      placeholder="/images/videos/tiktok-reel-1.jpg"
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={ttThumbFileRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'ttThumb');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => ttThumbFileRef.current?.click()}
                      disabled={uploading === 'ttThumb'}
                      className="btn btn--secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {uploading === 'ttThumb' ? 'Uploading...' : '📁 Upload Cover'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Direct TikTok Post / Channel URL</label>
                  <input
                    type="url"
                    required
                    value={editingTikTok.tiktokUrl}
                    onChange={(e) => setEditingTikTok({ ...editingTikTok, tiktokUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Audio / Sound Track Name</label>
                  <input
                    type="text"
                    value={editingTikTok.sound}
                    onChange={(e) => setEditingTikTok({ ...editingTikTok, sound: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>View Count (e.g. 48.2K)</label>
                  <input
                    type="text"
                    value={editingTikTok.views}
                    onChange={(e) => setEditingTikTok({ ...editingTikTok, views: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Likes Count (e.g. 3.4K)</label>
                  <input
                    type="text"
                    value={editingTikTok.likes}
                    onChange={(e) => setEditingTikTok({ ...editingTikTok, likes: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setEditingTikTok(null)} className="btn btn--secondary">Cancel</button>
                <button type="submit" className="btn btn--primary">Save TikTok Reel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface HomepageSection {
  id: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  overlayOpacity: number;
  enabled: boolean;
  sortOrder: number;
}

export default function AdminHomepagePage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSections = async () => {
    try {
      const res = await fetch('/api/admin/homepage');
      if (!res.ok) throw new Error('Failed to load homepage sections');
      const data = await res.json();
      setSections(data);
    } catch {
      setMessage({ type: 'error', text: 'Error loading homepage sections' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleEdit = (sec: HomepageSection) => {
    setEditingSection({ ...sec });
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSection),
      });

      if (!res.ok) throw new Error('Failed to save section');

      setMessage({ type: 'success', text: `Section "${editingSection.sectionKey}" updated successfully!` });
      setEditingSection(null);
      loadSections();
    } catch {
      setMessage({ type: 'error', text: 'Failed to update homepage section.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
        Loading homepage content...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Homepage Content & Sections</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Customize headlines, subtitles, background images, and call-to-actions across homepage sections.
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

      {/* Edit Form Modal */}
      {editingSection && (
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--gold)',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-8)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <div>
              <span className="badge badge--info" style={{ textTransform: 'uppercase' }}>
                {editingSection.sectionKey}
              </span>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, margin: '4px 0 0', color: 'var(--gold)' }}>
                Edit Section: {editingSection.title || editingSection.sectionKey}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setEditingSection(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="contact-form">
            <div className="form-group">
              <label htmlFor="secTitle">Section Title / Main Headline</label>
              <input
                id="secTitle"
                type="text"
                value={editingSection.title}
                onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="secSubtitle">Subtitle / Tagline</label>
              <textarea
                id="secSubtitle"
                rows={2}
                value={editingSection.subtitle}
                onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                className="form-input"
              />
            </div>

            {/* Content text (e.g. for intro / future) */}
            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="secContent">Body Content (if applicable)</label>
              <textarea
                id="secContent"
                rows={3}
                value={editingSection.content}
                onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="secImageUrl">Background / Feature Image URL</label>
                <input
                  id="secImageUrl"
                  type="text"
                  value={editingSection.imageUrl}
                  onChange={(e) => setEditingSection({ ...editingSection, imageUrl: e.target.value })}
                  className="form-input"
                  placeholder="/images/hero-infrastructure.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="overlayOpacity">Overlay Dark Opacity (0.0 to 1.0)</label>
                <input
                  id="overlayOpacity"
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={editingSection.overlayOpacity}
                  onChange={(e) => setEditingSection({ ...editingSection, overlayOpacity: parseFloat(e.target.value) || 0.5 })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            {editingSection.imageUrl && (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Image Preview:</span>
                <img
                  src={editingSection.imageUrl}
                  alt="Preview"
                  style={{ width: '120px', height: '68px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            )}

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="secCtaText">Button Call to Action Label</label>
                <input
                  id="secCtaText"
                  type="text"
                  value={editingSection.ctaText}
                  onChange={(e) => setEditingSection({ ...editingSection, ctaText: e.target.value })}
                  className="form-input"
                  placeholder="e.g. PARTNER WITH BEKUR"
                />
              </div>

              <div className="form-group">
                <label htmlFor="secCtaLink">Button Link Target</label>
                <input
                  id="secCtaLink"
                  type="text"
                  value={editingSection.ctaLink}
                  onChange={(e) => setEditingSection({ ...editingSection, ctaLink: e.target.value })}
                  className="form-input"
                  placeholder="whatsapp or /about or /contact"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <input
                id="secEnabled"
                type="checkbox"
                checked={editingSection.enabled}
                onChange={(e) => setEditingSection({ ...editingSection, enabled: e.target.checked })}
              />
              <label htmlFor="secEnabled" style={{ fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                Enable and display section on homepage
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <button type="button" onClick={() => setEditingSection(null)} className="btn btn--secondary" style={{ fontSize: 'var(--text-xs)' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
                {saving ? 'Saving...' : 'Save Section'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sections Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '70px' }}>Order</th>
              <th style={{ width: '130px' }}>Key</th>
              <th>Headline / Title</th>
              <th>Subtitle / Content</th>
              <th style={{ width: '90px' }}>Image</th>
              <th style={{ width: '90px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--gold)' }}>#{s.sortOrder}</td>
                <td>
                  <span className="badge badge--info">{s.sectionKey}</span>
                </td>
                <td>
                  <strong>{s.title || '—'}</strong>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', maxWidth: '300px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.subtitle || s.content || '—'}
                  </div>
                </td>
                <td>
                  {s.imageUrl ? (
                    <img
                      src={s.imageUrl}
                      alt={s.sectionKey}
                      style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  ) : (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>None</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${s.enabled ? 'badge--success' : 'badge--warning'}`}>
                    {s.enabled ? 'Enabled' : 'Hidden'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleEdit(s)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

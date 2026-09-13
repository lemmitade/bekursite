'use client';

import { useState, useEffect } from 'react';

interface Sector {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  enabled: boolean;
  fullContent: string;
}

export default function AdminSectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSectors = async () => {
    try {
      const res = await fetch('/api/admin/sectors');
      if (!res.ok) throw new Error('Failed to load sectors');
      const data = await res.json();
      setSectors(data);
    } catch {
      setMessage({ type: 'error', text: 'Error loading sectors' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSectors();
  }, []);

  const handleEdit = (sector: Sector) => {
    setIsNew(false);
    setEditingSector({ ...sector });
    setMessage(null);
  };

  const handleCreateNew = () => {
    setIsNew(true);
    setEditingSector({
      id: '',
      title: '',
      slug: '',
      description: '',
      imageUrl: '/images/sectors/infrastructure-solutions.jpg',
      sortOrder: sectors.length,
      enabled: true,
      fullContent: '',
    });
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSector) return;
    setSaving(true);
    setMessage(null);

    try {
      const url = isNew ? '/api/admin/sectors' : `/api/admin/sectors/${editingSector.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSector),
      });

      if (!res.ok) throw new Error('Failed to save sector');

      setMessage({ type: 'success', text: `Sector "${editingSector.title}" saved successfully!` });
      setEditingSector(null);
      loadSectors();
    } catch {
      setMessage({ type: 'error', text: 'Failed to save sector. Please check the inputs.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the sector "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/sectors/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage({ type: 'success', text: `Sector "${title}" deleted.` });
      loadSectors();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete sector.' });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
        Loading business sectors...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Business Sectors</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Manage the core business sectors, descriptive content, and high-resolution photography.
          </p>
        </div>
        <button onClick={handleCreateNew} className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
          + Add New Sector
        </button>
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

      {/* Edit / Create Form Modal */}
      {editingSector && (
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
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, margin: 0, color: 'var(--gold)' }}>
              {isNew ? 'Create New Sector' : `Edit Sector: ${editingSector.title}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingSector(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Sector Title</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={editingSector.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingSector.slug;
                    setEditingSector({ ...editingSector, title, slug });
                  }}
                  className="form-input"
                  placeholder="e.g. Infrastructure Solutions"
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug (URL)</label>
                <input
                  id="slug"
                  type="text"
                  required
                  value={editingSector.slug}
                  onChange={(e) => setEditingSector({ ...editingSector, slug: e.target.value })}
                  className="form-input"
                  placeholder="e.g. infrastructure-solutions"
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="imageUrl">Sector Image URL</label>
                <input
                  id="imageUrl"
                  type="text"
                  value={editingSector.imageUrl}
                  onChange={(e) => setEditingSector({ ...editingSector, imageUrl: e.target.value })}
                  className="form-input"
                  placeholder="/images/sectors/infrastructure-solutions.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sortOrder">Sort Order</label>
                <input
                  id="sortOrder"
                  type="number"
                  value={editingSector.sortOrder}
                  onChange={(e) => setEditingSector({ ...editingSector, sortOrder: parseInt(e.target.value) || 0 })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            {editingSector.imageUrl && (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Image Preview:</span>
                <img
                  src={editingSector.imageUrl}
                  alt="Preview"
                  style={{ width: '120px', height: '68px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            )}

            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="description">Short Summary Description</label>
              <textarea
                id="description"
                rows={2}
                value={editingSector.description}
                onChange={(e) => setEditingSector({ ...editingSector, description: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="fullContent">Full Sector Description & Details</label>
              <textarea
                id="fullContent"
                rows={4}
                value={editingSector.fullContent}
                onChange={(e) => setEditingSector({ ...editingSector, fullContent: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <input
                id="enabled"
                type="checkbox"
                checked={editingSector.enabled}
                onChange={(e) => setEditingSector({ ...editingSector, enabled: e.target.checked })}
              />
              <label htmlFor="enabled" style={{ fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                Enable and display on public website
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <button type="button" onClick={() => setEditingSector(null)} className="btn btn--secondary" style={{ fontSize: 'var(--text-xs)' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
                {saving ? 'Saving...' : 'Save Sector'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sectors Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '70px' }}>Order</th>
              <th style={{ width: '90px' }}>Image</th>
              <th>Sector Title & Slug</th>
              <th>Summary</th>
              <th style={{ width: '90px' }}>Status</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--gold)' }}>#{s.sortOrder}</td>
                <td>
                  {s.imageUrl ? (
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  ) : (
                    <div style={{ width: '64px', height: '40px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }} />
                  )}
                </td>
                <td>
                  <strong>{s.title}</strong>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/{s.slug}</div>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', maxWidth: '350px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.description}
                  </div>
                </td>
                <td>
                  <span className={`badge ${s.enabled ? 'badge--success' : 'badge--warning'}`}>
                    {s.enabled ? 'Active' : 'Disabled'}
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
                      marginRight: 'var(--space-3)',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, s.title)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Delete
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

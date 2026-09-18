'use client';

import { useState, useEffect, useRef } from 'react';

interface SisterCompany {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  imageUrl: string;
  website: string;
  enabled: boolean;
  sortOrder: number;
}

export default function SisterCompaniesAdminPage() {
  const [companies, setCompanies] = useState<SisterCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [editingCompany, setEditingCompany] = useState<SisterCompany | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/admin/sister-companies');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCompanies(data);
    } catch {
      setMessage({ type: 'error', text: 'Error loading sister companies' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCompany) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setEditingCompany({
        ...editingCompany,
        imageUrl: data.url,
      });
      setMessage({ type: 'success', text: `Image uploaded successfully: ${data.filename}` });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed' });
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/sister-companies', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCompany),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save');
      }

      setMessage({
        type: 'success',
        text: isNew ? 'Sister company created successfully!' : 'Sister company updated successfully!',
      });
      setEditingCompany(null);
      fetchCompanies();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save sister company' });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/sister-companies?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage({ type: 'success', text: `${name} deleted successfully.` });
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete' });
    }
  };

  const handleToggleEnabled = async (company: SisterCompany) => {
    try {
      const updated = { ...company, enabled: !company.enabled };
      const res = await fetch('/api/admin/sister-companies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setCompanies((prev) => prev.map((c) => (c.id === company.id ? updated : c)));
    } catch {
      setMessage({ type: 'error', text: 'Failed to toggle active status' });
    }
  };

  if (loading) {
    return <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>Loading Sister Companies...</div>;
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Sister Companies Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Manage the sister companies of Bekur Group (Kebron Coffee, Kebron Light, Kebron Skate) displayed on the public site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsNew(true);
            setEditingCompany({
              id: '',
              name: '',
              slug: '',
              tagline: '',
              description: '',
              imageUrl: '/images/companies/kebron-coffee.jpg',
              website: '',
              enabled: true,
              sortOrder: companies.length,
            });
          }}
          className="btn btn--primary"
        >
          + Add Sister Company
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

      {/* Companies Grid */}
      <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
        {companies.map((company) => (
          <div
            key={company.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '260px 1fr auto',
              gap: 'var(--space-6)',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              alignItems: 'center',
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: '100%',
                height: '150px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--surface-bg)',
                position: 'relative',
              }}
            >
              {company.imageUrl ? (
                <img
                  src={company.imageUrl}
                  alt={company.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {company.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: company.enabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: company.enabled ? '#10b981' : '#ef4444',
                  }}
                >
                  {company.enabled ? 'Active' : 'Hidden'}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  Slug: /{company.slug}
                </span>
              </div>

              {company.tagline && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
                  {company.tagline}
                </p>
              )}

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {company.description}
              </p>

              {company.website && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary-light)', textDecoration: 'underline' }}
                  >
                    🔗 {company.website}
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minWidth: '120px' }}>
              <button
                type="button"
                onClick={() => handleToggleEnabled(company)}
                className={`btn btn--sm ${company.enabled ? 'btn--secondary' : 'btn--primary'}`}
              >
                {company.enabled ? 'Hide' : 'Activate'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsNew(false);
                  setEditingCompany(company);
                }}
                className="btn btn--secondary btn--sm"
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(company.id, company.name)}
                className="btn btn--danger btn--sm"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE MODAL */}
      {editingCompany && (
        <div className="video-modal-backdrop" onClick={() => setEditingCompany(null)}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: 'var(--space-6)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {isNew ? 'Add Sister Company' : `Edit ${editingCompany.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCompany(null)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    required
                    value={editingCompany.name}
                    onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Kebron Coffee"
                  />
                </div>
                <div className="form-group">
                  <label>URL Slug</label>
                  <input
                    type="text"
                    value={editingCompany.slug}
                    onChange={(e) => setEditingCompany({ ...editingCompany, slug: e.target.value })}
                    className="form-input"
                    placeholder="kebron-coffee"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>Tagline / Specialty Focus</label>
                <input
                  type="text"
                  value={editingCompany.tagline}
                  onChange={(e) => setEditingCompany({ ...editingCompany, tagline: e.target.value })}
                  className="form-input"
                  placeholder="Specialty Ethiopian Coffee Sourcing, Roasting & Global Export"
                />
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>Company Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingCompany.description}
                  onChange={(e) => setEditingCompany({ ...editingCompany, description: e.target.value })}
                  className="form-input"
                  placeholder="Describe the company's core operations, products, and vision..."
                />
              </div>

              {/* Image URL & Direct Upload */}
              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label>Featured Image (1 Image)</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <input
                    type="text"
                    required
                    value={editingCompany.imageUrl}
                    onChange={(e) => setEditingCompany({ ...editingCompany, imageUrl: e.target.value })}
                    className="form-input"
                    placeholder="/images/companies/..."
                    style={{ flex: 1 }}
                  />
                  <input
                    type="file"
                    ref={imageInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="btn btn--secondary"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {uploadingImage ? 'Uploading...' : '📁 Upload Photo'}
                  </button>
                </div>
                {editingCompany.imageUrl && (
                  <div style={{ marginTop: 'var(--space-2)', width: '120px', height: '68px', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={editingCompany.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>External Website or Section Link</label>
                  <input
                    type="text"
                    value={editingCompany.website}
                    onChange={(e) => setEditingCompany({ ...editingCompany, website: e.target.value })}
                    className="form-input"
                    placeholder="https://... or #contact"
                  />
                </div>
                <div className="form-group">
                  <label>Display Sort Order</label>
                  <input
                    type="number"
                    value={editingCompany.sortOrder}
                    onChange={(e) => setEditingCompany({ ...editingCompany, sortOrder: parseInt(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingCompany.enabled}
                    onChange={(e) => setEditingCompany({ ...editingCompany, enabled: e.target.checked })}
                  />
                  <span>Publish & Display on Public Site</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setEditingCompany(null)} className="btn btn--secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

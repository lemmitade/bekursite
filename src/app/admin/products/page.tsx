'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  techInfo: string;
  sortOrder: number;
  enabled: boolean;
  sectorId: string | null;
  sector?: { id: string; title: string };
}

interface Sector {
  id: string;
  title: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    try {
      const [prodRes, secRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/sectors'),
      ]);

      if (!prodRes.ok || !secRes.ok) throw new Error('Failed to load data');
      const prodData = await prodRes.json();
      const secData = await secRes.json();

      setProducts(prodData);
      setSectors(secData);
    } catch {
      setMessage({ type: 'error', text: 'Error loading products catalog' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (prod: Product) => {
    setIsNew(false);
    setEditingProduct({ ...prod });
    setMessage(null);
  };

  const handleCreateNew = () => {
    setIsNew(true);
    setEditingProduct({
      id: '',
      name: '',
      slug: '',
      description: '',
      imageUrl: '/images/products/smart-pole.jpg',
      techInfo: '',
      sortOrder: products.length,
      enabled: true,
      sectorId: sectors[0]?.id || null,
    });
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    setMessage(null);

    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${editingProduct.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        name: editingProduct.name,
        slug: editingProduct.slug,
        description: editingProduct.description,
        imageUrl: editingProduct.imageUrl,
        techInfo: editingProduct.techInfo,
        sortOrder: editingProduct.sortOrder,
        enabled: editingProduct.enabled,
        sectorId: editingProduct.sectorId || null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save product');

      setMessage({ type: 'success', text: `Product "${editingProduct.name}" saved successfully!` });
      setEditingProduct(null);
      loadData();
    } catch {
      setMessage({ type: 'error', text: 'Failed to save product. Check required fields.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage({ type: 'success', text: `Product "${name}" deleted.` });
      loadData();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete product.' });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
        Loading products catalog...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Products & Solutions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Manage innovative smart poles, charger boxes, high mast systems, technical specs, and photos.
          </p>
        </div>
        <button onClick={handleCreateNew} className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
          + Add New Product
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

      {/* Edit / Create Form */}
      {editingProduct && (
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
              {isNew ? 'Create New Product' : `Edit Product: ${editingProduct.name}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = isNew ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingProduct.slug;
                    setEditingProduct({ ...editingProduct, name, slug });
                  }}
                  className="form-input"
                  placeholder="e.g. Smart Pole Solutions"
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug (URL)</label>
                <input
                  id="slug"
                  type="text"
                  required
                  value={editingProduct.slug}
                  onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                  className="form-input"
                  placeholder="e.g. smart-pole-solutions"
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="sectorId">Assigned Sector</label>
                <select
                  id="sectorId"
                  value={editingProduct.sectorId || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sectorId: e.target.value || null })}
                  className="form-input"
                >
                  <option value="">No sector assigned</option>
                  {sectors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Product Image URL</label>
                <input
                  id="imageUrl"
                  type="text"
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="form-input"
                  placeholder="/images/products/smart-pole.jpg"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            {editingProduct.imageUrl && (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Image Preview:</span>
                <img
                  src={editingProduct.imageUrl}
                  alt="Preview"
                  style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            )}

            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="techInfo">Technical Specs & Features (Bullet points or bullet separator •)</label>
              <textarea
                id="techInfo"
                rows={2}
                value={editingProduct.techInfo}
                onChange={(e) => setEditingProduct({ ...editingProduct, techInfo: e.target.value })}
                className="form-input"
                placeholder="Smart Adaptive Lighting • IoT Ready Architecture • Energy Efficient Operation"
              />
            </div>

            <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="description">Overview Description</label>
              <textarea
                id="description"
                rows={3}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
              <div className="form-group">
                <label htmlFor="sortOrder">Sort Order</label>
                <input
                  id="sortOrder"
                  type="number"
                  value={editingProduct.sortOrder}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sortOrder: parseInt(e.target.value) || 0 })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: '24px' }}>
                <input
                  id="prodEnabled"
                  type="checkbox"
                  checked={editingProduct.enabled}
                  onChange={(e) => setEditingProduct({ ...editingProduct, enabled: e.target.checked })}
                />
                <label htmlFor="prodEnabled" style={{ fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                  Enable on public catalogue
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <button type="button" onClick={() => setEditingProduct(null)} className="btn btn--secondary" style={{ fontSize: 'var(--text-xs)' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Order</th>
              <th style={{ width: '80px' }}>Image</th>
              <th>Product Name & Slug</th>
              <th>Sector</th>
              <th>Technical Features</th>
              <th style={{ width: '80px' }}>Status</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: 'var(--gold)' }}>#{p.sortOrder}</td>
                <td>
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  ) : (
                    <div style={{ width: '56px', height: '42px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }} />
                  )}
                </td>
                <td>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>/{p.slug}</div>
                </td>
                <td>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)' }}>
                    {p.sector?.title || 'General'}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', maxWidth: '300px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.techInfo || p.description}
                  </div>
                </td>
                <td>
                  <span className={`badge ${p.enabled ? 'badge--success' : 'badge--warning'}`}>
                    {p.enabled ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleEdit(p)}
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
                    onClick={() => handleDelete(p.id, p.name)}
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

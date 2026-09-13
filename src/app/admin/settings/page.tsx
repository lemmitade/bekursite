'use client';

import { useState, useEffect } from 'react';

interface SettingsData {
  companyName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  contactCtaText: string;
  footerText: string;
  copyright: string;
  linkedinUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  telegramUrl: string;
  instagramUrl: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<SettingsData>({
    companyName: '',
    tagline: '',
    logoUrl: '',
    email: '',
    phone1: '',
    phone2: '',
    whatsappNumber: '',
    whatsappMessage: '',
    address: '',
    primaryCtaText: '',
    secondaryCtaText: '',
    contactCtaText: '',
    footerText: '',
    copyright: '',
    linkedinUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    telegramUrl: '',
    instagramUrl: '',
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch settings');
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFormData({
            companyName: data.companyName || '',
            tagline: data.tagline || '',
            logoUrl: data.logoUrl || '',
            email: data.email || '',
            phone1: data.phone1 || '',
            phone2: data.phone2 || '',
            whatsappNumber: data.whatsappNumber || '',
            whatsappMessage: data.whatsappMessage || '',
            address: data.address || '',
            primaryCtaText: data.primaryCtaText || '',
            secondaryCtaText: data.secondaryCtaText || '',
            contactCtaText: data.contactCtaText || '',
            footerText: data.footerText || '',
            copyright: data.copyright || '',
            linkedinUrl: data.linkedinUrl || '',
            twitterUrl: data.twitterUrl || '',
            facebookUrl: data.facebookUrl || '',
            telegramUrl: data.telegramUrl || '',
            instagramUrl: data.instagramUrl || '',
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Error loading settings from database' });
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update settings');
      setMessage({ type: 'success', text: 'Site settings updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
        Loading site configuration...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Site Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Configure general company details, contact information, call-to-actions, and social channels.
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

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Company Identity */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Company Identity & Branding</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Company Legal Name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="logoUrl">Logo Image URL</label>
              <input
                id="logoUrl"
                name="logoUrl"
                type="text"
                value={formData.logoUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="/images/logo-light.png"
              />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label htmlFor="tagline">Company Tagline</label>
            <textarea
              id="tagline"
              name="tagline"
              rows={2}
              value={formData.tagline}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Contact & WhatsApp */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Contact Information & WhatsApp</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Official Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Office Location / Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="Addis Ababa, Ethiopia"
              />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="form-group">
              <label htmlFor="phone1">Phone Number 1</label>
              <input
                id="phone1"
                name="phone1"
                type="text"
                value={formData.phone1}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone2">Phone Number 2</label>
              <input
                id="phone2"
                name="phone2"
                type="text"
                value={formData.phone2}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp Direct Number</label>
              <input
                id="whatsappNumber"
                name="whatsappNumber"
                type="text"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="+251946757671"
              />
            </div>
            <div className="form-group">
              <label htmlFor="whatsappMessage">WhatsApp Pre-filled Message</label>
              <input
                id="whatsappMessage"
                name="whatsappMessage"
                type="text"
                value={formData.whatsappMessage}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Call-to-Action Texts */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Call to Action Labels</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="primaryCtaText">Primary Button Text</label>
              <input
                id="primaryCtaText"
                name="primaryCtaText"
                type="text"
                value={formData.primaryCtaText}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondaryCtaText">Secondary Button Text</label>
              <input
                id="secondaryCtaText"
                name="secondaryCtaText"
                type="text"
                value={formData.secondaryCtaText}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Social Media Channels</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn Profile URL</label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="telegramUrl">Telegram Channel/Bot</label>
              <input
                id="telegramUrl"
                name="telegramUrl"
                type="url"
                value={formData.telegramUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://t.me/..."
              />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="form-group">
              <label htmlFor="facebookUrl">Facebook Page URL</label>
              <input
                id="facebookUrl"
                name="facebookUrl"
                type="url"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="twitterUrl">X / Twitter URL</label>
              <input
                id="twitterUrl"
                name="twitterUrl"
                type="url"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Footer & Copyright */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Footer & Copyright</h2>
          <div className="form-group">
            <label htmlFor="footerText">Footer Descriptive Text</label>
            <textarea
              id="footerText"
              name="footerText"
              rows={2}
              value={formData.footerText}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label htmlFor="copyright">Copyright Notice</label>
            <input
              id="copyright"
              name="copyright"
              type="text"
              value={formData.copyright}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)' }}>
          <button type="submit" disabled={saving} className="btn btn--primary">
            {saving ? 'Saving Changes...' : 'Save Site Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

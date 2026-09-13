'use client';

import { useState, useEffect } from 'react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (!res.ok) throw new Error('Failed to load messages');
      const data = await res.json();
      setMessages(data);
    } catch {
      setStatusMessage({ type: 'error', text: 'Error loading inquiries' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleStatus = async (msg: ContactMessage) => {
    const newStatus = msg.status === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');

      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      loadMessages();
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to update message status.' });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      if (selectedMessage?.id === id) setSelectedMessage(null);
      setStatusMessage({ type: 'success', text: 'Message deleted successfully.' });
      loadMessages();
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'read') return m.status === 'read';
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
        Loading contact inquiries...
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Contact Inquiries & Leads</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Review inquiries submitted through the public website contact form.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn--primary' : 'btn--secondary'}`}
            style={{ fontSize: 'var(--text-xs)' }}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`btn ${filter === 'unread' ? 'btn--primary' : 'btn--secondary'}`}
            style={{ fontSize: 'var(--text-xs)' }}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`btn ${filter === 'read' ? 'btn--primary' : 'btn--secondary'}`}
            style={{ fontSize: 'var(--text-xs)' }}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            borderRadius: 'var(--radius-sm)',
            background: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: statusMessage.type === 'success' ? '#10b981' : '#ef4444',
            border: `1px solid ${statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Detail Modal / Drawer */}
      {selectedMessage && (
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
            <div>
              <span className={`badge ${selectedMessage.status === 'unread' ? 'badge--danger' : 'badge--success'}`} style={{ marginBottom: '8px' }}>
                {selectedMessage.status.toUpperCase()}
              </span>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, margin: '4px 0 0', color: 'var(--text-primary)' }}>
                {selectedMessage.subject || 'General Inquiry'}
              </h2>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email}) {selectedMessage.phone && `• Phone: ${selectedMessage.phone}`}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Received on: {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              ✕ Close
            </button>
          </div>

          <div
            style={{
              padding: 'var(--space-6)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              lineHeight: 1.7,
              fontSize: 'var(--text-base)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {selectedMessage.message}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Bekur General Trading Inquiry')}`}
                className="btn btn--primary"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                ✉️ Reply via Email
              </a>
              {selectedMessage.phone && (
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  💬 WhatsApp Contact
                </a>
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedMessage)}
                className="btn btn--secondary"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                Mark as {selectedMessage.status === 'unread' ? 'Read' : 'Unread'}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-xs)',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Table */}
      <div className="admin-table-wrapper">
        {filteredMessages.length === 0 ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No inquiries match the current filter.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '90px' }}>Status</th>
                <th>Sender</th>
                <th>Subject & Snippet</th>
                <th>Date</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((m) => (
                <tr
                  key={m.id}
                  style={{
                    fontWeight: m.status === 'unread' ? 600 : 400,
                    background: selectedMessage?.id === m.id ? 'rgba(243, 188, 62, 0.05)' : undefined,
                  }}
                >
                  <td>
                    <span className={`badge ${m.status === 'unread' ? 'badge--danger' : 'badge--success'}`}>
                      {m.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div>{m.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {m.email}
                    </div>
                  </td>
                  <td style={{ maxWidth: '400px' }}>
                    <div style={{ color: 'var(--text-primary)' }}>{m.subject || 'General Inquiry'}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 400 }}>
                      {m.message}
                    </div>
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', whiteSpace: 'nowrap', fontWeight: 400 }}>
                    {new Date(m.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setSelectedMessage(m);
                        if (m.status === 'unread') handleToggleStatus(m);
                      }}
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
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
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
        )}
      </div>
    </div>
  );
}

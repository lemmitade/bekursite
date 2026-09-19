import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let sectorsCount = 8;
  let productsCount = 5;
  let messages: any[] = [];
  let homepageSections = 13;
  let unreadMessagesCount = 0;

  try {
    const results = await Promise.all([
      prisma.sector.count().catch(() => 8),
      prisma.product.count().catch(() => 5),
      prisma.contactMessage
        .findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
        })
        .catch(() => []),
      prisma.homepageSection.count().catch(() => 13),
    ]);

    sectorsCount = results[0];
    productsCount = results[1];
    messages = results[2];
    homepageSections = results[3];

    unreadMessagesCount = await prisma.contactMessage
      .count({
        where: { status: 'unread' },
      })
      .catch(() => 0);
  } catch (err) {
    console.error('Error loading admin dashboard statistics:', err);
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Welcome to the Bekur General Trading PLC Content Management Portal
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/admin/settings" className="btn btn--secondary" style={{ fontSize: 'var(--text-xs)' }}>
            ⚙️ Edit Settings
          </Link>
          <Link href="/" target="_blank" className="btn btn--primary" style={{ fontSize: 'var(--text-xs)' }}>
            Live Website ↗
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{sectorsCount}</div>
          <div className="admin-stat__label">Business Sectors</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__value">{productsCount}</div>
          <div className="admin-stat__label">Products & Solutions</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__value" style={{ color: unreadMessagesCount > 0 ? '#ef4444' : 'var(--gold)' }}>
            {unreadMessagesCount}
          </div>
          <div className="admin-stat__label">Unread Inquiries ({messages.length} total)</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__value">{homepageSections}</div>
          <div className="admin-stat__label">Homepage Sections</div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <Link
          href="/admin/sectors"
          className="admin-stat"
          style={{ textDecoration: 'none', transition: 'border-color var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>
              🏢 Business Sectors
            </h3>
            <span style={{ color: 'var(--gold)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Manage →</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            Configure the 8 core sectors, descriptions, full content, and photography.
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="admin-stat"
          style={{ textDecoration: 'none', transition: 'border-color var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>
              💡 Products & Solutions
            </h3>
            <span style={{ color: 'var(--gold)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Manage →</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            Manage smart poles, charger boxes, high mast, garden poles, and technical specs.
          </p>
        </Link>

        <Link
          href="/admin/homepage"
          className="admin-stat"
          style={{ textDecoration: 'none', transition: 'border-color var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>
              🏠 Homepage Sections
            </h3>
            <span style={{ color: 'var(--gold)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Manage →</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            Update hero text, company intro, future expansion highlights, and CTAs.
          </p>
        </Link>

        <Link
          href="/admin/messages"
          className="admin-stat"
          style={{ textDecoration: 'none', transition: 'border-color var(--transition-fast)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>
              📩 Contact Inquiries
            </h3>
            <span style={{ color: 'var(--gold)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>View All →</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            Read and review direct submissions from potential partners and clients.
          </p>
        </Link>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="admin-table-wrapper">
        <div
          style={{
            padding: 'var(--space-4) var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--card-border)',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Recent Inquiries
          </h2>
          <Link href="/admin/messages" style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)', textDecoration: 'none' }}>
            View All Inquiries →
          </Link>
        </div>

        {messages.length === 0 ? (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No contact inquiries received yet. When visitors fill the Contact form, they will appear here.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.name}</strong>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{m.email}</div>
                  </td>
                  <td>
                    <div>{m.subject || 'General Inquiry'}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {m.message}
                    </div>
                  </td>
                  <td style={{ fontSize: 'var(--text-xs)', whiteSpace: 'nowrap' }}>
                    {new Date(m.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>
                    <span className={`badge ${m.status === 'unread' ? 'badge--danger' : 'badge--success'}`}>
                      {m.status.toUpperCase()}
                    </span>
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

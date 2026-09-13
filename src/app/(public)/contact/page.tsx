import prisma from '@/lib/prisma';
import ContactForm from '@/components/public/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | BEKUR General Trading PLC',
  description: 'Get in touch with Bekur General Trading PLC. Contact us for infrastructure solutions, technology partnerships, and business inquiries.',
};

export default async function ContactPage() {
  let settings: any = null;
  try {
    settings = await prisma.siteSettings.findFirst({ where: { id: 'main' } });
  } catch {}

  const whatsappNumber = settings?.whatsappNumber || '+251946757671';
  const whatsappMessage = settings?.whatsappMessage || '';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg-text">CONTACT</div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb__sep">/</span><span>Contact</span>
          </div>
          <span className="label">Get In Touch</span>
          <h1>Talk to Bekur</h1>
          <p className="page-hero__desc">We&apos;d love to hear from you. Reach out for partnerships, inquiries, or project discussions.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--content">
          <div className="split">
            <div>
              <div className="gold-line" />
              <h2>Contact Information</h2>

              <div style={{ marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Email</div>
                    <a href={`mailto:${settings?.email || 'bekurgeneraltradingplc@gmail.com'}`} style={{ color: 'var(--text-primary)' }}>
                      {settings?.email || 'bekurgeneraltradingplc@gmail.com'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Phone</div>
                    <div>{settings?.phone1 || '+251 946 757 671'}</div>
                    {settings?.phone2 && <div>{settings.phone2}</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>WhatsApp</div>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>Message us on WhatsApp</a>
                  </div>
                </div>
              </div>

              <div className="btn-group mt-10">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  WhatsApp Us
                </a>
                <a href={`mailto:${settings?.email || 'bekurgeneraltradingplc@gmail.com'}`} className="btn btn--secondary">
                  Send Email
                </a>
              </div>

              {settings?.mapEmbedUrl && (
                <div style={{ marginTop: 'var(--space-10)', aspectRatio: '16/9', border: '1px solid var(--border-color)' }}>
                  <iframe
                    src={settings.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bekur Office Location"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="gold-line" />
              <h2>Send a Message</h2>
              <p className="body-sm mt-4 mb-8">Fill in the form below and we&apos;ll get back to you as soon as possible.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

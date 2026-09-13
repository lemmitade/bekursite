'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Thank you for your message. We will get back to you shortly.');
        (e.target as HTMLFormElement).reset();
      } else {
        const err = await res.json();
        setStatus('error');
        setMessage(err.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === 'success' && <div className="form-message form-message--success">{message}</div>}
      {status === 'error' && <div className="form-message form-message--error">{message}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name">Full Name *</label>
          <input type="text" id="contact-name" name="name" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email Address *</label>
          <input type="email" id="contact-email" name="email" className="form-input" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-phone">Phone Number</label>
          <input type="tel" id="contact-phone" name="phone" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="contact-subject">Subject</label>
          <input type="text" id="contact-subject" name="subject" className="form-input" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Message *</label>
        <textarea id="contact-message" name="message" className="form-input form-input--textarea" required />
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

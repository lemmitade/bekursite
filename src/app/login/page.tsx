'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPassword,
        callbackUrl,
        redirectTo: callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      } else {
        // Force full page reload so session cookies and middleware sync seamlessly
        const targetUrl = res?.url && !res.url.includes('/login') ? res.url : callbackUrl;
        window.location.href = targetUrl;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.type === 'CredentialsSignin' || err?.message?.includes('CredentialsSignin')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@bekur.com');
    setPassword('BekurAdmin2024!');
    setError('');
  };

  return (
    <div className="login-card">
      <div className="login-card__logo">
        <img
          src="/images/logo-light.png"
          alt="BEKUR General Trading PLC"
          className="login-card__logo-img"
        />
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, letterSpacing: '0.06em' }}>
          ADMIN PORTAL
        </div>
      </div>

      <p className="login-card__subtitle">
        Sign in to manage website content, sectors, and inquiries
      </p>

      {error && (
        <div className="login-card__error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="admin@bekur.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ width: '100%', paddingRight: '45px' }}
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--text-xs)',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn--primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </button>
      </form>

      <div
        style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'rgba(243, 188, 62, 0.08)',
          border: '1px solid rgba(243, 188, 62, 0.25)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--text-xs)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--gold)' }}>Seeded Admin Account:</span>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Auto-fill
          </button>
        </div>
        <div style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>
          <div>admin@bekur.com</div>
          <div>BekurAdmin2024!</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
        <Link
          href="/"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}
        >
          ← Return to public website
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page">
      <Suspense fallback={<div style={{ color: 'var(--white)' }}>Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

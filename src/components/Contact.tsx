import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data';
import Tilt, { SectionHeading } from './Tilt';

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/nitin-kumar-vasdhani', href: profile.linkedin },
  { icon: Github, label: 'GitHub', value: 'nitinvasdhani123', href: profile.github },
  { icon: MapPin, label: 'Location', value: `${profile.location} · open to relocation` },
];

// Enquiries are emailed over SMTP by our own serverless function (api/contact.ts).
// Nothing is stored anywhere: the function sends the email and forgets the data.
const FORM_ENDPOINT = '/api/contact';

type Field = 'name' | 'email' | 'phone' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
const empty: Values = { name: '', email: '', phone: '', message: '' };

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = 'Please enter your name.';
  if (!v.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !/^\+?[\d\s\-()]{7,20}$/.test(v.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (!v.message.trim()) errors.message = 'Please write a message.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const errors = validate(values);
  const showError = (f: Field) => (touched[f] && errors[f]) || '';

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (status === 'sent' || status === 'error') setStatus('idle');
  };
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const errs = validate(values);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      (e.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          company: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        setValues(empty);
        setTouched({});
      } else {
        setServerMsg(typeof data.error === 'string' ? data.error : '');
        setStatus('error');
      }
    } catch {
      setServerMsg('');
      setStatus('error');
    }
  };

  const inputProps = (f: Field) => ({
    name: f,
    value: values[f],
    onChange,
    onBlur,
    'aria-invalid': !!showError(f),
    'aria-describedby': showError(f) ? `${f}-error` : undefined,
    className: `field ${showError(f) ? 'field-error' : ''}`,
  });

  const errorText = (f: Field) =>
    showError(f) ? (
      <span id={`${f}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
        <AlertCircle size={13} /> {showError(f)}
      </span>
    ) : null;

  const req = <span className="text-red-400">*</span>;

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="07 / Contact"
          title="Let's build something."
          sub="Hiring for a backend role, or need a Laravel and MySQL developer? I can join immediately."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3" data-reveal>
            {channels.map((c) => {
              const inner = (
                <div className="flex items-center gap-4" style={{ transform: 'translateZ(20px)' }}>
                  <div className="icon-tile">
                    <c.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{c.label}</p>
                    <p className="truncate text-white">{c.value}</p>
                  </div>
                </div>
              );
              return (
                <Tilt key={c.label} className="card p-4" max={6}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Tilt>
              );
            })}
          </div>

          <div data-reveal>
            <Tilt className="card p-6 sm:p-8" max={4}>
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                {/* honeypot: hidden from people, bots fill it and get silently ignored */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-muted">Your name {req}</span>
                    <input {...inputProps('name')} required autoComplete="name" placeholder="Jane Doe" />
                    {errorText('name')}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-muted">Your email {req}</span>
                    <input {...inputProps('email')} type="email" required autoComplete="email" placeholder="jane@company.com" />
                    {errorText('email')}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm text-muted">
                    Phone number <span className="text-xs text-muted/70">(optional)</span>
                  </span>
                  <input {...inputProps('phone')} type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                  {errorText('phone')}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-muted">Message {req}</span>
                  <textarea
                    {...inputProps('message')}
                    className={`${inputProps('message').className} resize-none`}
                    required
                    rows={5}
                    placeholder="Tell me about the role or project…"
                  />
                  {errorText('message')}
                </label>

                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-70">
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send message
                    </>
                  )}
                </button>

                <div aria-live="polite">
                  {status === 'sent' && (
                    <p className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                      <CheckCircle2 size={16} /> Thanks! Your message has been sent. I'll get back to you soon.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>
                        {serverMsg || 'Something went wrong while sending.'} You can also email me directly at{' '}
                        <a href={`mailto:${profile.email}`} className="underline">
                          {profile.email}
                        </a>
                        .
                      </span>
                    </p>
                  )}
                  {(status === 'idle' || status === 'sending') && (
                    <p className="text-center text-xs text-muted">Fields marked {req} are required.</p>
                  )}
                </div>
              </form>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}

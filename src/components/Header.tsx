import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data';

const nav = [
  { name: 'About', href: '#about' },
  { name: 'Ventures', href: '#ventures' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Writing', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive('#' + en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled || open ? 'glass shadow-2xl shadow-black/40' : ''
          }`}
        >
          <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="logo-cube" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              NKV<span className="text-gold">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === n.href ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {n.name}
                <span
                  className={`mx-auto mt-0.5 block h-px bg-gold transition-all duration-300 ${active === n.href ? 'w-full' : 'w-0'}`}
                />
              </a>
            ))}
            <a href={profile.resume} download="Nitin-Kumar-Vasdhani-Resume.pdf" className="btn-primary ml-3 !px-4 !py-2 text-sm">
              Resume
            </a>
          </nav>

          <button
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="glass mt-2 rounded-2xl p-3 md:hidden" aria-label="Mobile">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-muted hover:bg-white/5 hover:text-white"
              >
                {n.name}
              </a>
            ))}
            <a
              href={profile.resume}
              download="Nitin-Kumar-Vasdhani-Resume.pdf"
              className="btn-primary mt-2 w-full justify-center"
            >
              Download resume
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

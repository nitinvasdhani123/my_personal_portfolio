import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-end pb-16 pt-[46svh] lg:items-center lg:pb-0 lg:pt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted backdrop-blur" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to roles · Immediate joiner · Open to relocation
          </div>

          <h1 className="hero-in font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.2s' }}>
            Nitin Kumar
            <br />
            <span className="text-gradient">Vasdhani</span>
          </h1>

          <p className="hero-in mt-5 font-mono text-sm text-gold sm:text-base" style={{ animationDelay: '0.3s' }}>
            {'>'} {profile.role} · {profile.stack}
          </p>

          <p className="hero-in mt-5 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: '0.4s' }}>
            I build the backend of SaaS products: schemas, APIs, access control and reports, and I make slow queries fast.
            Founder of{' '}
            <a href="https://autoflowmatrix.com" target="_blank" rel="noopener noreferrer" className="link">
              AutoFlowMatrix
            </a>
            , the company behind Suite and EaseMyBlogs.
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '0.5s' }}>
            <a href={profile.resume} download="Nitin-Kumar-Vasdhani-Resume.pdf" className="btn-primary">
              <Download size={18} /> Download resume
            </a>
            <a href="#ventures" className="btn-ghost">
              See my work
            </a>
            <div className="ml-1 flex gap-2">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted hover:text-white lg:flex"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}

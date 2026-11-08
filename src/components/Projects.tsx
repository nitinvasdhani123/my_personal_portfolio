import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { company, ventures } from '../data';
import Tilt, { SectionHeading } from './Tilt';

export default function Projects() {
  return (
    <section id="ventures" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="02 / Ventures"
          title="What I founded"
          sub="AutoFlowMatrix is my company. These are the products we've built and run, from the database up."
        />

        {/* Company card */}
        <div data-reveal>
          <Tilt className="card card-highlight p-7 sm:p-9" max={4}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center" style={{ transform: 'translateZ(30px)' }}>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="icon-tile">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">{company.name}</h3>
                  <span className="pill pill-accent">{company.role}</span>
                </div>
                <p className="mt-4 font-display text-xl text-gradient">{company.tagline}</p>
                <p className="mt-3 leading-relaxed text-muted">{company.description}</p>
                <a href={company.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                  Visit {company.host} <ArrowUpRight size={16} />
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">What we build</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {company.services.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Tilt>
        </div>

        <p className="mb-6 mt-14 font-mono text-xs uppercase tracking-[0.18em] text-muted" data-reveal>
          Products
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {ventures.map((v, i) => (
            <div key={v.name} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <Tilt className={`card venture venture-${v.accent} flex h-full flex-col p-6`} max={7}>
                <div className="browser" style={{ transform: 'translateZ(50px)' }}>
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 truncate rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-muted">{v.host}</span>
                  </div>
                  <div className="browser-body">
                    <span className="font-display text-2xl font-semibold text-white">{v.name}</span>
                    <span className="mt-1 text-sm text-muted">{v.tagline}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-1 flex-col" style={{ transform: 'translateZ(25px)' }}>
                  <p className="leading-relaxed text-muted">{v.description}</p>
                  <ul className="mt-5 space-y-2">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                        <Check size={15} className="shrink-0 text-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {v.tech.map((t) => (
                      <span key={t} className="pill pill-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 self-start">
                    Visit {v.name} <ArrowUpRight size={16} />
                  </a>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

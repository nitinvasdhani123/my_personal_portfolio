import { Building2, MapPin } from 'lucide-react';
import { experience, otherProducts, products } from '../data';
import Tilt, { SectionHeading } from './Tilt';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="03 / Experience"
          title="Where I've shipped"
          sub="Intern to Backend Developer in just over a year, working on live SaaS products used by real businesses."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Company + promotion ladder */}
          <div data-reveal>
            <Tilt className="card h-full p-7" max={6}>
              <div className="flex items-start gap-4" style={{ transform: 'translateZ(30px)' }}>
                <div className="icon-tile">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{experience.company}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} /> {experience.location} · {experience.period}
                  </p>
                </div>
              </div>

              <ol className="ladder mt-8">
                {experience.ladder.map((step, i) => (
                  <li key={step.title} className={i === 0 ? 'is-current' : ''}>
                    <p className="font-display text-lg font-semibold text-white">{step.title}</p>
                    <p className="font-mono text-xs text-muted">{step.period}</p>
                  </li>
                ))}
              </ol>

              <ul className="mt-8 space-y-3">
                {experience.points.map((p) => (
                  <li key={p} className="flex gap-3 text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">Day-to-day stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {experience.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          </div>

          {/* Products worked on */}
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((p, i) => (
              <div key={p.name} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className={p.highlight ? 'sm:col-span-2' : ''}>
                <Tilt className={`card h-full p-6 ${p.highlight ? 'card-highlight' : ''}`}>
                  <div style={{ transform: 'translateZ(25px)' }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-xl font-semibold text-white">{p.name}</h4>
                      {p.highlight && <span className="pill pill-accent">~90% of backend</span>}
                    </div>
                    <p className="mt-1 text-sm text-gold/90">{p.kind}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="pill pill-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}

            {/* Other products: full width */}
            <div data-reveal className="sm:col-span-2">
              <Tilt className="card h-full p-6" max={5}>
                <div style={{ transform: 'translateZ(25px)' }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-xl font-semibold text-white">Other products</h4>
                    <span className="font-mono text-xs text-muted">Laravel · MySQL</span>
                  </div>
                  <p className="mt-1 text-sm text-gold/90">Built at SAER for the company and its clients</p>
                  <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {otherProducts.map((o) => (
                      <li key={o.name} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                        <div>
                          <p className="text-sm font-medium text-white">{o.name}</p>
                          <p className="text-sm text-muted">{o.body}</p>
                        </div>
                      </li>
                    ))}
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <p className="text-sm font-medium text-gold">+ many more client projects</p>
                    </li>
                  </ul>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

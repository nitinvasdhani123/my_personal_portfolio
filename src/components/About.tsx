import { Database, Gauge, ShieldCheck } from 'lucide-react';
import { profile, stats } from '../data';
import Tilt, { SectionHeading } from './Tilt';

const focus = [
  { icon: Database, title: 'Schema design', body: 'Tables, relations and migrations that stay clean as the product grows.' },
  { icon: Gauge, title: 'Query performance', body: 'The right indexes and rewritten queries so pages and reports load fast.' },
  { icon: ShieldCheck, title: 'Access & APIs', body: 'REST APIs, login and role-based permission flows, server-side validation.' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="01 / About" title="Backend first. Database at heart." />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-muted" data-reveal>
            <p>{profile.summary}</p>
            <p>{profile.summary2}</p>
            <p className="text-base">
              Based in {profile.location}. When I'm not writing code I'm usually travelling, singing or solving problems on HackerRank.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4" data-reveal>
            {stats.map((s) => (
              <Tilt key={s.label} className="card p-6" max={12}>
                <div className="font-display text-4xl font-semibold text-gradient sm:text-5xl" style={{ transform: 'translateZ(40px)' }}>
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted" style={{ transform: 'translateZ(20px)' }}>
                  {s.label}
                </div>
              </Tilt>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {focus.map((f, i) => (
            <div key={f.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <Tilt className="card h-full p-6">
                <div className="icon-tile" style={{ transform: 'translateZ(30px)' }}>
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-muted">{f.body}</p>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

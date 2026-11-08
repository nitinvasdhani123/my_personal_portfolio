import { skills } from '../data';
import Tilt, { SectionHeading } from './Tilt';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="04 / Skills" title="The toolkit" sub="What I use every day to design, build and debug backends." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <div
              key={s.group}
              data-reveal
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              className={s.group === 'Laravel & Backend' || s.group === 'CS Fundamentals' ? 'lg:col-span-2' : ''}
            >
              <Tilt className="card h-full p-6">
                <div style={{ transform: 'translateZ(25px)' }}>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">{s.group}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap } from 'lucide-react';
import { education } from '../data';
import Tilt, { SectionHeading } from './Tilt';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="05 / Education" title="Foundations" />

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <div key={e.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className={e.main ? 'md:col-span-2' : ''}>
              <Tilt className={`card h-full ${e.main ? 'card-highlight p-7 sm:p-8' : 'p-6'}`} max={e.main ? 4 : 8}>
                <div className="flex items-start gap-4 sm:gap-5" style={{ transform: 'translateZ(25px)' }}>
                  <div className="icon-tile">
                    <GraduationCap size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className={`font-display font-semibold text-white ${e.main ? 'text-2xl' : 'text-lg'}`}>{e.title}</h3>
                      <span className="font-mono text-xs text-muted">{e.period}</span>
                    </div>
                    <p className="mt-1 text-muted">{e.place}</p>
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

import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data';
import Tilt, { SectionHeading } from './Tilt';

export default function Blog() {
  return (
    <section id="blog" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="06 / Writing" title="From EaseMyBlogs" sub="Things I've written on my own platform." />

        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p, i) => (
            <div key={p.link} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                <Tilt className="card flex h-full flex-col p-6">
                  <div className="flex flex-1 flex-col" style={{ transform: 'translateZ(25px)' }}>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-aqua">{p.tag}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm text-white/85">
                      Read post <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Tilt>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10" data-reveal>
          <a
            href="https://easemyblogs.com/author/profile/nitin_kumar_vasdhani"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            All posts <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

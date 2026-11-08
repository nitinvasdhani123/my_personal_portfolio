import { ArrowUp } from 'lucide-react';
import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          Copyright © {new Date().getFullYear()} {profile.name} | All Rights Reserved
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 hover:text-white">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}

import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#7B542F] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4 text-[#FFCF71]">Nitin Kumar Vasdhani</h3>
            <p className="text-white/80">
              Backend Developer & Software Engineer passionate about building scalable web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 text-[#FFCF71]">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#about" className="hover:text-[#FF9D00] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#FF9D00] transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#FF9D00] transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#FF9D00] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#FF9D00] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FF9D00] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg mb-4 text-[#FFCF71]">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/nitin-kumar-vasdhani/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FF9D00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/nitinvasdhani123"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FF9D00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:nitinkumarvasdhani786@gmail.com"
                className="bg-white/10 hover:bg-[#FF9D00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 flex items-center justify-center gap-2">
            Copyright © 2025 Nitin Kumar Vasdhani — Portfolio
            <span className="text-[#FF9D00]">|</span>
            Made with <Heart size={16} className="text-[#FF9D00] fill-[#FF9D00]" /> and dedication
          </p>
        </div>
      </div>
    </footer>
  );
}

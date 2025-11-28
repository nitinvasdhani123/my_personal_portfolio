import { Github, Linkedin, Mail, Download, FolderGit2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-[#7B542F] to-[#B6771D] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl text-white">
                Nitin Kumar Vasdhani
              </h1>
              <h2 className="text-2xl lg:text-3xl text-[#FFCF71]">
                Backend Developer & Software Engineer
              </h2>
              <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                Results-driven Software Engineer specializing in Node.js, Laravel, MySQL & MongoDB. Passionate about scalable backend systems and performance optimization.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/n-k-v-resume.pdf"   // 🔥 yaha apna actual resume path daalo
                download="Nitin-Kumar-Vasdhani-Resume.pdf"
                className="bg-[#FF9D00] hover:bg-[#FF9D00]/90 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a href="#projects" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:scale-105 border border-white/30">
                <FolderGit2 size={20} />
                View Projects
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/nitin-kumar-vasdhani/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/nitinvasdhani123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:nitinkumarvasdhani786@gmail.com"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Photo Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-[#FFCF71] to-[#FF9D00] p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#B6771D] to-[#7B542F] flex items-center justify-center">
                <span className="text-8xl lg:text-9xl text-[#FFCF71]">NK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
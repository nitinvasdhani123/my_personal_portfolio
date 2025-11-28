import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Projects() {
  const projects = [
    {
      title: 'EaseMyBlogs',
      description: 'A full-featured blogging platform built with Laravel, featuring user authentication, CRUD operations, and a rich text editor for creating engaging blog content.',
      tech: ['Laravel', 'MySQL', 'Bootstrap'],
      image: 'blogging platform',
      link: 'https://easemyblogs.com/',   // ✅ Added
    },
    {
      title: 'Real-Time Chat App',
      description: 'MERN stack application with WebSocket integration for instant messaging. Features include real-time notifications, typing indicators, and message history.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      image: 'chat application',
      link: 'https://github.com/nitinvasdhani123/Chatify',  // ✅ Added
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work in backend development and full-stack applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#FFCF71]/20 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
            >

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl text-[#7B542F]">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-[#B6771D]/10 text-[#7B542F] px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FF9D00] hover:bg-[#FF9D00]/90 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
          
          {/* View All */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/nitinvasdhani123?tab=repositories"
            target="_blank"
            className="bg-[#7B542F] hover:bg-[#7B542F]/90 text-white px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            View All Projects
          </a>
        </div>

      </div>
    </section>
  );
}

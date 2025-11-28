import { Code, Server, Layout, Database, Wrench, Brain } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: 'Programming',
      skills: ['JavaScript', 'C++'],
    },
    {
      icon: Server,
      title: 'Frameworks',
      skills: ['Node.js', 'Express.js', 'Laravel'],
    },
    {
      icon: Layout,
      title: 'Frontend',
      skills: ['HTML', 'CSS', 'Bootstrap', 'jQuery'],
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['MySQL'],
    },
    {
      icon: Wrench,
      title: 'Tools',
      skills: ['Git', 'Github', 'VS Code', 'Postman'],
    },
    {
      icon: Brain,
      title: 'Other',
      skills: ['DSA', 'Problem-solving'],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit for building robust backend systems and modern web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#FFCF71]/30 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#FF9D00] p-3 rounded-xl">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl text-[#7B542F]">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-[#FF9D00] text-white px-4 py-2 rounded-full text-sm hover:bg-[#FF9D00]/90 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

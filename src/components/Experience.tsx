import { Briefcase, Calendar } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'Backend Developer',
      company: 'SAER Technologies',
      period: '2024 – Present',
      responsibilities: [
        'Built REST APIs for scalable web applications',
        'Improved response time by 20% through optimization',
        'Integrated MongoDB & MySQL databases',
        'Code reviews and team collaboration',
      ],
    },
    {
      title: 'AI/ML Chatbot Developer',
      company: 'IBM SkillBuild',
      period: '2024',
      responsibilities: [
        'Developed machine learning models for chatbot intelligence',
        'Implemented chatbot development frameworks',
        'Enhanced user interaction through AI capabilities',
      ],
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'SAER Technologies',
      period: '2023',
      responsibilities: [
        'Built React pages with 15% faster load times',
        'Improved Laravel API performance',
        'Collaborated on full-stack web applications',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-[#B6771D]/10 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Work Experience</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#B6771D] hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-8 -translate-x-1/2 w-6 h-6 bg-[#FF9D00] rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                {/* Content Card */}
                <div className="md:ml-20 bg-[#FFCF71]/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl text-[#7B542F] mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-[#B6771D]">
                        <Briefcase size={18} />
                        <span className="text-lg">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-full w-fit">
                      <Calendar size={18} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-3 text-gray-700">
                        <span className="text-[#FF9D00] mt-1">▪</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

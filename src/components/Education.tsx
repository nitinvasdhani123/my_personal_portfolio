import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  const education = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Jaipur National University',
      year: '2021 – 2025',
      icon: GraduationCap,
    },
    {
      degree: '12th Grade (PCM)',
      institution: 'Police Modern School',
      year: '2020',
      icon: Award,
    },
    {
      degree: '10th Grade',
      institution: 'Police Modern School',
      year: '2018',
      icon: Award,
    },
  ];

  return (
    <section id="education" className="py-24 bg-gradient-to-br from-[#B6771D]/10 to-[#FFCF71]/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Education</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Main Education Card */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-[#FF9D00] to-[#B6771D] p-8 rounded-2xl shadow-2xl text-white">
              <div className="flex items-start gap-6">
                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                  <GraduationCap size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2">B.Tech in Computer Science & Engineering</h3>
                  <p className="text-xl text-white/90 mb-2">Jaipur National University</p>
                  <p className="text-lg text-white/80">2021 – 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Education Cards */}
          {education.slice(1).map((edu, index) => {
            const Icon = edu.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFCF71]/30 p-3 rounded-xl">
                    <Icon size={32} className="text-[#FF9D00]" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#7B542F] mb-2">{edu.degree}</h3>
                    <p className="text-gray-700 mb-1">{edu.institution}</p>
                    <p className="text-gray-600">{edu.year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

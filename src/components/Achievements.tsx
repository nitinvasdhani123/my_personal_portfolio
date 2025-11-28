import { Award, Star, Users, Heart } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      icon: Award,
      title: 'IBM AI-ML Certificate',
      description: 'Completed comprehensive AI and Machine Learning certification program through IBM SkillBuild',
    },
    {
      icon: Star,
      title: '5-Star C++ HackerRank Badge',
      description: 'Achieved top-tier ranking in C++ problem-solving on HackerRank platform',
    },
    {
      icon: Users,
      title: 'Leadership & Teamwork',
      description: 'Strong collaborative skills with experience leading development teams and code reviews',
    },
  ];

  const interests = [
    { icon: '✈️', name: 'Traveling' },
    { icon: '🎵', name: 'Singing' },
    { icon: '🧩', name: 'Problem-solving' },
    { icon: '💻', name: 'Development' },
  ];

  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Achievements & Interests</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl text-[#7B542F] text-center mb-8">Certifications & Recognition</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#FFCF71]/30 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center"
                >
                  <div className="bg-[#FF9D00] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl text-[#7B542F] mb-3">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl text-[#7B542F] text-center mb-8">Personal Interests</h3>
          <div className="bg-gradient-to-br from-[#B6771D]/10 to-[#FFCF71]/20 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-default"
                >
                  <div className="text-4xl mb-3">{interest.icon}</div>
                  <p className="text-gray-700">{interest.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Code2, Lightbulb, Rocket } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#FFCF71]/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">About Me</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Software Engineer with 2 years of experience in building backend systems, REST APIs, and scalable web applications. Skilled in Node.js, Express.js, Laravel, MySQL, and cloud-ready architectures.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Passionate about problem-solving, clean code, and system performance. I believe in writing maintainable code that scales and delivers exceptional user experiences.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                <div className="text-3xl text-[#FF9D00] mb-2">2</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                <div className="text-3xl text-[#FF9D00] mb-2">10+</div>
                <div className="text-sm text-gray-600">Projects Built</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-md">
                <div className="text-3xl text-[#FF9D00] mb-2">5★</div>
                <div className="text-sm text-gray-600">HackerRank</div>
              </div>
            </div>
          </div>

          {/* Illustration/Features */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF9D00]/10 p-3 rounded-xl">
                  <Code2 size={32} className="text-[#FF9D00]" />
                </div>
                <div>
                  <h3 className="text-xl text-[#7B542F] mb-2">Clean Code</h3>
                  <p className="text-gray-600">Writing maintainable, scalable, and well-documented code that follows best practices.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF9D00]/10 p-3 rounded-xl">
                  <Lightbulb size={32} className="text-[#FF9D00]" />
                </div>
                <div>
                  <h3 className="text-xl text-[#7B542F] mb-2">Problem Solving</h3>
                  <p className="text-gray-600">Strong foundation in data structures and algorithms with a passion for solving complex challenges.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF9D00]/10 p-3 rounded-xl">
                  <Rocket size={32} className="text-[#FF9D00]" />
                </div>
                <div>
                  <h3 className="text-xl text-[#7B542F] mb-2">Performance</h3>
                  <p className="text-gray-600">Optimizing systems for speed and efficiency, improving response times and user experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

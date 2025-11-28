import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const blogPosts = [
    {
      title: 'The Future of Artificial Intelligence: Trends and Predictions',
      description:
        'Artificial Intelligence (AI) is revolutionizing industries, enhancing automation, and redefining human-machine collaboration. Explore the latest breakthroughs shaping the future.',
      image: 'Artificial Intelligence',
      link: 'https://easemyblogs.com/resource/blog/the-future-of-artificial-intelligence-trends-and-predictions',
    },
    {
      title: 'How Artificial Intelligence and Machine Learning Are Transforming the Future',
      description:
        'AI and ML are transforming industries, automating tasks, and reshaping the future of technology. Discover how these innovations are driving global change.',
      image: 'Machine Learning',
      link: 'https://easemyblogs.com/resource/hint-and-tips/how-artificial-intelligence-and-machine-learning-are-transforming-the-future',
    },
    {
      title: 'The Future of Technology: How AI, IoT, and Blockchain Are Transforming the World',
      description:
        'Technology is evolving at an unprecedented pace, with AI, IoT, and Blockchain leading the revolution. Learn how these emerging technologies are reshaping our world.',
      image: 'Technology',
      link: 'https://easemyblogs.com/resource/article/the-future-of-technology-how-ai-iot-and-blockchain-are-transforming-the-world',
    },
  ];

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#7B542F] mb-4">Latest Blog Posts</h2>
          <div className="w-24 h-1 bg-[#FF9D00] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing my journey, insights, and learnings in software development
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#FFCF71]/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
            >

              {/* Content */}
              <div className="p-6 space-y-4">

                {/* Title */}
                <h3 className="text-xl text-[#7B542F] leading-snug group-hover:text-[#FF9D00] transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                {/* Read More */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF9D00] hover:bg-[#FF9D00]/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105 group/btn mt-4"
                >
                  Read More
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>

              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="https://easemyblogs.com/author/profile/nitin_kumar_vasdhani"
            target="_blank"
            className="bg-[#7B542F] hover:bg-[#7B542F]/90 text-white px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            View All Posts
          </a>
        </div>

      </div>
    </section>
  );
}

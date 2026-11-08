export const profile = {
  name: 'Nitin Kumar Vasdhani',
  role: 'Backend Developer',
  stack: 'Laravel · PHP · MySQL',
  location: 'Agra, Uttar Pradesh 282001',
  email: 'nitinkumarvasdhani786@gmail.com',
  phone: '+91 93688 60517',
  phoneHref: 'tel:+919368860517',
  resume: '/n-k-v-resume.pdf',
  linkedin: 'https://www.linkedin.com/in/nitin-kumar-vasdhani/',
  github: 'https://github.com/nitinvasdhani123',
  hackerrank: 'https://www.hackerrank.com/profile/nitinkumarvasdh1',
  summary:
    'Software developer with 2+ years of Laravel and PHP work on live SaaS products. I wrote close to 90% of the OneLedger backend, from the database schema to APIs, access control and reports.',
  summary2:
    'I am most at home with database work: designing tables, adding the right indexes and fixing slow queries. I also founded AutoFlowMatrix, an automation and software company, and built its products: Suite, EaseMyBlogs and FlowBot.',
};

export const stats = [
  { value: '2+', label: 'Years building Laravel SaaS' },
  { value: '~90%', label: 'of the OneLedger backend written' },
  { value: '3', label: 'Products launched at AutoFlowMatrix' },
  { value: '5★', label: 'HackerRank C++' },
];

export const company = {
  name: 'AutoFlowMatrix',
  role: 'Founder',
  url: 'https://autoflowmatrix.com',
  host: 'autoflowmatrix.com',
  tagline: 'Automate the busywork. Grow the business.',
  description:
    'My company. We build AI automation, CRM systems, WhatsApp workflows and custom software for businesses, and run our own SaaS products.',
  services: [
    'AI Automation',
    'CRM Development',
    'WhatsApp Automation',
    'SaaS Development',
    'Workflow Automation',
    'Lead Management',
    'API Development & Integration',
    'Websites & Mobile Apps',
  ],
};

export const ventures = [
  {
    name: 'Suite',
    tagline: 'WhatsApp Business Platform',
    url: 'https://suite.autoflowmatrix.com',
    host: 'suite.autoflowmatrix.com',
    description:
      'A WhatsApp Business SaaS on the official Cloud API. Incoming messages arrive through webhooks into a shared team inbox, where chats can be assigned to agents, with internal notes and full conversation history.',
    features: ['Shared team inbox', 'Template broadcasts', 'No-code workflows', 'AI chatbot & replies', 'Contact segments', 'Analytics'],
    tech: ['Laravel', 'MySQL', 'WhatsApp Cloud API', 'Webhooks'],
    accent: 'aqua',
  },
  {
    name: 'EaseMyBlogs',
    tagline: 'Blogging platform',
    url: 'https://easemyblogs.com',
    host: 'easemyblogs.com',
    description:
      'A blogging website for content writers, with login, role-based content management, article sharing and an email newsletter, on a relational MySQL database.',
    features: ['Authentication', 'Role-based content', 'Author profiles', 'Email newsletter'],
    tech: ['Laravel', 'PHP', 'MySQL'],
    accent: 'gold',
  },
  {
    name: 'FlowBot',
    tagline: 'AI support chatbot',
    url: 'https://autoflowmatrix.com',
    host: 'autoflowmatrix.com',
    description:
      'An AI support chatbot for websites that gives instant answers, captures leads and handles support tickets.',
    features: ['Instant AI answers', 'Lead capture', 'Ticket handling'],
    tech: ['AI', 'Chatbot', 'Web widget'],
    accent: 'violet',
  },
];

export const experience = {
  company: 'SAER Technologies Private Limited',
  location: 'Jaipur, Rajasthan',
  period: 'Jan 2024 – Oct 2026',
  ladder: [
    { title: 'Backend Developer', period: 'Feb 2025 – Oct 2026' },
    { title: 'Junior Backend Developer', period: 'Jul 2024 – Jan 2025' },
    { title: 'Backend Intern', period: 'Jan 2024 – Jun 2024' },
  ],
  points: [
    'Promoted twice in just over a year: intern to Junior Backend Developer, then Backend Developer.',
    'Designed MySQL schemas and migrations for new modules, keeping tables normalised and relations clean as products grew.',
    'Spent a lot of time on the database side: adding indexes, restructuring tables and rewriting slow queries so pages and reports load faster.',
    'Built REST APIs and webhook handlers, and integrated third-party APIs into Laravel applications.',
    'Handled login and permission flows, role-based access control, server-side validation and reports across several client applications.',
    'Tracked down and fixed issues in live production systems.',
    'Used Claude, ChatGPT and GitHub Copilot day to day for writing code and tracking down bugs.',
  ],
  stack: ['Laravel', 'PHP', 'MySQL', 'Eloquent', 'REST APIs', 'Webhooks', 'Postman', 'Git'],
};

export const products = [
  {
    name: 'OneLedger',
    kind: 'Girvi & jewellery management SaaS for jewellers, pawnbrokers and finance shops',
    body: 'Wrote close to 90% of the Laravel backend: the MySQL schema, the REST APIs, and the girvi, inventory, invoicing, transactions, reports and role-based access modules.',
    tags: ['Schema design', 'REST APIs', 'RBAC', 'Reports'],
    highlight: true,
  },
  {
    name: 'ServiceTasker',
    kind: 'Lead-generation marketplace',
    body: 'Worked on lead workflows, the service-provider side and APIs. Connected a Python service that imports Google reviews and fixed issues in production.',
    tags: ['Lead workflows', 'APIs', 'Python service'],
  },
  {
    name: 'PureLocal',
    kind: 'Local business product',
    body: 'Built Laravel and MySQL modules for the product.',
    tags: ['Laravel', 'MySQL'],
  },
];

export const otherProducts = [
  { name: 'Share Street CRM', body: 'CRM for managing customers, leads and follow-ups.' },
  { name: 'Student Management System', body: 'Streamlines academic administration.' },
  { name: 'Real Estate Business Portfolio', body: 'Property listings and a digital presence for realtors.' },
  { name: 'SAER Company CRM', body: 'Internal CRM built for SAER’s own operations.' },
  { name: 'SAER Company Website', body: 'The face of SAER Technologies online.' },
  { name: 'Invoice Generator', body: 'Lightweight tool to manage bills and transactions.' },
  { name: 'HRM Modules', body: 'Employee and HR modules for client applications.' },
];

export const skills = [
  { group: 'Languages', items: ['PHP', 'JavaScript', 'Python', 'C++', 'SQL'] },
  {
    group: 'Laravel & Backend',
    items: ['Laravel', 'MVC', 'Eloquent ORM', 'Migrations', 'Middleware', 'Blade', 'Artisan', 'Composer', 'Authentication', 'Role-based Access Control'],
  },
  {
    group: 'APIs & HTTP',
    items: ['REST API Design', 'HTTP & Status Codes', 'Webhooks', 'Third-party API Integration', 'Postman'],
  },
  {
    group: 'Databases',
    items: ['MySQL', 'Schema Design', 'Normalization', 'Joins', 'Indexing', 'Query Optimization'],
  },
  { group: 'Frontend', items: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'] },
  { group: 'Tools & AI', items: ['Git', 'GitHub', 'VS Code', 'Chrome DevTools', 'Claude', 'ChatGPT', 'GitHub Copilot'] },
  {
    group: 'CS Fundamentals',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Computer Networks',
      'Operating Systems',
      'System Design',
      'Software Engineering',
      'Design Patterns',
      'Computer Architecture',
      'Theory of Computation',
      'Compiler Design',
      'Discrete Mathematics',
    ],
  },
];

export const education = [
  { title: 'B.Tech in Computer Science', place: 'Jaipur National University', period: 'Oct 2021 – Jun 2025', main: true },
  { title: '12th Grade (PCM)', place: 'Police Modern School', period: '2020' },
  { title: '10th Grade', place: 'Police Modern School', period: '2018' },
];

export const posts = [
  {
    title: 'The Future of Artificial Intelligence: Trends and Predictions',
    body: 'How AI is changing industries, automation and the way people work with machines.',
    tag: 'Blog',
    link: 'https://easemyblogs.com/resource/blog/the-future-of-artificial-intelligence-trends-and-predictions',
  },
  {
    title: 'How AI and Machine Learning Are Transforming the Future',
    body: 'Where AI and ML are automating work today and what that means for the next few years.',
    tag: 'Hints & Tips',
    link: 'https://easemyblogs.com/resource/hint-and-tips/how-artificial-intelligence-and-machine-learning-are-transforming-the-future',
  },
  {
    title: 'How AI, IoT and Blockchain Are Transforming the World',
    body: 'A look at three technologies moving fast and how they fit together.',
    tag: 'Article',
    link: 'https://easemyblogs.com/resource/article/the-future-of-technology-how-ai-iot-and-blockchain-are-transforming-the-world',
  },
];

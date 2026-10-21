// All site copy lives here. Edit this file to change what the page says.

export const nickname = 'IQ';

export const role = 'Artificial Intelligence · UC San Diego';

export const bio =
  "AI student at UC San Diego. I build and ship real products with Claude, from e-commerce storefronts to RAG systems, and teach other students to do the same. Off the keyboard, I'm on the court.";

export const resumeUrl = 'assets/RehmanIqbal_Resume.pdf';

// Links with url: null are hidden until filled in.
export const connect = [
  { label: 'Instagram', url: null },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rehman-iqbal-90348137b/' },
  { label: 'GitHub', url: 'https://github.com/rehmaniq248' },
];

// Most recent first. A role with now: true gets the "Now" marker.
// Without a logo, the company's initial is shown instead.
export const career = [
  {
    company: 'Chase USA International Inc.',
    roles: [{ year: '2026', title: 'Artificial Intelligence Intern', now: true }],
  },
  {
    company: 'Muslim Tech Collaborative',
    logo: 'assets/logos/mtc.png',
    roles: [{ year: '2026', title: 'Education Committee', now: true }],
  },
];

// deployedUrl wins over githubUrl when both exist (see projectLink).
export const projects = [
  {
    id: 'rag-study-buddy',
    title: 'RAG Interview Prep Study Buddy',
    stack: ['Python', 'Claude API', 'ChromaDB'],
    description:
      'End-to-end RAG system with offline embeddings, semantic search and cross-encoder reranking. 187 automated tests, about $0.0013 per question.',
    githubUrl: 'https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy',
    image: 'assets/projects/rag-study-buddy.jpg',
  },
  {
    id: 'grantmatcher',
    title: 'GrantMatcher',
    stack: ['React', 'Claude API', 'Vercel'],
    description:
      'Built in under 24 hours at DiamondHacks: matches nonprofits to grants that fit their mission and drafts outreach emails.',
    githubUrl: 'https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher',
    deployedUrl: 'https://diamond-hacks-hackathon-non-profit.vercel.app',
    image: 'assets/projects/grantmatcher.jpg',
  },
];

export const sportsProjects = [
  {
    id: 'basketball',
    title: 'Basketball Project',
    stack: [],
    description: 'Something for the hoopers. Dropping soon.',
    featured: true,
  },
];

// The Work page shows this site in a frame. Fill in the URL to turn it on.
export const work = {
  company: 'Family business',
  url: null,
};

export function projectLink(project) {
  return project.deployedUrl || project.githubUrl || null;
}

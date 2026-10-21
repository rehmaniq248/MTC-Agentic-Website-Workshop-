// All site copy lives here. Edit this file to change what the page says.

export const bio =
  "AI student at UC San Diego. I build and ship real products with Claude, from e-commerce storefronts to RAG systems, and teach other students to do the same. Off the keyboard, I'm on the court.";

export const education = 'UC San Diego · B.S. Artificial Intelligence · Expected Spring 2028';

export const resumeUrl = 'assets/RehmanIqbal_Resume.pdf';

// deployedUrl wins over githubUrl when both exist (see projectLink).
export const projects = [
  {
    id: 'rag-study-buddy',
    title: 'RAG Interview Prep Study Buddy',
    stack: ['Python', 'Claude API', 'ChromaDB'],
    description:
      'End-to-end RAG system with offline embeddings, semantic search and cross-encoder reranking. 187 automated tests, about $0.0013 per question.',
    githubUrl: 'https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy',
  },
  {
    id: 'grantmatcher',
    title: 'GrantMatcher',
    stack: ['React', 'Claude API', 'Vercel'],
    description:
      'Built in under 24 hours at DiamondHacks: matches nonprofits to grants that fit their mission and drafts outreach emails.',
    githubUrl: 'https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher',
  },
  {
    id: 'basketball',
    title: 'Basketball Project',
    stack: [],
    description: 'Something for the hoopers. Dropping soon.',
    featured: true,
  },
];

export const experience = [
  {
    company: 'Chase USA International Inc.',
    role: 'Artificial Intelligence Intern',
    dates: 'Jun 2026 – Present',
    location: 'San Ysidro, CA',
    highlights: [
      'Shipped a Shopify storefront: 12 custom theme sections across 10+ production releases',
      'Redesign drove +27% website traffic and +35% orders',
      'Python pipeline migrated 115+ products from WooCommerce to Shopify',
      'QR code trade-show tags boosted floor efficiency by 20%',
    ],
  },
  {
    company: 'Muslim Tech Collaborative',
    role: 'Education Committee',
    dates: 'Jun 2026 – Present',
    location: 'San Diego, CA',
    highlights: [
      'Designed and open-sourced a Claude Code workshop for UCSD students',
      'Built custom MCP servers, Claude skills and agents to power it',
    ],
  },
];

export function projectLink(project) {
  return project.deployedUrl || project.githubUrl || null;
}

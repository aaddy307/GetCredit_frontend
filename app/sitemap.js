import { BASE_URL } from '@/lib/seo';

const API_URL = process.env.API_URL || 'http://localhost:5000';

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 3600 },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
    return [];
  }
}

function formatDate(date) {
  if (!date) return '2026-06-10';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

export default async function sitemap() {
  const blogs = await getBlogs();

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: '2026-06-10',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: '2026-06-10',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: '2026-06-10',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/emi-calculator`,
      lastModified: '2026-06-10',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: '2026-06-10',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2026-06-10',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: '2026-06-10',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: '2026-06-10',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: '2026-06-10',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const serviceAnchors = [
    { anchor: 'personal-loan', priority: 0.8 },
    { anchor: 'business-loan', priority: 0.8 },
    { anchor: 'non-salaried-loan', priority: 0.8 },
    { anchor: 'home-loan', priority: 0.8 },
    { anchor: 'loan-against-property', priority: 0.8 },
    { anchor: 'education-loan', priority: 0.8 },
    { anchor: 'vehicle-loan', priority: 0.8 },
  ];

  const serviceRoutes = serviceAnchors.map(({ anchor, priority }) => ({
    url: `${BASE_URL}/services#${anchor}`,
    lastModified: '2026-06-10',
    changeFrequency: 'weekly',
    priority,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug || blog._id}`,
    lastModified: formatDate(blog.updatedAt || blog.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

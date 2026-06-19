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
  if (!date) return new Date().toISOString().split('T')[0];
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export default async function sitemap() {
  const blogs = await getBlogs();
  const today = getCurrentDate();

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/emi-calculator`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: today,
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
    lastModified: today,
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

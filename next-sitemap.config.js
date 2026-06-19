/** @type {import('next-sitemap').Config} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://get-credit.in',
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: '*', disallow: ['/admin/', '/dashboard/', '/api/'] },
    ],
  },
  changeFreq: 'weekly',
  priority: 0.7,
  sitemapBaseFileName: 'sitemap',
  templates: {
    sitemap: {
      loc: `${process.env.SITE_URL || 'https://get-credit.in'}/sitemap.xml`,
      lastmod: 'DATE',
    },
  },
  images: {
    enabled: true,
    dir: 'public',
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
  },
};

module.exports = config;

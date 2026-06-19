/** @type {import('next-sitemap').Config} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://get-credit.in',
  generateRobotsTxt: false,
  exclude: ['/admin/*', '/dashboard/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  outDir: './public',
  sitemapBaseFileName: 'sitemap-index',
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
  filters: {
    excludePatterns: ['/api/*', '/admin/*', '/dashboard/*'],
  },
};

module.exports = config;

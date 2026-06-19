export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin/', '/dashboard/', '/api/'],
      },
    ],
    sitemap: 'https://get-credit.in/sitemap.xml',
  };
}

export default function manifest() {
  return {
    name: 'Get Credit - Fast & Easy Loan Solutions',
    short_name: 'GetCredit',
    description: 'Loan consultancy for home loan, education loan, business loan, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#C9A84C',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/Logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  };
}

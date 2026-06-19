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
        src: '/Logo.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
      {
        src: '/Logo.jpeg',
        sizes: '180x180',
        type: 'image/jpeg',
        id: 'apple-touch-icon',
      },
    ],
  };
}

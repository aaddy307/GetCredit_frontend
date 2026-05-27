export const BASE_URL = 'https://get-credit.in';
export const SITE_NAME = 'Get Credit';
export const OG_IMAGE = '/Logo.jpeg';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/Logo.jpeg`,
    description: 'Loan consultancy and DSA business helping individuals find the best loan solutions.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7738205198',
      contactType: 'customer support',
      email: 'support@get-credit.in',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://facebook.com/getcredit',
      'https://x.com/getcredit',
      'https://instagram.com/getcredit',
      'https://linkedin.com/company/getcredit',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: `${BASE_URL}/Logo.jpeg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shivling Nagar, Near Shivling Recendency',
      addressLocality: 'Ambernath West',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    telephone: '+91-7738205198',
    email: 'support@get-credit.in',
    areaServed: 'India',
    priceRange: '$$',
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    url: `${BASE_URL}/blog/${blog.slug}`,
    datePublished: blog.date,
    dateModified: blog.updatedAt || blog.date,
    author: {
      '@type': 'Person',
      name: blog.author || 'Get Credit Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/Logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${blog.slug}`,
    },
    image: blog.coverImage || `${BASE_URL}/Logo.jpeg`,
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    areaServed: 'India',
  };
}

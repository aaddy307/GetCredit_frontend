export const BASE_URL = 'https://get-credit.in';
export const SITE_NAME = 'Get Credit';

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
    name: 'Get Credit',
    image: `${BASE_URL}/Logo.jpeg`,
    logo: `${BASE_URL}/Logo.jpeg`,
    url: BASE_URL,
    telephone: '+91-7738205198',
    email: 'support@get-credit.in',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 7738205198',
        contactType: 'customer service'
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91 8408926551',
        contactType: 'customer service'
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91 8793604734',
        contactType: 'customer service'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Chinchpada Opp. New Fire Brigade',
      addressLocality: 'Ambernath West',
      addressRegion: 'Maharashtra',
      postalCode: '421505',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://facebook.com/getcredit',
      'https://instagram.com/getcredit',
      'https://linkedin.com/company/getcredit',
      'https://x.com/getcredit'
    ],
    priceRange: '$$',
    areaServed: ['Ambernath', 'Ulhasnagar', 'Kalyan', 'Thane', 'Maharashtra', 'India']
  };
}

export function homepageFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What is the minimum credit score required for a loan?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The minimum CIBIL score required for most loans is 650-700. However, this may vary depending on the type of loan and the lender."
        }
      },
      {
        '@type': 'Question',
        name: "How long does it take to get a loan approved?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Typically, it takes 24-48 hours for pre-approved customers and 3-7 working days for new applicants after submitting all required documents."
        }
      },
      {
        '@type': 'Question',
        name: "What documents are required for a loan application?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Basic documents include Identity proof (Aadhaar/PAN), Address proof, Income documents (Salary slips/ITR), and bank statements."
        }
      },
      {
        '@type': 'Question',
        name: "Can I prepay my loan early?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, most loans allow prepayment. Some lenders charge a prepayment penalty of 1-2% on the outstanding amount, while home loans usually allow fee-free prepayment."
        }
      },
      {
        '@type': 'Question',
        name: "What is the maximum loan amount I can get?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Maximum amounts depend on income and property type. Home loans can go up to ₹15 Crore, and education loans up to ₹1.5 Crore."
        }
      }
    ]
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
      url: `${BASE_URL}/about`,
      worksFor: {
        '@type': 'Organization',
        'name': 'Get Credit',
        'url': BASE_URL
      }
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
    articleSection: blog.category,
    keywords: blog.tags ? blog.tags.join(', ') : undefined,
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

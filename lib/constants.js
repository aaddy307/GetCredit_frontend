export const API_URL = '/api';

export const SERVICES = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "Quick funds for your personal needs with minimal documentation and same-day disbursement. Use for travel, weddings, medical emergencies, or any personal requirement.",
    priority: true,
    benefits: [
      "Loan amount up to ₹1 Crore",
      "Interest rates starting from 9.99%",
      "Minimal documentation required",
      "Same-day disbursement",
      "No collateral required",
      "Flexible repayment tenure up to 5 years",
    ],
    eligibility: [
      "Age: 21-60 years",
      "Minimum income: ₹20,000/month",
      "Work experience: 1+ years",
      "CIBIL score: 700+",
      "Indian resident with valid KYC",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Bank statements (3 months)",
      "Income proof (Salary slips/ITR)",
      "Passport size photos",
    ],
    href: "/services#personal-loan",
  },
  {
    id: "business-loan",
    title: "Business Loan",
    description: "Fuel your business growth with flexible funding solutions. Expand operations, purchase inventory, or manage working capital with ease.",
    priority: true,
    benefits: [
      "Loan amount up to ₹5 Crores",
      "Interest rates starting from 8.50%",
      "Flexible repayment tenure up to 7 years",
      "Minimal collateral options available",
      "Quick disbursement within 48 hours",
      "Overdraft facility available",
    ],
    eligibility: [
      "Age: 21-25 years",
      "Business vintage: 3+ years",
      "Minimum turnover: ₹5 lakhs/year",
      "CIBIL score: 680+",
      "GST registration preferred",
    ],
    documents: [
      "Business registration proof",
      "ITR for last 2 years",
      "Bank statements (6 months)",
      "GST returns",
      "KYC of business owner(s)",
      "Business continuity proof",
    ],
    href: "/services#business-loan",
  },
  {
    id: "non-salaried-loan",
    title: "Non-Salaried Loan",
    description: "Designed for self-employed professionals and business owners whose income is not credited to a bank account. Get funding based on your bank transactions and CIBIL score.",
    priority: true,
    benefits: [
      "Loan amount up to ₹1 Crore",
      "No salary account required",
      "Based on bank transaction history",
      "Quick approval and disbursement",
      "No collateral required",
      "Flexible repayment tenure up to 5 years",
    ],
    eligibility: [
      "Age: 21-60 years",
      "Good CIBIL score",
      "Good bank account transactions (6+ months)",
      "Valid KYC documents",
      "Indian resident",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Bank statements (6+ months with good transactions)",
      "ITR (if filed)",
      "Passport size photos",
      "Business proof (if applicable)",
    ],
    href: "/services#non-salaried-loan",
  },
  {
    id: "home-loan",
    title: "Home Loan",
    description: "Realize your dream of owning a home with financing up to ₹15 Crore. We offer competitive rates, flexible tenure, and minimal documentation.",
    benefits: [
      "Competitive interest rates starting from 6.50%",
      "Loan tenure up to 30 years",
      "Financing up to ₹15 Crore",
      "Quick approval and disbursement",
      "Balance transfer facility available",
    ],
    eligibility: [
      "Age: 21-65 years",
      "Minimum income: ₹25,000/month",
      "Work experience required in same company",
      "CIBIL score: 650+",
      "Indian resident",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Income documents (Salary slips/ITR)",
      "Property documents",
      "Bank statements (6 months)",
      "Passport size photos",
    ],
    href: "/services#home-loan",
  },
  {
    id: "loan-against-property",
    title: "Loan Against Property",
    description: "Unlock the value of your property with funding up to ₹30 Crore. We fund Residential, Commercial & Plot properties at attractive rates.",
    benefits: [
      "Funding up to ₹30 Crore",
      "Interest rates starting from 7.50%",
      "Flexible repayment tenure up to 15 years",
      "Low processing fees",
      "Property types funded: Residential, Commercial, Plot",
    ],
    eligibility: [
      "Age: 21-65 years",
      "Property owner with clear title",
      "Minimum property value: ₹50 lakhs",
      "Stable income source",
      "No ongoing litigation on property",
    ],
    documents: [
      "Property documents (Title deed/Registry)",
      "Income proof",
      "KYC documents",
      "Property tax receipts",
      "Bank statements",
    ],
    href: "/services#loan-against-property",
  },
  {
    id: "education-loan",
    title: "Education Loan",
    description: "Fund your higher education with our education loan options. Study in India (up to ₹50L) or abroad (up to ₹1.5Cr without collateral) with easy repayment plans.",
    benefits: [
      "Loan up to ₹50 lakhs for India, ₹1.5 Cr for abroad (without collateral)",
      "Interest rates starting from 7.50%",
      "Moratorium period during studies",
      "Tax benefits under Section 80E",
      "No collateral required for abroad studies",
    ],
    eligibility: [
      "Age: 18-35 years",
      "Admission in recognized institution",
      "Co-borrower required for minor students",
      "Good academic record",
      "Co-borrower with stable income",
    ],
    documents: [
      "Admission letter",
      "Fee structure",
      "Income proof of co-borrower",
      "Academic records",
      "KYC documents",
      "Collateral documents (if applicable)",
    ],
    href: "/services#education-loan",
  },
  {
    id: "vehicle-loan",
    title: "Vehicle Loan",
    description: "Drive your dream car with affordable EMIs and quick loan processing. New and used vehicle financing available with flexible tenure options.",
    benefits: [
      "Loan amount up to 100% of vehicle value",
      "Interest rates starting from 7.50%",
      "Repayment tenure up to 7 years",
      "Both new and used vehicles covered",
      "Zero down payment options available",
      "Quick approval and disbursement",
    ],
    eligibility: [
      "Age: 21-65 years",
      "Minimum income: ₹20,000/month",
      "CIBIL score: 650+",
      "Indian resident with valid license",
      "Work experience: 1+ years",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Income proof (Salary slips/ITR)",
      "Driving license",
      "Bank statements (3 months)",
      "Passport size photos",
    ],
    href: "/services#vehicle-loan",
  },
];

export const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "EMI Calculator", href: "/emi-calculator" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com/getcredit", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { name: "X", href: "https://x.com/getcredit", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Instagram", href: "https://instagram.com/getcredit", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "LinkedIn", href: "https://linkedin.com/company/getcredit", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

export const CONTACT_INFO = {
  phones: ["+91 7738205198", "+91 8408926551", "+91 8793604734"],
  email: "support@get-credit.in",
  address: "Shivling Nagar, Near Shivling Recendency, Ambernath West",
};

export const EMI_LOAN_TYPES = [
  { id: "home", label: "Home Loan" },
  { id: "lap", label: "Loan Against Property" },
  { id: "education", label: "Education Loan" },
  { id: "personal", label: "Personal Loan" },
  { id: "business", label: "Business Loan" },
  { id: "vehicle", label: "Vehicle Loan" },
];

export function getLoanTypeId(title) {
  const map = {
    "Personal Loan": "personal",
    "Business Loan": "business",
    "Home Loan": "home",
    "Loan Against Property": "lap",
    "Education Loan": "education",
    "Vehicle Loan": "vehicle",
    "Non-Salaried Loan": "personal",
  };
  return map[title] || "personal";
}

export function getServiceByTitle(title) {
  return SERVICES.find(s => s.title === title);
}

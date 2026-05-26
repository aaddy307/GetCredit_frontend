import { Text } from '@react-email/components';
import EmailLayout from '../components/EmailLayout';
import SummaryCard from '../components/SummaryCard';

const MONTH_TENURE_LOANS = ['Personal Loan', 'Non-Salaried Loan', 'Business Loan'];

function getTenureUnit(loanType, tenureUnit) {
  if (tenureUnit) return tenureUnit;
  return MONTH_TENURE_LOANS.includes(loanType) ? 'Months' : 'Years';
}

export default function EnquiryClientEmail({ name, loanType, loanAmount, emi, tenure, tenureUnit, city, createdAt }) {
  const unit = getTenureUnit(loanType, tenureUnit);
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <EmailLayout previewText="Your loan enquiry has been submitted — Get Credit">
      <Text style={{ fontSize: '17px', color: '#1a1a2e', fontWeight: 600, margin: '0 0 16px' }}>
        Dear {name},
      </Text>

      <Text>
        Thank you for choosing <strong>Get Credit</strong> for your loan needs. Your enquiry has been submitted successfully and our experienced team will review your details shortly.
      </Text>

      <SummaryCard
        title="Enquiry Summary"
        rows={[
          { label: 'Loan Type', value: loanType || '\u2014' },
          { label: 'Loan Amount', value: loanAmount ? `\u20B9${Number(loanAmount).toLocaleString('en-IN')}` : '\u2014' },
          ...(emi ? [{ label: 'Monthly EMI', value: emi, emi: true }] : []),
          { label: 'Tenure', value: tenure ? `${tenure} ${unit}` : '\u2014' },
          { label: 'City', value: city || '\u2014' },
          { label: 'Submitted On', value: dateStr },
        ]}
      />

      <Text>
        Our team will review your application and contact you with personalized loan solutions within <strong>24 hours</strong>.
      </Text>

      <Text style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}>
        For any assistance, feel free to contact our support team at <strong>support@get-credit.in</strong>.
      </Text>

      <Text style={{ marginTop: '24px' }}>
        Warm regards,<br />
        <strong style={{ color: '#b8912c', fontSize: '16px' }}>The Get Credit Team</strong>
      </Text>
    </EmailLayout>
  );
}

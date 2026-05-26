import { Text, Section } from '@react-email/components';
import EmailLayout from '../components/EmailLayout';
import SummaryCard from '../components/SummaryCard';

const MONTH_TENURE_LOANS = ['Personal Loan', 'Non-Salaried Loan', 'Business Loan'];

function getTenureUnit(loanType, tenureUnit) {
  if (tenureUnit) return tenureUnit;
  return MONTH_TENURE_LOANS.includes(loanType) ? 'Months' : 'Years';
}

export default function EnquiryAdminEmail({ name, phone, email, city, loanType, loanAmount, emi, tenure, tenureUnit, interestRate, source, createdAt }) {
  const unit = getTenureUnit(loanType, tenureUnit);
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    : new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  return (
    <EmailLayout previewText="New Loan Enquiry — Get Credit Admin">
      <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(202,166,70,0.12)',
          color: '#b8912c',
          padding: '6px 20px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          New Lead
        </span>
      </Section>

      <Text style={{ fontSize: '17px', color: '#1a1a2e', fontWeight: 600, margin: '0 0 16px' }}>
        New {loanType || 'Loan'} Enquiry
      </Text>

      <Text>
        A new customer has submitted a loan enquiry. Details are provided below for review and follow-up.
      </Text>

      <SummaryCard
        title="Contact Details"
        rows={[
          { label: 'Name', value: name },
          { label: 'Phone', value: phone },
          { label: 'Email', value: email },
          { label: 'City', value: city || '\u2014' },
        ]}
      />

      <SummaryCard
        title="Loan Details"
        rows={[
          { label: 'Loan Type', value: loanType || '\u2014' },
          { label: 'Loan Amount', value: loanAmount, emi: true },
          ...(emi ? [{ label: 'Monthly EMI', value: emi, emi: true }] : []),
          { label: 'Tenure', value: tenure ? `${tenure} ${unit}` : '\u2014' },
          ...(interestRate ? [{ label: 'Interest Rate', value: `${interestRate}%` }] : []),
          { label: 'Source', value: source || 'Website' },
          { label: 'Submitted At', value: dateStr },
        ]}
      />

      <Text style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}>
        Please review this new enquiry and follow up with the customer at the earliest opportunity using the contact details above.
      </Text>

      <Text style={{ marginTop: '24px' }}>
        Regards,<br />
        <strong style={{ color: '#b8912c', fontSize: '16px' }}>Get Credit System</strong>
      </Text>
    </EmailLayout>
  );
}

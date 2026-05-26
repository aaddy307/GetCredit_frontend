import { Text, Section } from '@react-email/components';
import EmailLayout from '../components/EmailLayout';
import SummaryCard from '../components/SummaryCard';

export default function CallbackAdminEmail({ name, phone, email, city, loanType, source, createdAt }) {
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <EmailLayout previewText="New Callback Request — Get Credit Admin">
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
        New Callback Request Received
      </Text>

      <Text>
        A new customer has requested a callback. Details are provided below for immediate follow-up.
      </Text>

      <SummaryCard
        title="Lead Details"
        rows={[
          { label: 'Name', value: name },
          { label: 'Phone', value: phone },
          { label: 'Email', value: email },
          { label: 'City', value: city || '\u2014' },
          { label: 'Loan Type', value: loanType || '\u2014' },
          { label: 'Source', value: source || 'Website' },
          { label: 'Submitted At', value: dateStr },
        ]}
      />

      <Text style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}>
        Please follow up with this lead at the earliest opportunity. Contact the customer using the details above.
      </Text>

      <Text style={{ marginTop: '24px' }}>
        Regards,<br />
        <strong style={{ color: '#b8912c', fontSize: '16px' }}>Get Credit System</strong>
      </Text>
    </EmailLayout>
  );
}

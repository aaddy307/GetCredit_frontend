import { Text } from '@react-email/components';
import EmailLayout from '../components/EmailLayout';
import SummaryCard from '../components/SummaryCard';

export default function CallbackClientEmail({ name, phone, loanType, createdAt }) {
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <EmailLayout previewText="We've received your callback request — Get Credit">
      <Text style={{ fontSize: '17px', color: '#1a1a2e', fontWeight: 600, margin: '0 0 16px' }}>
        Dear {name},
      </Text>

      <Text>
        Thank you for reaching out to <strong>Get Credit</strong>. We have received your callback request and one of our dedicated loan experts will contact you within <strong>24 hours</strong>.
      </Text>

      <SummaryCard
        title="Callback Request Summary"
        rows={[
          { label: 'Name', value: name },
          { label: 'Phone', value: phone },
          { label: 'Loan Type', value: loanType || '\u2014' },
          { label: 'Requested At', value: dateStr },
        ]}
      />

      <Text>
        Our team is ready to assist you with the best loan options tailored to your needs. We look forward to speaking with you.
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

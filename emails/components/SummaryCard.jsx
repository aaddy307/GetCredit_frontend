import { Section, Text } from '@react-email/components';
import { GOLD, GOLD_DARK } from './EmailLayout';
import SummaryRow from './SummaryRow';

const cardOuter = {
  background: '#fafafe',
  border: '1px solid #e8e8f0',
  borderRadius: '14px',
  padding: '0',
  margin: '20px 0',
};

const cardInner = {
  padding: '24px',
};

const headerDiv = {
  marginBottom: '16px',
  paddingBottom: '14px',
  borderBottom: `2px solid ${GOLD}`,
};

const headerText = {
  margin: 0,
  color: GOLD_DARK,
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

export default function SummaryCard({ title, rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <Section style={cardOuter}>
      <div style={cardInner}>
        {title && (
          <div style={headerDiv}>
            <Text style={headerText}>{title}</Text>
          </div>
        )}
        <table style={tableStyle} cellPadding="0" cellSpacing="0">
          <tbody>
            {rows.map((row, i) => (
              <SummaryRow
                key={i}
                label={row.label}
                value={row.value}
                emi={row.emi}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

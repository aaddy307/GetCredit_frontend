import { GOLD_DARK } from './EmailLayout';

const labelStyle = {
  padding: '12px 16px 12px 0',
  width: '40%',
  color: '#8a8a8a',
  fontSize: '14px',
  fontWeight: 500,
  verticalAlign: 'top',
  borderBottom: '1px solid #eeeef6',
  whiteSpace: 'nowrap',
};

const valueStyle = {
  padding: '12px 0',
  width: '60%',
  color: '#1f1f1f',
  fontSize: '15px',
  fontWeight: 600,
  verticalAlign: 'top',
  borderBottom: '1px solid #eeeef6',
};

const emiValueStyle = {
  ...valueStyle,
  color: GOLD_DARK,
  fontSize: '18px',
  fontWeight: 800,
  letterSpacing: '-0.3px',
};

export default function SummaryRow({ label, value, emi }) {
  const valStyle = emi ? emiValueStyle : valueStyle;
  const displayValue = emi
    ? `\u20B9${Number(value).toLocaleString('en-IN')}`
    : value || '\u2014';

  return (
    <tr>
      <td style={labelStyle}>{label}</td>
      <td style={valStyle}>{displayValue}</td>
    </tr>
  );
}

import {
  Html, Head, Preview, Body, Container, Section, Text, Hr, Link
} from '@react-email/components';

const GOLD = '#caa646';
const GOLD_LIGHT = '#d4af37';
const GOLD_DARK = '#b8912c';
const DARK = '#1a1a2e';
const TEXT = '#4a4a4a';
const BG = '#f0f0f5';

const main = {
  backgroundColor: BG,
  fontFamily: 'Arial, Helvetica, sans-serif',
  padding: '40px 16px',
  margin: 0,
  width: '100%',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const bodySection = {
  padding: '32px 32px 28px',
  color: TEXT,
  fontSize: '15px',
  lineHeight: '1.7',
};

export default function EmailLayout({ previewText, children }) {
  return (
    <Html>
      <Head />
      <Preview>{previewText || 'Message from Get Credit'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderSection />
          <Section style={bodySection}>
            {children}
          </Section>
          <FooterSection />
        </Container>
      </Body>
    </Html>
  );
}

function HeaderSection() {
  return (
    <Section style={{
      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
      padding: '40px 32px 32px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        margin: '0 auto 14px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        fontWeight: 800,
        color: '#ffffff',
        letterSpacing: '-1px',
      }}>
        GC
      </div>
      <Text style={{ margin: 0, fontSize: '24px', color: '#fff', fontWeight: 700, letterSpacing: '-0.3px' }}>
        Get Credit
      </Text>
      <Text style={{ margin: '4px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
        Your Trusted Loan Partner
      </Text>
    </Section>
  );
}

function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <Section style={{
      background: DARK,
      padding: '24px 32px 20px',
      textAlign: 'center',
    }}>
      <div style={{ width: '32px', height: '2px', background: GOLD, margin: '0 auto 12px', borderRadius: '2px' }} />
      <Text style={{ margin: '0 0 10px', fontSize: '12px' }}>
        <Link href="https://get-credit.in" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', margin: '0 10px', fontSize: '12px' }}>Home</Link>
        <Link href="https://get-credit.in/services" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', margin: '0 10px', fontSize: '12px' }}>Services</Link>
        <Link href="https://get-credit.in/contact" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', margin: '0 10px', fontSize: '12px' }}>Contact</Link>
        <Link href="https://get-credit.in/privacy-policy" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', margin: '0 10px', fontSize: '12px' }}>Privacy</Link>
      </Text>
      <Text style={{ margin: '3px 0', fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6' }}>
        Phone: +91 7738205198 / +91 8408926551 / +91 8793604734
      </Text>
      <Text style={{ margin: '3px 0 10px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6' }}>
        <Link href="mailto:support@get-credit.in" style={{ color: GOLD_LIGHT, textDecoration: 'none', fontSize: '12px' }}>
          support@get-credit.in
        </Link>
      </Text>
      <Hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '10px 0' }} />
      <Text style={{ margin: '3px 0', fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.5' }}>
        This is an automated message from Get Credit. Please do not reply directly.
      </Text>
      <Text style={{ margin: '3px 0', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
        &copy; {year} Get Credit. All rights reserved.
      </Text>
    </Section>
  );
}

export { GOLD, GOLD_LIGHT, GOLD_DARK, DARK, TEXT, BG };

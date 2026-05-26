import { Text } from '@react-email/components';
import EmailLayout from '../components/EmailLayout';

export default function AdminComposeEmail({ body }) {
  return (
    <EmailLayout previewText="Message from Get Credit Admin">
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Text style={{ marginTop: '24px' }}>
        Warm regards,<br />
        <strong style={{ color: '#b8912c', fontSize: '16px' }}>The Get Credit Team</strong>
      </Text>
    </EmailLayout>
  );
}

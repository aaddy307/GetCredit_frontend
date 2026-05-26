import { render } from '@react-email/render';
import CallbackClientEmail from '@/emails/templates/CallbackClientEmail';
import CallbackAdminEmail from '@/emails/templates/CallbackAdminEmail';
import EnquiryClientEmail from '@/emails/templates/EnquiryClientEmail';
import EnquiryAdminEmail from '@/emails/templates/EnquiryAdminEmail';
import AdminComposeEmail from '@/emails/templates/AdminComposeEmail';

const templates = {
  callbackClient: CallbackClientEmail,
  callbackAdmin: CallbackAdminEmail,
  enquiryClient: EnquiryClientEmail,
  enquiryAdmin: EnquiryAdminEmail,
  adminCompose: AdminComposeEmail,
};

export async function POST(request) {
  try {
    const { template, data } = await request.json();

    const Component = templates[template];
    if (!Component) {
      return Response.json({ error: `Unknown template: ${template}` }, { status: 400 });
    }

    const html = await render(<Component {...data} />);

    return Response.json({ html });
  } catch (error) {
    console.error('Email render error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContactMessage } from '../../../lib/message-store';

const resendEnabled = Boolean(process.env.RESEND_API_KEY);
const resend = resendEnabled ? new Resend(process.env.RESEND_API_KEY!) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const savedMessage = await saveContactMessage({
      name,
      email,
      subject: subject || '',
      message,
      read: false,
    });

    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'hello@cornelia-wk.com';
    try {
      if (resend && notificationEmail) {
        await resend.emails.send({
          from: 'Cornelia Wonkerleh Kruah <contact@cornelia-wk.com>',
          to: notificationEmail,
          subject: `New contact inquiry from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #d4af37;">New message from your website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #111; color: #f5f5f5; padding: 16px; border-radius: 12px; white-space: pre-wrap;">${message}</div>
            </div>
          `,
        });
      }
    } catch (sendError) {
      console.error('Contact notification email error:', sendError);
    }

    return NextResponse.json({ success: true, data: savedMessage });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Unable to process request' }, { status: 500 });
  }
}

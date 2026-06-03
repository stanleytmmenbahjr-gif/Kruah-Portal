import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveNewsletterSubscriber } from '../../../lib/newsletter-store';

const resendEnabled = Boolean(process.env.RESEND_API_KEY);
const resend = resendEnabled ? new Resend(process.env.RESEND_API_KEY!) : null;

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subscriber = await saveNewsletterSubscriber({
      email,
      name: name || '',
    });

    let emailSent = false;
    let contactAdded = false;
    let emailErrorMessage = '';

    if (resend) {
      try {
        if (process.env.RESEND_AUDIENCE_ID) {
          await resend.contacts.create({
            email: subscriber.email,
            firstName: subscriber.name || '',
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });
          contactAdded = true;
        }
      } catch (error) {
        console.error('Resend contact creation error:', error);
      }

      try {
        await resend.emails.send({
          from: 'Cornelia Wonkerleh Kruah <newsletter@cornelia-wk.com>',
          to: subscriber.email,
          subject: 'Welcome to Cornelia Wonkerleh Kruah\'s Newsletter',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #d4af37; text-align: center;">Welcome to the Journey</h1>
              <p>Dear ${subscriber.name || 'Friend'},</p>
              <p>Thank you for joining my newsletter. I'm excited to share insights on leadership, governance, youth empowerment, and the transformative work we're doing together.</p>
              <p>You'll receive updates on:</p>
              <ul>
                <li>Policy insights and thought leadership</li>
                <li>Speaking engagements and events</li>
                <li>Youth empowerment initiatives</li>
                <li>Legal and governance developments</li>
              </ul>
              <p>Stay connected and let's build a better future together.</p>
              <p>Best regards,<br>Cornelia Wonkerleh Kruah</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="font-size: 12px; color: #666; text-align: center;">
                You're receiving this because you subscribed to updates from Cornelia Wonkerleh Kruah.<br>
                <a href="#" style="color: #d4af37;">Unsubscribe</a> | <a href="https://cornelia-wk.com" style="color: #d4af37;">Visit Website</a>
              </p>
            </div>
          `,
        });
        emailSent = true;
      } catch (sendError) {
        console.error('Newsletter welcome email error:', sendError);
        emailErrorMessage = String(sendError instanceof Error ? sendError.message : sendError);
      }
    }

    const message = resendEnabled
      ? emailSent
        ? 'Successfully subscribed! Check your inbox for a welcome email.'
        : `Subscribed successfully, but the welcome email could not be sent right now.${emailErrorMessage ? ' ' + emailErrorMessage : ''}`
      : 'Subscribed successfully. Email delivery is not enabled for this site at the moment.';

    return NextResponse.json({
      success: true,
      message,
      resendEnabled,
      emailSent,
      contactAdded,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Unable to process subscription' }, { status: 500 });
  }
}
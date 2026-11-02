import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_PRAYER = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, prayer, website } = req.body || {};

  // Honeypot: real users never fill this hidden field
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (
    typeof name !== 'string' || typeof email !== 'string' || typeof prayer !== 'string' ||
    !name.trim() || !email.trim() || !prayer.trim()
  ) {
    return res.status(400).json({ error: 'Name, email and prayer request are required' });
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || prayer.length > MAX_PRAYER) {
    return res.status(400).json({ error: 'Input is too long' });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePrayer = escapeHtml(prayer.trim()).replace(/\n/g, '<br/>');

  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'contact@tcfhouston.org',
      to: process.env.EMAIL_TO || 'tcf@tcfhouston.org',
      replyTo: email.trim(),
      subject: `New Prayer Request from ${name.trim().replace(/[\r\n]+/g, ' ')}`,
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Prayer Request:</strong></p>
        <p>${safePrayer}</p>
      `
    });
    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

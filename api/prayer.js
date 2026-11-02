import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME = 100;
const MAX_PRAYER = 3000;

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

  const { name, prayer, website } = req.body || {};

  // Honeypot: real users never fill this hidden field
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (typeof name !== 'string' || typeof prayer !== 'string' || !name.trim() || !prayer.trim()) {
    return res.status(400).json({ error: 'Name and prayer request are required' });
  }

  if (name.length > MAX_NAME || prayer.length > MAX_PRAYER) {
    return res.status(400).json({ error: 'Input is too long' });
  }

  const safeName = escapeHtml(name.trim());
  const safePrayer = escapeHtml(prayer.trim()).replace(/\n/g, '<br/>');

  try {
    await resend.emails.send({
      from: 'contact@tcfhouston.org',
      to: 'tcf@tcfhouston.org',
      subject: `New Prayer Request from ${name.trim().replace(/[\r\n]+/g, ' ')}`,
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Prayer Request:</strong></p>
        <p>${safePrayer}</p>
      `
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

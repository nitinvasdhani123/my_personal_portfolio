import nodemailer from 'nodemailer';

/**
 * Validates a contact-form enquiry and emails it over SMTP.
 * Nothing is stored or logged: the data only exists for the length of this call.
 *
 * Env vars:
 *   SMTP_USER   Gmail address used to send (e.g. nitinkumarvasdhani786@gmail.com)
 *   SMTP_PASS   Gmail App Password (16 characters, not the normal login password)
 *   CONTACT_TO  Inbox that receives enquiries (defaults to SMTP_USER)
 *   SMTP_HOST / SMTP_PORT  Optional, default smtp.gmail.com:465
 */

export type EnquiryResult = { status: number; body: { ok: boolean; error?: string } };

const LIMITS = { name: 100, email: 200, phone: 30, message: 5000 };

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function sendEnquiry(raw: unknown): Promise<EnquiryResult> {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field, bots usually do.
  if (str(input.company)) return { status: 200, body: { ok: true } };

  const name = oneLine(str(input.name));
  const email = oneLine(str(input.email));
  const phone = oneLine(str(input.phone));
  const message = str(input.message);

  if (!name || !email || !message) return { status: 400, body: { ok: false, error: 'Please fill in all required fields.' } };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: 400, body: { ok: false, error: 'Please enter a valid email address.' } };
  if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone)) return { status: 400, body: { ok: false, error: 'Please enter a valid phone number.' } };
  if (name.length > LIMITS.name || email.length > LIMITS.email || phone.length > LIMITS.phone || message.length > LIMITS.message) {
    return { status: 400, body: { ok: false, error: 'One of the fields is too long.' } };
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return { status: 500, body: { ok: false, error: 'Email is not configured on the server.' } };

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass: pass.replace(/\s+/g, '') },
  });

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || 'Not provided'],
    ['Message', message],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="margin:0 0 12px;color:#b6771d">New portfolio enquiry</h2>
      <table cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #ddd">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="border:1px solid #ddd;background:#f7f7f7;font-weight:bold;width:110px;vertical-align:top">${k}</td>
              <td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <p style="color:#888;font-size:12px;margin-top:12px">Sent from the contact form on your portfolio. Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: { name: 'Portfolio Enquiry', address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `Portfolio enquiry from ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n\n'),
      html,
    });
    return { status: 200, body: { ok: true } };
  } catch {
    // Deliberately not logging the error object: it can contain the enquiry contents.
    return { status: 502, body: { ok: false, error: 'Could not send your message right now.' } };
  }
}

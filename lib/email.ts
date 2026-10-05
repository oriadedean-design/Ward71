// Team notification emails, sent through Resend (https://resend.com).
// Requires RESEND_API_KEY. TEAM_NOTIFICATION_EMAIL and EMAIL_FROM are optional.

const TEAM_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL || 'donationlornaantwi@gmail.com';
const FROM = process.env.EMAIL_FROM || 'Lorna Antwi Campaign Website <onboarding@resend.dev>';

export type EmailRow = [label: string, value: string | number | null | undefined];

interface TeamEmail {
  subject: string;
  heading: string;
  intro: string;
  rows: EmailRow[];
  message?: string;
  nextStep?: string;
  replyTo?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function torontoTime(): string {
  return new Date().toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

function render({ heading, intro, rows, message, nextStep }: TeamEmail) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');
  const received = torontoTime();

  const text = [
    heading,
    '',
    intro,
    '',
    ...filled.map(([label, value]) => `${label}: ${value}`),
    ...(message ? ['', 'Message:', message] : []),
    ...(nextStep ? ['', `Next step: ${nextStep}`] : []),
    '',
    `Received ${received} (Toronto time) via lornaantwi.ca`,
  ].join('\n');

  const tableRows = filled
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;color:#1f2937;font-size:14px;font-weight:600;">${escapeHtml(String(value))}</td>
        </tr>`
    )
    .join('');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#faf7f0;">
    <div style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
      <h2 style="margin:0 0 8px;color:#2f3e46;font-size:20px;">${escapeHtml(heading)}</h2>
      <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.5;">${escapeHtml(intro)}</p>
      <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;">${tableRows}</table>
      ${
        message
          ? `<h3 style="margin:20px 0 8px;color:#2f3e46;font-size:15px;">Message</h3>
             <div style="padding:12px 16px;background:#f9fafb;border-left:4px solid #d4a017;color:#1f2937;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>`
          : ''
      }
      ${
        nextStep
          ? `<p style="margin:20px 0 0;padding:12px 16px;background:#fef9e7;border-radius:8px;color:#2f3e46;font-size:14px;"><strong>Next step:</strong> ${escapeHtml(nextStep)}</p>`
          : ''
      }
    </div>
    <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;text-align:center;">Received ${escapeHtml(received)} (Toronto time) via lornaantwi.ca</p>
  </div>`;

  return { text, html };
}

/** Sends a notification to the campaign team. Throws if delivery fails. */
export async function sendTeamEmail(email: TeamEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set; team notification not sent.');
  }

  const { text, html } = render(email);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TEAM_EMAIL],
      subject: email.subject,
      text,
      html,
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${await res.text()}`);
  }
}

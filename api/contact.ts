import type { IncomingMessage, ServerResponse } from 'node:http';
import { sendEnquiry } from '../server/sendEnquiry';

// Vercel serverless function: POST /api/contact
// Vercel's Node runtime parses the JSON body into `req.body`.
export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
    return;
  }

  const result = await sendEnquiry(req.body);
  res.statusCode = result.status;
  res.end(JSON.stringify(result.body));
}

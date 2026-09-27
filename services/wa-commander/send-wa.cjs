/**
 * Helper to send a WhatsApp message via the running wa-bridge HTTP daemon (port 3899)
 * Usage: node send-wa.cjs "Your message here" [optional_phone_number]
 */

const http = require('http');

const text = process.argv[2];
const to = process.argv[3] || '6282112114222';

if (!text) {
  console.error('Usage: node send-wa.cjs "Message"');
  process.exit(1);
}

const data = JSON.stringify({ text, to });

const req = http.request({
  hostname: '127.0.0.1',
  port: 3899,
  path: '/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('[SEND-WA-SUCCESS]', body);
  });
});

req.on('error', (e) => {
  console.error('[SEND-WA-ERROR]', e.message);
});

req.write(data);
req.end();

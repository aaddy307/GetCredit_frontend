import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

let server;
const PORT = 3547;
const BASE = `http://localhost:${PORT}`;

function startServer() {
  return new Promise((resolvePromise, reject) => {
    server = spawn('npx', ['next', 'dev', '-p', String(PORT)], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'development' },
    });

    let started = false;

    server.stdout.on('data', (data) => {
      const text = data.toString();
      if (!started && (text.includes('localhost') || text.includes('ready'))) {
        started = true;
        setTimeout(resolvePromise, 2000); // give it a moment to stabilise
      }
    });

    server.stderr.on('data', (data) => {
      const text = data.toString();
      // Next.js prints some logs to stderr during dev
      if (!started && (text.includes('localhost') || text.includes('ready'))) {
        started = true;
        setTimeout(resolvePromise, 2000);
      }
    });

    server.on('error', reject);

    setTimeout(() => {
      if (!started) {
        started = true;
        resolvePromise(); // try anyway
      }
    }, 15000);
  });
}

function stopServer() {
  return new Promise((resolvePromise) => {
    if (!server) return resolvePromise();
    server.on('close', resolvePromise);
    server.kill('SIGTERM');
    setTimeout(() => {
      server.kill('SIGKILL');
      resolvePromise();
    }, 5000);
  });
}

async function request(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { status: res.status, body: data };
}

let passed = 0;
let failed = 0;

function assert(label, condition, detail) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    console.log(`  ✗ ${label}  (${detail || 'assertion failed'})`);
  }
}

async function main() {
  console.log('\nStarting Next.js dev server...');
  try {
    await startServer();
  } catch (e) {
    console.log('  Failed to start server:', e.message);
    process.exit(1);
  }

  console.log(`\nEmail Render API Tests (port ${PORT})`);
  console.log('─'.repeat(50));

  // --- callbackClient ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'callbackClient',
      data: { name: 'Ravi Sharma', phone: '9876543210', loanType: 'Home Loan', createdAt: '2026-05-26T10:00:00Z' },
    });
    assert('callbackClient returns 200', status === 200);
    assert('callbackClient has html', body.html && typeof body.html === 'string');
    assert('callbackClient contains name', body.html.includes('Ravi Sharma'));
    assert('callbackClient contains phone', body.html.includes('9876543210'));
    assert('callbackClient contains loan type', body.html.includes('Home Loan'));
  }

  // --- callbackAdmin ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'callbackAdmin',
      data: { name: 'Priya Patel', phone: '8765432109', email: 'priya@example.com', city: 'Mumbai', loanType: 'Personal Loan', source: 'Website', createdAt: '2026-05-26T10:00:00Z' },
    });
    assert('callbackAdmin returns 200', status === 200);
    assert('callbackAdmin contains name', body.html.includes('Priya Patel'));
    assert('callbackAdmin contains email', body.html.includes('priya@example.com'));
    assert('callbackAdmin contains city', body.html.includes('Mumbai'));
  }

  // --- enquiryClient ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'enquiryClient',
      data: { name: 'Amit Kumar', loanType: 'Home Loan', loanAmount: 5000000, emi: 43367, tenure: 20, tenureUnit: 'Years', city: 'Delhi', createdAt: '2026-05-26T10:00:00Z' },
    });
    assert('enquiryClient returns 200', status === 200);
    assert('enquiryClient contains name', body.html.includes('Amit Kumar'));
    assert('enquiryClient contains loan amount', body.html.includes('50,00,000') || body.html.includes('5000000'));
    assert('enquiryClient contains EMI', body.html.includes('43,367') || body.html.includes('43367'));
  }

  // --- enquiryAdmin ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'enquiryAdmin',
      data: { name: 'Sneha Gupta', phone: '7654321098', email: 'sneha@example.com', city: 'Pune', loanType: 'Business Loan', loanAmount: 10000000, emi: 100000, tenure: 10, tenureUnit: 'Years', interestRate: 12.5, source: 'Google', createdAt: '2026-05-26T10:00:00Z' },
    });
    assert('enquiryAdmin returns 200', status === 200);
    assert('enquiryAdmin contains name', body.html.includes('Sneha Gupta'));
    assert('enquiryAdmin contains interest rate', body.html.includes('12.5') || body.html.includes('12.5%'));
    assert('enquiryAdmin contains source', body.html.includes('Google'));
  }

  // --- adminCompose ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'adminCompose',
      data: { body: '<p>This is a <strong>test</strong> email body.</p>' },
    });
    assert('adminCompose returns 200', status === 200);
    assert('adminCompose contains body markup', body.html.includes('<strong>test</strong>'));
  }

  // --- unknown template ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'nonexistent',
      data: {},
    });
    assert('unknown template returns 400', status === 400);
    assert('unknown template has error message', body.error && body.error.includes('Unknown template'));
  }

  // --- missing data ---
  {
    const { status, body } = await request('/api/emails/render', {
      template: 'callbackClient',
      data: {},
    });
    assert('template with empty data returns 200 (graceful)', status === 200);
    assert('template renders without data', body.html && body.html.includes('Dear'));
  }

  console.log('─'.repeat(50));
  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

  await stopServer();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(async (e) => {
  console.error('Fatal:', e.message);
  await stopServer();
  process.exit(1);
});

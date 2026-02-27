const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory database (array) to store contacts
const contacts = [];

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/guestbook', (req, res) => {
  const {
    firstName,
    lastName,
    jobTitle,
    company,
    linkedin,
    email,
    howMet,
    howMetOther,
    message,
    mailingList,
    emailFormat
  } = req.body;

  // Store in the in-memory contacts array
  const entry = {
    id: contacts.length + 1,
    submittedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    firstName: firstName || '',
    lastName: lastName || '',
    fullName: `${firstName || ''} ${lastName || ''}`.trim(),
    jobTitle: jobTitle || '',
    company: company || '',
    linkedin: linkedin || '',
    email: email || '',
    howMet: howMet === 'Other' ? (howMetOther || 'Other') : (howMet || ''),
    message: message || '',
    mailingList: mailingList === 'on',
    emailFormat: emailFormat || 'html'
  };

  contacts.push(entry);

  console.log(`[${entry.submittedAt}] New contact: ${entry.fullName} (${entry.email})`);

  // Send confirmation page
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You – Kelley Castillo</title>
  <link rel="icon" href="images/miffy.jpg">
  <link rel="stylesheet" href="styles.css">
  <style>
    .confirmation-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg);
    }
    .confirmation-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 3rem 2.5rem;
      max-width: 560px;
      width: 90%;
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      text-align: center;
    }
    .confirmation-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    .confirmation-card h1 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    .confirmation-card p {
      color: var(--text-muted);
      margin-bottom: 0.4rem;
    }
    .confirmation-details {
      background: var(--bg);
      border-radius: 8px;
      padding: 1rem 1.25rem;
      margin: 1.5rem 0;
      text-align: left;
    }
    .confirmation-details p {
      margin: 0.3rem 0;
      font-size: 0.9rem;
    }
    .confirmation-details strong {
      color: var(--primary);
    }
    .btn-back {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.65rem 1.75rem;
      background: var(--primary);
      color: #fff;
      border-radius: 6px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s ease;
    }
    .btn-back:hover {
      background: var(--accent);
      color: #fff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="confirmation-page">
    <div class="confirmation-card">
      <div class="confirmation-icon">✅</div>
      <h1>Thanks, ${entry.firstName || 'Friend'}!</h1>
      <p>Your message has been received. I'll be in touch soon.</p>

      <div class="confirmation-details">
        <p><strong>Name:</strong> ${entry.fullName}</p>
        ${entry.jobTitle ? `<p><strong>Title:</strong> ${entry.jobTitle}</p>` : ''}
        ${entry.company ? `<p><strong>Company:</strong> ${entry.company}</p>` : ''}
        <p><strong>Email:</strong> ${entry.email}</p>
        ${entry.howMet ? `<p><strong>How we met:</strong> ${entry.howMet}</p>` : ''}
        ${entry.mailingList ? `<p><strong>Mailing list:</strong> Added (${entry.emailFormat.toUpperCase()} format)</p>` : ''}
        ${entry.message ? `<p><strong>Message:</strong> "${entry.message}"</p>` : ''}
        <p style="margin-top:0.75rem; color:#aaa; font-size:0.8rem;">Submitted at ${entry.submittedAt} PT</p>
      </div>

      <a href="/" class="btn-back">← Back to Home</a>
    </div>
  </div>
</body>
</html>`);
});

// Admin route - display all submissions
app.get('/admin', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin – Contact Submissions</title>
  <link rel="icon" href="images/miffy.jpg">
  <style>
    :root {
      --primary: #1f4b6e;
      --accent: #f39c12;
      --bg: #f7f7fb;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      background: var(--bg);
      color: #222;
      margin: 0;
      padding: 2rem 1rem;
    }
    .admin-header {
      max-width: 1100px;
      margin: 0 auto 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .admin-header h1 {
      color: var(--primary);
      margin: 0;
      font-size: 1.6rem;
    }
    .badge {
      background: var(--primary);
      color: #fff;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      padding: 0.45rem 1rem;
      background: var(--accent);
      color: #fff;
      border-radius: 5px;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.9rem;
    }
    table {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      border-collapse: collapse;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      font-size: 0.88rem;
    }
    thead {
      background: var(--primary);
      color: #fff;
    }
    th, td {
      padding: 0.7rem 0.9rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    tbody tr:hover {
      background: #f0f4f8;
    }
    .mailing-yes { color: #2e7d32; font-weight: 600; }
    .mailing-no { color: #aaa; }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
      max-width: 1100px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    }
    .empty-state p { font-size: 1.1rem; }
    td.message-cell {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  </style>
</head>
<body>
  <div class="admin-header">
    <div>
      <h1>📋 Admin — Contact Submissions</h1>
    </div>
    <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
      <span class="badge">${contacts.length} submission${contacts.length !== 1 ? 's' : ''}</span>
      <a href="/" class="btn">← Back to Site</a>
    </div>
  </div>

  ${contacts.length === 0 ? `
  <div class="empty-state">
    <p>📭 No submissions yet.</p>
    <p style="font-size:0.9rem;">Submissions will appear here after someone fills out the contact form.</p>
    <a href="/" class="btn" style="display:inline-block; margin-top:1rem;">Go to Form →</a>
  </div>
  ` : `
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Submitted</th>
        <th>Name</th>
        <th>Title / Company</th>
        <th>Email</th>
        <th>LinkedIn</th>
        <th>How We Met</th>
        <th>Mailing List</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      ${contacts.map(c => `
      <tr>
        <td>${c.id}</td>
        <td style="white-space:nowrap; font-size:0.8rem;">${c.submittedAt}</td>
        <td><strong>${c.fullName || '—'}</strong></td>
        <td>${[c.jobTitle, c.company].filter(Boolean).join(' @ ') || '—'}</td>
        <td><a href="mailto:${c.email}">${c.email || '—'}</a></td>
        <td>${c.linkedin ? `<a href="${c.linkedin}" target="_blank" rel="noopener">View</a>` : '—'}</td>
        <td>${c.howMet || '—'}</td>
        <td class="${c.mailingList ? 'mailing-yes' : 'mailing-no'}">${c.mailingList ? `✓ ${c.emailFormat.toUpperCase()}` : 'No'}</td>
        <td class="message-cell" title="${c.message.replace(/"/g, '&quot;')}">${c.message || '—'}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  `}
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Confirmation running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
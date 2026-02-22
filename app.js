let express = require('express');
let path = require('path');

let app = express();
let PORT = 3000;
let contacts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/guestbook', (req, res) => {
    res.redirect('/');
});

app.post('/guestbook', (req, res) => {
    const {
        firstName, lastName, jobTitle,
        company, linkedin, email,
        howMet, howMetOther, message,
        mailingList, emailFormat
    } = req.body;


    //* had to google how to do an array >> https://www.w3schools.com/js/js_arrays.asp */
    let entry = {
        id:          contacts.length + 1,
        submittedAt: new Date().toLocaleString(),
        firstName:   firstName  || '',
        lastName:    lastName   || '',
        jobTitle:    jobTitle   || '',
        company:     company    || '',
        linkedin:    linkedin   || '',
        email:       email      || '',
        howMet:      howMet === 'Other' ? (howMetOther || 'Other') : (howMet || ''),
        message:     message    || '',
        mailingList: mailingList === 'on',
        emailFormat: emailFormat || 'html'
    };

    contacts.push(entry);
    console.log(`Entry #${entry.id} saved: ${entry.firstName} ${entry.lastName}`);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You – Kelley Castillo</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                body { display:flex; align-items:center; justify-content:center; min-height:100vh; }
                .card {
                    background:#fff; border-radius:12px; padding:3rem 2.5rem;
                    max-width:500px; width:90%;
                    box-shadow:0 12px 30px rgba(0,0,0,0.08); text-align:center;
                }
                .card h1 { color:var(--primary); }
                .card p  { color:var(--text-muted); }
                .details {
                    background:var(--bg); border-radius:8px;
                    padding:1rem 1.25rem; margin:1.5rem 0;
                    text-align:left; font-size:0.9rem;
                }
                .details p { margin:0.3rem 0; }
                .details strong { color:var(--primary); }
                .btn-back {
                    display:inline-block; margin-top:0.5rem;
                    padding:0.65rem 1.75rem; background:var(--primary);
                    color:#fff; border-radius:6px; font-weight:600; text-decoration:none;
                }
                .btn-back:hover { background:var(--accent); color:#fff; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Thanks, ${entry.firstName}!</h1>
                <p>Your message has been received. I'll be in touch soon.</p>
                <div class="details">
                    <p><strong>Name:</strong> ${entry.firstName} ${entry.lastName}</p>
                    ${entry.jobTitle ? `<p><strong>Title:</strong> ${entry.jobTitle}</p>` : ''}
                    ${entry.company  ? `<p><strong>Company:</strong> ${entry.company}</p>` : ''}
                    <p><strong>Email:</strong> ${entry.email || '—'}</p>
                    ${entry.howMet   ? `<p><strong>How we met:</strong> ${entry.howMet}</p>` : ''}
                    ${entry.message  ? `<p><strong>Message:</strong> "${entry.message}"</p>` : ''}
                </div>
                <a href="/" class="btn-back">← Back to Home</a>
            </div>
        </body>
        </html>
    `);
});

app.get('/admin', (req, res) => {
    let rows = contacts.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.submittedAt}</td>
            <td>${c.firstName} ${c.lastName}</td>
            <td>${c.jobTitle  || '—'}</td>
            <td>${c.company   || '—'}</td>
            <td>${c.email     || '—'}</td>
            <td>${c.howMet    || '—'}</td>
            <td>${c.mailingList ? '✓' : '—'}</td>
            <td>${c.message   || '—'}</td>
        </tr>
    `).join('');

    //** had to google how design the confirmation page  */
    res.send(` 
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Admin – Submissions</title>
            <style>
                body  { font-family:sans-serif; padding:2rem; background:#f7f7fb; }
                h1    { color:#1f4b6e; }
                table { width:100%; border-collapse:collapse; background:#fff;
                        border-radius:8px; overflow:hidden;
                        box-shadow:0 4px 12px rgba(0,0,0,0.07); }
                th    { background:#1f4b6e; color:#fff; padding:0.65rem 0.9rem;
                        text-align:left; font-size:0.85rem; }
                td    { padding:0.6rem 0.9rem; border-bottom:1px solid #eee; font-size:0.85rem; }
                tr:hover td { background:#f0f4f8; }
                .back { display:inline-block; margin-bottom:1rem; color:#1f4b6e;
                        font-weight:600; text-decoration:none; }
                .badge { background:#1f4b6e; color:#fff; border-radius:20px;
                         padding:0.2rem 0.65rem; font-size:0.8rem; margin-left:0.5rem; }
            </style>
        </head>
        <body>
            <a href="/" class="back">← Back to Site</a>
            <h1>Contact Submissions <span class="badge">${contacts.length}</span></h1>
            ${contacts.length === 0
                ? `<p>No submissions yet.</p>`
                : `<table>
                    <thead>
                        <tr>
                            <th>#</th><th>Submitted</th><th>Name</th><th>Title</th>
                            <th>Company</th><th>Email</th><th>How We Met</th>
                            <th>Mailing List</th><th>Message</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                   </table>`
            }
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server:  http://localhost:${PORT}`);
    console.log(`Admin:   http://localhost:${PORT}/admin`); //confirmation page url
});
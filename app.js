import express from 'express';
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';            

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT || 3306,
});

// Valid options for "how we met" — used in server-side validation
const VALID_HOW_MET = ['Class', 'LinkedIn', 'Job', 'Other'];

// Home / resume page
app.get('/', (req, res) => {
  res.render('index');
});

// Portfolio page
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// Contact form page
app.get('/contact', (req, res) => {
  res.render('contact', { errors: [], old: {} });
});


app.post('/guestbook', async (req, res) => {
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

  // Server-side validation
  const errors = [];

  if (!firstName || !firstName.trim())
    errors.push('First name is required.');

  if (!lastName || !lastName.trim())
    errors.push('Last name is required.');

  if (!howMet || !VALID_HOW_MET.includes(howMet))
    errors.push('Please select a valid "How did we meet?" option.');

  if (mailingList === 'on') {
    if (!emailFormat || !['html', 'text'].includes(emailFormat))
      errors.push('Please select an email format (HTML or Text) for the mailing list.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim())
      errors.push('An email address is required to join the mailing list.');
    else if (!emailRegex.test(email.trim()))
      errors.push('Please enter a valid email address.');
  }

  if (linkedin && linkedin.trim() && !linkedin.trim().startsWith('https://linkedin.com/in/'))
    errors.push('LinkedIn URL must start with https://linkedin.com/in/');

  if (errors.length > 0) {
    return res.status(422).render('contact', { errors, old: req.body });
  }

  const entry = {
    submittedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    firstName:   firstName  || '',
    lastName:    lastName   || '',
    fullName:    `${firstName || ''} ${lastName || ''}`.trim(),
    jobTitle:    jobTitle   || '',
    company:     company    || '',
    linkedin:    linkedin   || '',
    email:       email      || '',
    howMet:      howMet === 'Other' ? (howMetOther || 'Other') : (howMet || ''),
    message:     message    || '',
    mailingList: mailingList === 'on',
    emailFormat: emailFormat || 'html'
  };

  try {
    const sql = `
      INSERT INTO contacts
        (first_name, last_name, job_title, company, linkedin,
         email, how_met, message, mailing_list, email_format, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      entry.firstName,
      entry.lastName,
      entry.jobTitle   || null,
      entry.company    || null,
      entry.linkedin   || null,
      entry.email      || null,
      entry.howMet     || null,
      entry.message    || null,
      entry.mailingList ? 1 : 0,
      entry.emailFormat,
      entry.submittedAt
    ]);

    entry.id = result.insertId;

    console.log(`[${entry.submittedAt}] New contact saved (id=${entry.id}): ${entry.fullName} (${entry.email})`);

    res.render('confirmation', { entry });

  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).send('There was a problem saving your submission. Please try again.');
  }
});

// GET /admin — read all contacts from MySQL, newest first
app.get('/admin', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM contacts ORDER BY id DESC'
    );

    const contacts = rows.map(r => ({
      id:          r.id,
      submittedAt: r.submitted_at,
      firstName:   r.first_name,
      lastName:    r.last_name,
      fullName:    `${r.first_name} ${r.last_name}`.trim(),
      jobTitle:    r.job_title    || '',
      company:     r.company      || '',
      linkedin:    r.linkedin     || '',
      email:       r.email        || '',
      howMet:      r.how_met      || '',
      message:     r.message      || '',
      mailingList: r.mailing_list === 1,
      emailFormat: r.email_format || 'html'
    }));

    res.render('admin', { contacts });

  } catch (err) {
    console.error('DB fetch error:', err);
    res.status(500).send('Error loading admin page.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
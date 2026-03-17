const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const contacts = [];

// EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
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

// Form submission
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

  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Server-side validation
  if (!firstName || !firstName.trim()) {
    errors.push('First name is required.');
  }
  if (!lastName || !lastName.trim()) {
    errors.push('Last name is required.');
  }
  if (!email || !email.trim()) {
    errors.push('Email address is required.');
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address (must contain @ and .)');
  }
  if (mailingList === 'on' && !email) {
    errors.push('Email is required when subscribing to the mailing list.');
  }
  if (linkedin && !linkedin.trim().startsWith('https://linkedin.com/in/')) {
    errors.push('LinkedIn URL must start with https://linkedin.com/in/');
  }
  if (!howMet) {
    errors.push('Please select how we met.');
  }

  // Re-render form with errors if validation failed
  if (errors.length > 0) {
    return res.status(422).render('contact', { errors, old: req.body });
  }

  const entry = {
    id: contacts.length + 1,
    submittedAt: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    fullName: `${firstName.trim()} ${lastName.trim()}`,
    jobTitle: jobTitle || '',
    company: company || '',
    linkedin: linkedin || '',
    email: email || '',
    howMet: howMet === 'Other' ? (howMetOther || 'Other') : howMet,
    message: message || '',
    mailingList: mailingList === 'on',
    emailFormat: emailFormat || 'html'
  };

  contacts.push(entry);
  console.log(`[${entry.submittedAt}] New contact: ${entry.fullName} (${entry.email})`);

  res.render('confirmation', { entry });
});

// Admin route
app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>404 – Page Not Found</h1><a href="/">← Back to Home</a>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
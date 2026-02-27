const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const contacts = [];

// Set EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Contact form page
app.get('/contact', (req, res) => {
  res.render('contact');
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

  //  contacts array
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
  res.render('confirmation', { entry });
});

// display all submissions
app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

app.listen(PORT, () => {
  console.log(`Confirmation running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
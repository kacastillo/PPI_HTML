let express = require('express');
let path = require('path');

let app = express();
let PORT = 3000;

let contacts = [];

// Set EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
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

    contacts.push(entry);
    console.log(`Entry #${entry.id} saved: ${entry.firstName} ${entry.lastName}`);

    res.render('confirmation', { entry });
});

app.get('/admin', (req, res) => {
    res.render('admin', { contacts });
});

app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
    console.log(`Admin:          http://localhost:${PORT}/admin`); //confirmation page url
});
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/guestbook', (req, res) => {
  const { name, email, company, message } = req.body;

  console.log('New guestbook entry:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Company: ${company}`);
  console.log(`Message: ${message}`);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You</title>
      <link rel="icon" href="images/miffy.jpg">
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
  `);
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

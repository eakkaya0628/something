const express = require('express');
const axios = require('axios');
const colors = require('colors');
const ankaraCode = require('./Ankara.js');
const istanbulCode = require('./Istanbul.js');

const app = express();
const port = 3000;

// Define a route to run the Ankara code
app.get('/ankara', (req, res) => {
  ankaraCode.run(axios, colors);
  res.send('Ankara code executed successfully!');
});

// Define a route to run the Istanbul code
app.get('/istanbul', (req, res) => {
  istanbulCode.run(axios);
  res.send('Istanbul code executed successfully!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Run the Ankara code immediately
ankaraCode.run(axios, colors);

// Run the Istanbul code after 2 seconds
setTimeout(() => {
  istanbulCode.run(axios);
}, 2000);

// Schedule the execution of both codes every hour
setInterval(() => {
  ankaraCode.run(axios, colors);
  setTimeout(() => {
    istanbulCode.run(axios);
  }, 2000);
}, 1000 * 60 * 60);

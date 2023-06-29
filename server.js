const axios = require('axios');
const colors = require('colors');

// Import Ankara.js
setInterval(() => {
const ankaraCode = require('./Ankara.js');

// Import Istanbul.js
const istanbulCode = require('./Istanbul.js');

// Run the Ankara code
ankaraCode.run(axios, colors);

// Run the Istanbul code
setTimeout(() => {istanbulCode.run(axios);}, 2000);
}, 1000 * 60 * 60);



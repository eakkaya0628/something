const axios = require('axios');
const colors = require('colors');

// Import Ankara.js
const ankaraCode = require('./Ankara.js');

// Import Istanbul.js
const istanbulCode = require('./Istanbul.js');

// Run the Ankara code
ankaraCode.run(axios, colors);

// Run the Istanbul code
setTimeout(() => {istanbulCode.run(axios);}, 2000);


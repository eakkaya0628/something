// Ankara.js
module.exports = {
  run: function() {
const nodemailer = require('nodemailer');
const axios = require('axios');
axios.get('https://ais.usvisa-info.com/en-tr/niv/users/sign_in', {
  headers: {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.7',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'upgrade-insecure-requests': '1',
  },
  referrer: 'https://ais.usvisa-info.com/en-tr/niv',
  referrerPolicy: 'strict-origin-when-cross-origin',
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
})
  .then(response => {
    console.log("Extracted CSRF Token...".green)
    const csrfTokenRegex = /<meta name="csrf-token" content="(.+?)"/;
    const match = response.data.match(csrfTokenRegex);
    const csrfToken = match ? match[1] : null;
    const cookieString = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
    axios.post('https://ais.usvisa-info.com/en-tr/niv/users/sign_in', {
  utf8: '✓',
  'user[email]': 'akkaya61@gmail.com',
  'user[password]': '@pp01nt3',
  policy_confirmed: 1,
  commit: 'Sign In'
}, {
  headers: {
    accept: '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
    'accept-language': 'en-US,en;q=0.7',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    pragma: 'no-cache',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'x-csrf-token': csrfToken.toString(),
    'x-requested-with': 'XMLHttpRequest',
    'cookie': cookieString,
  },
  withCredentials: true
    }).then(response => {
        const accountCookie = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
        console.log("Logged in successfully and got account cookie...".green)
    axios.get('https://ais.usvisa-info.com/en-tr/niv/schedule/49489128/appointment/days/124.json?appointments[expedite]=false', {
        headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.7',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'x-requested-with': 'XMLHttpRequest',
        'x-csrf-token': csrfToken.toString(),
        'cookie': accountCookie,
  },
    referrer: 'https://ais.usvisa-info.com/en-tr/niv/schedule/49489128/appointment?utf8=%E2%9C%93&applicants%5B%5D=57678501&applicants%5B%5D=57680214&applicants%5B%5D=57681172&applicants%5B%5D=57699466&confirmed_limit_message=1&commit=Continue',
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
})
  .then(response => {
    console.log("Extracted dates...".green)
    const targetDate = '2024-05-31';
    const earlierDates = [];
    for (const item of response.data) {
      if (item.date < targetDate) {
        earlierDates.push(item.date);
      }
    }
    
    if (earlierDates.length > 0) {
      console.log('Earlier date(s) found for Ankara Visa, Sending Email! Claim them as soon as possible!:'.green, earlierDates.join(', ').green);
      var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'TurkeyReservationBot@hotmail.com',
          pass: 'Huzn8299@'
        }
      });
      var mailOptions = {
        from: 'TurkeyReservationBot@hotmail.com',
        to: 'ekremgamer61@gmail.com',
        subject: 'Visa Dates Available!',
        text: 'Earlier date(s) found for Ankara Visa, Sending Email! Claim them as soon as possible!: THIS IS A TEST ' + earlierDates.join(', ')
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Ankara Dates Email Sent!'.green);
        }
      });
    } else {
      console.log('Earlier date not found for Ankara Visa, try again later!'.red);
    }

    })
 
  })
});
  }
};

var nodemailer = require('nodemailer');

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
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
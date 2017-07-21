var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const nodemailer = require('nodemailer');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname ,'../public/mail.html'));
});

router.post('/', function (req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'tedxiitdhanbad123@gmail.com',
      pass: 'dhanbad123'
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"tedxiitdhanbad" <tedxiitdhanbad123@gmail.com>', // sender address
    to: 'tedxiitdhanbad123@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world', // plain text body
    html: '<b>Name : ' + req.body.fname + ' ' + req.body.lname + '</b><b><br/><b> Email : ' +
    req.body.email + '</b><br/><b> Phone : ' + req.body.phone +
    '</b><br/><b> Message : ' + req.body.message + '</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.end();
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.sendFile(path.join(__dirname,'../public/mail.html'));
});

module.exports = router;
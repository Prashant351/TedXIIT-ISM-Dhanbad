var http = require('http');
var fs = require('fs')
var express = require('express');
var app = express();
var path = require('path');
const nodemailer = require('nodemailer');
'use strict';
app.use('/home', express.static(__dirname));
var server = app.listen(5000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/sendmail', function(req, res) {
  //res.render(express.static(__dirname + 'mail.html'), function(req, res) {
  console.log("YES");
  res.redirect('/home');

  //});


});

app.post('/sendmail', function(req, res) {


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
  //res.render('/sendmail', express.static(path.join(__dirname + 'mail.html')));
  //setTimeout(function(req, res) {
  res.redirect('/home');
  //}, 3000);
});
// http.createServer(function(request, response) {
//   fs.readFile('index.html', function(err, data) {
//     response.writeHead(200, {
//       'Conent-type': 'text/html'
//     });
//     response.write(data);
//     response.end();
//   });
// }).listen(8080, function() {
//   console.log('Listening on port 8080...');
// });

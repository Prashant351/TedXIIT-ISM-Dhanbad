var express = require('express');
//var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');
var mail = require('./routes/mail');

var app = express();

//app.set('views',path.join(__dirname,'views'));
//app.engine('handlebars',exphbs({defaultLayout:'layout'}));
//app.set('view engine','handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.use('/', index);
app.use('/sendmail', mail);

app.set('port',4000);

app.listen(app.get('port'),function (req,res) {
	console.log('Server started');
});

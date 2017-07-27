var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var app = express();
//var router = express.Router();


app.get('/', function(req, res) {
  url = 'https://tedxiitdhn.wordpress.com/author/tedxiitdhanbad/';
  request(url, function(err, res, html) {
    if (!err) {
      console.log("Getting data");
      var $ = cheerio.load(html);
      var img_attr, title, timestamp, content;
      var json = {
        img_attr: "",
        title: "",
        timestamp: "",
        content: ""
      };
      $('#post-182').filter(function() {
        console.log('avsdz');
        var data = $(this);
        img_attr = data.children().eq(0).children().children().attr('src');
        title = data.children().eq(1).children().eq(0).children().eq(0).children('a').text();
        timestamp = data.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().children('time').eq(0).text();
        content = data.children().eq(1).children().eq(1).children('p').text();
        json.img_attr = img_attr;
        json.title = title;
        json.timestamp = timestamp;
        json.content = content;
      });
    }
    console.log("dasoj");
    fs.writeFile('data.json', JSON.stringify(json), function(err) {
      console.log("Data Updated");
    });
  });
});

app.set('port', 4000);
app.listen(app.get('port'), function() {
  console.log('Serving');
});
//module.exports = router;

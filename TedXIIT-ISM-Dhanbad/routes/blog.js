var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var app = express();
//var router = express.Router();


app.get('/', function(req, res) {
  url = 'https://tedxiitdhn.wordpress.com/author/tedxiitdhanbad/';
  var img_attr, title, timestamp, content;
  var json = {
    img_attr: "",
    title: "",
    timestamp: "",
    summary: "",
    content: [{
      cnt: ""
    }]
  };
  var json_array = [];
  request(url, function(err, res, html) {
    if (!err) {
      console.log("Getting data");
      var $ = cheerio.load(html);

      $('article').each(function() {
        $(this).filter(function() {
          console.log('correct');
          var data = $(this);
          img_attr = data.children().eq(0).children().children().attr('src');
          title = data.children().eq(1).children().eq(0).children().eq(0).children('a').text();
          timestamp = data.children().eq(1).children().eq(0).children().eq(1).children().eq(0).children().children('time').eq(0).text();
          summary = data.children().eq(1).children().eq(1).children('p').text();
          json.img_attr = img_attr;
          json.title = title;
          json.timestamp = timestamp;
          json.summary = summary;
          url = data.children().eq(1).children().eq(1).children().children('a').attr('href');
          request(url, function(err, res, html) {
            if (!err) {
              console.log('correct-inner1');
              $('.entry-content p').each(function() {
                $(this).filter(function() {
                  console.log('correct-inner');
                  var dat = $(this);
                  content = dat.text();
                  var jsn1 = {
                    cnt: ""
                  };
                  jsn1.cnt = content;
                  json.content.push(jsn1);
                });
              });
            } else console.log("error-inner");
          });
          json_array.push(json);
          console.log(json_array);
        });
      });
    } else console.log("error");
    console.log(json_array);
    fs.writeFile('data.json', JSON.stringify(json_array), function(err) {
      console.log("Data Updated");
    });

  });
});

app.set('port', 4000);
app.listen(app.get('port'), function() {
  console.log('Serving');
});
//module.exports = router;

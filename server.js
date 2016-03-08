var express = require("express"); // https://github.com/expressjs/express
var request = require('request'); // https://github.com/request/request
var cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio

var app = express();
app.get('/', function(req, res) {
    request('https://news.google.co.uk', function (error, response, body) {
        var $ = cheerio.load(body);
        var html = "";
        if (req.query.q == '~' ) {
            for (var i=0; i<$('.titletext').get().length; i++) {
                html += $('.titletext').eq(i).text()+'~'; }
        }
        else {   
            for (var i=0; i<$('.titletext').get().length; i++) {
                html += $('.titletext').eq(i).text()+'<p>'; }
        }
        res.send(html);
    }); // request gets html, cheerio parses to find title tags
});     // express sends concatenated titles

app.listen(process.env.PORT, function(){
    console.log("Listening on " + process.env.PORT);
});
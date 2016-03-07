var express = require("express"); // https://github.com/expressjs/express
var request = require('request'); // https://github.com/request/request
var cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio

var app = express();
app.get('/', function(req, res){
    request('https://news.google.co.uk', function (error, response, body){
        var $ = cheerio.load(body);
        var html = "";
        for (var i = 0; i < $('.titletext').get().length; i++)   {
            html += $('.titletext').eq(i).text()+'<p>'; }
        res.send(html);
    });
});

app.listen(process.env.PORT, function(){
    console.log("Listening on " + process.env.PORT);
});
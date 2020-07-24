var express = require('express');
var app = express();
const util = require('util');
var cors = require('cors');
app.use(cors());
var fs = require('fs');

app.get('/search/units/', function (req, res) {
		var mongoh = require('./mongodb_handler.js')(function callback(err,docs) {
		   res.end(JSON.stringify(docs));
		}, req.query.value, req.query.param, req.query.rarity);
})

app.get('/search/',function(req,res){
       
     res.sendFile(__dirname+'/search.html');

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
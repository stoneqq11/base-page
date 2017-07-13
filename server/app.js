var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path');
var fs = require('fs');
var routes = require('./router');
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/src', express.static(path.resolve(__dirname, '../src')));

app.use(routes);

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://localhost');
});


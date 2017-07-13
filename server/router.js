var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

var config = require('../package.json');

var http = require('http');
var url = require('url');


var mockConfig = require('../mock/config.js');
router.get(/.*/, function (req, res) {
    var url = req.url.split('?')[0];
    console.log(url)
    if (/^\/page/.test(url)) {
    	console.log(path.resolve(__dirname, '../src/index.html'))
    	res.send(fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8'));
    } else if (mockConfig[url]) {
        url = '../mock/' + mockConfig[url];
        res.send(require(url));
    }
});

module.exports = router;


var express = require('express');
var router = express.Router();

var config = require('../package.json');

var http = require('http');
var url = require('url');


var mockConfig = require('../mock/config.js');
router.get(/.*/, function (req, res) {
    var url = req.url.split('?')[0];
    console.log(url)
    if (mockConfig[url]) {
        url = '../mock/' + mockConfig[url];
        res.send(require(url));
    }
});

module.exports = router;


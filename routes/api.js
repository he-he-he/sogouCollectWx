/**
 * Created by chuanlong on 2014/12/13.
 */
var express = require('express'),
    router = express.Router(),
    db = require('../lib/mysql');
router.get('/key/:key', function (req, res) {
    db.test(function (data) {
        res.json(data)
    });
});

module.exports = router;
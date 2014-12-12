/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express');
var router = express.Router();
//router.use(function(req, res, next) {
//    console.log(req.method, req.url,'asdfasdf');
//    next();
//});
router.get('/', function (req, res) {
    res.sendfile('app/index.html');
});

module.exports = router;
/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express');
var router = express.Router();
router.use(function(req, res, next) {
    console.log(req.method, req.url,'asdfasdf');
    next();
});
router.get('/', function (req, res) {
    res.render('index',{title:'aaa'})
});
router.get('/a', function (req, res) {
    res.render('a')
});
module.exports = router;
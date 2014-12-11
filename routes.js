/**
 * Created by chuanlong on 2014/12/10.
 */
//var express = require('express');
//var router = express.Router();
//
//// middleware specific to this router
//router.use(function timeLog(req, res, next) {
//    console.log('Time: ', Date.now());
//    next();
//})
//// define the home page route
//router.get('/', function(req, res) {
//    res.send('Birds home page1');
//})
//// define the about route
//router.get('/about', function(req, res) {
//    res.send('About birds2');
//})
//
//module.exports = router;

var index=require('./routes/index');
var admin=require('./routes/admin');
var collect=require('./routes/collect');
module.exports=function(app){
    app.use('/',index);
    app.use('/admin',admin);
    app.use('/collect',collect);
};
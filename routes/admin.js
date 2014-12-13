/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   db.test(function(){
      console.log('bbbbbbbbbb')
    //  res.sendfile('app/admin/index.html');
   });

});
router.get('/getKey',function(req,res){

});
module.exports = router;
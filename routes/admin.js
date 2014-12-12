/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.sendfile('app/admin/index.html');
});

module.exports = router;
/**
 * Created by chuanlong on 2014/12/11.
 */
var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.send('admin');
});
router.get('/:id', function(req, res) {
    res.send('aa'+req.params.id);
});
router.get('/a', function(req, res) {
    res.send('aa');
});
module.exports = router;
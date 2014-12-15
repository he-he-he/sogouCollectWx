/**
 * Created by chuanlong on 2014/12/13.
 */
var express = require('express'),
    router = express.Router(),
    db = require('../lib/mysql');

//获取关键字
router.get('/key/:keyId', function (req, res) {
    db.test(function (data) {
        res.json(data)
    });
});
//添加关键字
router.post('/key/:key/:classId', function (req, res) {
    var key = req.params.key,
        classId = req.params.classid,
        msg = 'ok';
    db.addKey({classid: classId, wxKey: key, flag: 1}, function (result) {
        if (result < 0) {
            msg = 'err';
        }
        res.json({msg: msg});
    });
});

router.route('/class/:name?')
    .get(function (req, res) {
        db.getClass(function (result) {
            res.json(result);
        });
    })
    .post(function (req, res) {
        var className = req.body.name;
        db.addClass({className: className}, function (result) {
            res.json({id: result});
        });
    });
router.route('/class/:id')
    .delete(function (req, res) {
        var id = req.params.id;
        db.delClass(id);
        res.send('delete');
    });
module.exports = router;
/**
 * Created by chuanlong on 2014/12/13.
 */
var express = require('express'),
    router = express.Router(),
    db = require('../lib/mysql');


//关键字管理
router.route('/key')
    .get(function (req, res) {
        db.keyManager.getKeyCount(function (result) {
            res.json({total:result});
        })
    })
    .post(function (req, res) {
        db.keyManager.addKey({classid: req.body.classid, wxkey: req.body.wxkey, flag: 1}, function (result) {
            res.json({id: result});
        });
    })
    .put(function (req, res) {
        if (req.body.wxkey != null) {
            var data = {};
            if (req.body.classid === '') {
                data = {wxkey: req.body.wxkey}
            } else {
                data = {wxkey: req.body.wxkey, classid: req.body.classid}
            }
            db.keyManager.updateKey(req.body.id, data);
            res.send('update');
        } else if (req.body.flag != null) {
            db.keyManager.statusKey(req.body.flag, req.body.id);
            res.send('status');
        } else {
            res.send('err');
        }
    });
router.get('/key/:page', function (req, res) {
    var page = req.params.page;
    if (page === '0') {
        db.keyManager.getAll(function (result) {
            res.json(result);
        });
    } else {
        db.keyManager.getKey(page, function (result) {
            res.json(result);
        });
    }

});

//类别路由
router.route('/class')
    .post(function (req, res) {
        var className = req.body.name;
        db.classManager.addClass({className: className}, function (result) {
            res.json({id: result});
        });
    })
    .get(function (req, res) {
        db.classManager.getClassCount(function (result) {
            res.json({total: result});
        });
    })
    .put(function (req, res) {
        if (req.body.name != null) {
            db.classManager.updateClass(req.body.id, req.body.name);
            res.send('update');
        } else if (req.body.flag != null) {
            db.classManager.statusClass(req.body.flag, req.body.id);
            res.send('status');
        } else {
            res.send('err');
        }
    });
router.get('/class/:page', function (req, res) {
    var page = req.params.page;
    if (page === '0') {
        db.classManager.getAll(function (result) {
            res.json(result);
        });
    } else {
        db.classManager.getClass(page, function (result) {
            res.json(result);
        });
    }
});

router.route('/wx/Account')
    .get(function(req,res){
        db.wxAccount.getTotal(function(result){
            req.json({total:result});
        });
    })
    .post(function(req,res){

    });
module.exports = router;
/**
 * Created by chuanlong on 2014/12/13.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sogou',
    password: 'sogou',
    database: 'sogouCollectwx',
    charset: 'utf8'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//查询关键字
function getKey(cb) {
    connection.query('select id,wxkey from wx_key where flag=1', function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            cb(rows);
        }
    });
    //connection.end();
}
//添加关键字
function addKey(data, cb) {
    connection.query('insert into wx_key set ?', data, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            cb(result.insertId);
        }
    });
}
//添加分类
function addClass(data, cb) {
    connection.query('insert into wx_class set ?', data, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            cb(result.insertId);
        }
    });
}
//查询分类
function getClass(cb) {
    connection.query('select id,classname from wx_class where flag=1', function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            cb(rows);
        }
    });
}
//删除分类
function delClass(id) {
    connection.query("UPDATE wx_class SET flag=0 where id= ?", [id], function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}
//插入微信号码
function insertWxAccount(data) {
    var op = {}
    connection.query('insert into wx_accountnumber set ?', op, function (err, result) {
        console.log(result.insertId)
    });

}
exports.addKey = addKey;
exports.addClass = addClass;
exports.getClass = getClass;
exports.delClass = delClass;
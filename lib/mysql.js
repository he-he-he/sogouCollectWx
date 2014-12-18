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
var keyManager = {
    //获取关键字
    getKey: function (cb) {
        connection.query('select k.id,classid,wxkey,classname,k.flag from wx_key k left join wx_class c on k.classid=c.id ', function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
            }
        })
    },
    //添加关键字
    addKey: function (data, cb) {
        connection.query('insert into wx_key set ?', data, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result.insertId);
            }
        });
    },
    //更新状态
    statusKey: function (flag, id) {
        connection.query('update wx_key set flag=? where id= ?', [flag, id], function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    },
    //更新关键字
    updateKey: function (id, data) {
        connection.query('update wx_key set ? where id=?', [data, id], function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    }
};
var classManager = {
    //添加分类
    addClass: function (data, cb) {
        connection.query('insert into wx_class set ?', data, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                cb(result.insertId);
            }
        });
    },
    //删除分类
    statusClass: function (flag, id) {
        connection.query("UPDATE wx_class SET flag=? where id= ?", [flag, id], function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    },
    //修改分类
    updateClass: function (id, name) {
        connection.query("UPDATE wx_class SET classname= ? where id= ?", [name, id], function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    },
    //查询分类
    getClass: function (pageNum,cb) {
        var page= 0,pagesize=10;
        if(pageNum) page=pageNum;
        connection.query('SELECT id,classname,flag FROM wx_class WHERE id  <= (SELECT id FROM wx_class ORDER BY id  desc LIMIT ?, 1) ORDER BY id  desc LIMIT ?',[((page-1)*pagesize),pagesize], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
            }
        });
    },
    getClassCount:function(cb){
        connection.query('select count(*) as count from wx_class',function(err,rows){
            if (err) {
                console.log(err);
            } else {
                cb(rows[0].count);
            }
        });
    }
};
//插入微信号码
var insertWxAccount = function (data) {
    connection.query('insert into wx_accountnumber set ?', data, function (err, result) {
        console.log(result.insertId)
    });
};
exports.keyManager = keyManager;
exports.classManager = classManager;
exports.insertWxAccount = insertWxAccount;
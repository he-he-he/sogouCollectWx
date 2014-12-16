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
    statusKey:function(flag,id){
        connection.query('update wx_key set flag=? where id= ?',[flag,id],function(err,result){
            if (err) {
                console.log(err);
            }
        });
    },
    //更新关键字
    updateKey:function(id,name){
        connection.query('update wx_key set wxkey=? where id=?',[name,id],function(err,result){
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
    statusClass: function (flag,id) {
        connection.query("UPDATE wx_class SET flag=? where id= ?", [flag,id], function (err, result) {
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
    getClass: function (cb) {
        connection.query('select id,classname,flag from wx_class', function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
            }
        });
    }
};
//插入微信号码
function insertWxAccount(data) {
    var op = {}
    connection.query('insert into wx_accountnumber set ?', op, function (err, result) {
        console.log(result.insertId)
    });

}
exports.keyManager = keyManager;
exports.classManager = classManager;
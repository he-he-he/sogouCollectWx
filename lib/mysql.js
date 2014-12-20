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
    getKey: function (Index, cb) {
        var pageIndex = 1, pageSize = 10;
        if (Index) pageIndex = Index;
        connection.query('select k.id,classid,wxkey,classname,k.flag from wx_key k left join wx_class c on k.classid=c.id where k.id  <= (SELECT id FROM wx_key ORDER BY id  desc LIMIT ?, 1) ORDER BY k.id  desc LIMIT ?', [((pageIndex - 1) * pageSize), pageSize], function (err, rows, fields) {
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
    },
    //记录总数
    getKeyCount: function (cb) {
        connection.query('select count(*) as count from wx_key', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows[0].count);
            }
        });
    },
    //查询所有分类
    getAll: function (cb) {
        connection.query('select k.id,wxkey,classname from wx_key k left join wx_class c on k.classid=c.id k.flag=1', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
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
    getClass: function (Index, cb) {
        var pageIndex = 1, pageSize = 10;
        if (Index) pageIndex = Index;
        connection.query('SELECT id,classname,flag FROM wx_class WHERE id  <= (SELECT id FROM wx_class ORDER BY id  desc LIMIT ?, 1) ORDER BY id  desc LIMIT ?', [((pageIndex - 1) * pageSize), pageSize], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
            }
        });
    },
    //查询所有分类
    getAll: function (cb) {
        connection.query('select id,classname  from wx_class where flag=1', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows);
            }
        });
    },
    //分类个数
    getClassCount: function (cb) {
        connection.query('select count(*) as count from wx_class', function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows[0].count);
            }
        });
    }
};

var wxAccount = {
    //添加
    addAccount: function (data, cb) {
        connection.query('insert into wx_account set ?', data, function (err, result) {
            console.log(result.insertId)
        });
    },
    //状态修改
    delAccount: function (id, flag) {
        connection.query('update wx_account set  flag=? where id= ?', [flag, id], function (err, result) {
            if (err) {
                console.log(err)
            }
        });
    },
    //修改
    editAccount: function (id, data, cb) {
        connection.query('update wx_account set  ? where id= ?', [data, id], function (err, result) {
            if (err) {
                console.log(err)
            }
        });
    },
    //所有号码
    getAllAccount: function (cb) {
        connection.query('select * from  wx_account where flag=1',  function (err, result) {
            console.log(result.insertId)
        });
    },
    //微信个数
    getTotal:function(){
        connection.query('select count(*) as count from  wx_account ',  function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows[0].count);
            }
        });
    },
    //分页
    getAccount: function (Index) {
        var pageIndex = 1, pageSize = 10;
        if (Index) pageIndex = Index;
        connection.query('select * from  wx_account where id <=(select id from wx_account  ORDER BY id  desc LIMIT ?, 1)  ORDER BY id  desc LIMIT ?, 1',[((pageIndex - 1) * pageSize), pageSize],  function (err, result) {
            console.log(result.insertId)
        });
    }
};

exports.keyManager = keyManager;
exports.classManager = classManager;
exports.wxAccount = wxAccount;
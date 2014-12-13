/**
 * Created by chuanlong on 2014/12/13.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sogou',
    password: 'sogou',
    database: 'sogouCollectwx'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

function getKey(cb) {
    connection.query('select * from test', function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            cb(rows);
        }

    });
    //connection.end();
}
function insertWxAccount(data) {
    op={}
    connection.query('insert into wx_accountnumber set ?', op, function (err, result) {
        console.log(result.insertId)
    })
}
exports.test = test;
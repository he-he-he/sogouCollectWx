/**
 * Created by chuanlong on 2014/12/10.
 */
var index=require('./routes/index');
var admin=require('./routes/admin');
var collect=require('./routes/collect');
module.exports=function(app){
    app.use('/',index);
    app.use('/admin',admin);
    app.use('/collect',collect);
};
/**
 * Created by chuanlong on 2014/12/10.
 */
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    routes = require('./routes'),
    ejs=require('ejs');

var app = express();

app.use(morgan('dev'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}
routes(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
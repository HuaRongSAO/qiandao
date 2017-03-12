'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _parseurl = require('parseurl');

var _parseurl2 = _interopRequireDefault(_parseurl);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _isUser = require('./middllerwares/isUser');

var _isUser2 = _interopRequireDefault(_isUser);

var _db = require('./models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//中间件验证
(0, _db2.default)();
//链接数据库


var app = (0, _express2.default)();

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

//session
app.use((0, _expressSession2.default)({
    secret: 'qiandao app',
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }, //365days
    saveUninitialized: true
}));

app.use('/pdf', function (req, res, next) {
    res.render('pdf', { message: null });
});
app.use('/auth', _auth2.default);
app.use('/pc', function (req, res, next) {
    res.render('login', { message: null });
});
app.use('/mobile', function (req, res, next) {
    res.render('phone', { message: null });
});
app.use('/', _isUser2.default, _index2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
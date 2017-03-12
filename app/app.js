import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import parseurl from 'parseurl'


import index from './routes/index'
import users from './routes/user'
import routerAuth from './routes/auth'
//中间件验证
import isUser from './middllerwares/isUser'
//链接数据库
import DBcontent from './models/db'
DBcontent();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret: 'qiandao app',
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},//365days
    saveUninitialized: true
}));

app.use('/pdf', function (req, res, next) {
    res.render('pdf', {message: null})
});
app.use('/auth', routerAuth);
app.use('/pc', function (req, res, next) {
    res.render('login', {message: null})
});
app.use('/mobile', function (req, res, next) {
    res.render('phone', {message: null})
});
app.use('/', isUser, index);

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
    console.log(err)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

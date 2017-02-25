'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteUser = exports.findUsersPage = exports.countUsers = exports.findAllUser = exports.findUser = exports.saveUser = undefined;

var _userModel = require('./../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.saveUser = saveUser;
exports.findUser = findUser;
exports.findAllUser = findAllUser;
exports.countUsers = countUsers;
exports.findUsersPage = findUsersPage;
exports.deleteUser = deleteUser;
// 创建用户

function saveUser(json) {
    return (0, _userModel2.default)({
        username: json.username,
        password: json.password,
        work_number: 1,
        role: 0
    }).save().then(function (doc) {
        console.log(doc);
        return doc;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
// 查询用户
function findUser(queryJson) {
    return _userModel2.default.find(queryJson).then(function (user) {
        return user;
    }).catch(function (err) {
        console.log('错 误' + err);
        throw err;
    });
}
// 查询所有用户
function findAllUser() {
    return _userModel2.default.find().then(function (doc) {
        // console.log(doc)
        return doc;
    }).catch(function (err) {
        console.log('错误' + err);
        throw err;
    });
}

//分页查询用户
function findUsersPage(_ref) {
    var _ref$page = _ref.page,
        page = _ref$page === undefined ? 1 : _ref$page,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 20 : _ref$limit;

    var _skip = (page - 1) * limit;
    return _userModel2.default.find().limit(limit).skip(_skip).then(function (users) {
        return users;
    }).catch(function (err) {
        return console.log("查找用户：" + err);
    });
}

//统计用户总数
function countUsers() {
    return _userModel2.default.find().count().then(function (count) {
        return count;
    }).catch(function (err) {
        return console.log("统计用户：" + err);
    });
}

//更新用户信息
function updateUser(json, updata) {
    return _userModel2.default.update(json).then(function (doc) {
        console.log(doc);
        return doc;
    });
}

//删除用户
function deleteUser(objectid) {
    return _userModel2.default.remove(objectid).then(function (doc) {
        return doc;
    }).catch(function (err) {
        return console.log("删除用户：" + err);
    });
}
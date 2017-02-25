'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTaskAndUsers = undefined;

var _db = require('./../models/db');

var _db2 = _interopRequireDefault(_db);

var _taskAndUsersModel = require('./../models/taskAndUsersModel');

var _taskAndUsersModel2 = _interopRequireDefault(_taskAndUsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db2.default)();

exports.createTaskAndUsers = createTaskAndUsers;


function createTaskAndUsers(json) {
    return (0, _taskAndUsersModel2.default)({
        task_id: json.task_id,
        department: json.department,
        user: json.user
    }).save().then(function (doc) {
        console.log(doc);
        return doc;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}

createTaskAndUsers({
    task_id: '58ae7a6dc639da5aacfee11a',
    department: '一区',
    user: '58ae8b3eada21669c107c219'
});
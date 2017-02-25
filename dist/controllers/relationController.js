'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findRelation = exports.createTaskAndUsers = undefined;

var _taskAndUsersModel = require('./../models/taskAndUsersModel');

var _taskAndUsersModel2 = _interopRequireDefault(_taskAndUsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createTaskAndUsers = createTaskAndUsers;
exports.findRelation = findRelation;


function createTaskAndUsers(json) {
    return (0, _taskAndUsersModel2.default)({
        task_id: json.task_id,
        department: json.department,
        user_id: json.user_id,
        created_at: new Date()
    }).save().then(function (doc) {
        console.log(doc);
        return doc;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
function findRelation(json) {
    return _taskAndUsersModel2.default.find(json);
}
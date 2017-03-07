'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateRelation = exports.findRelation = exports.createTaskAndUsers = undefined;

var _taskAndUsersModel = require('./../models/taskAndUsersModel');

var _taskAndUsersModel2 = _interopRequireDefault(_taskAndUsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createTaskAndUsers = createTaskAndUsers;
exports.findRelation = findRelation;
exports.updateRelation = updateRelation;


function createTaskAndUsers(json) {
    return (0, _taskAndUsersModel2.default)({
        task_id: json.task_id,
        department: json.department,
        user_id: json.user_id,
        created_at: new Date()
    }).save().then(function (doc) {
        return doc;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
function findRelation(json) {
    return _taskAndUsersModel2.default.find(json).sort({ _id: 1 }).catch(function (err) {
        console.log(err);
        throw err;
    });
}

function updateRelation(query, json) {
    return _taskAndUsersModel2.default.where(query).update(json).catch(function (err) {
        console.log(err);
        throw err;
    });
}
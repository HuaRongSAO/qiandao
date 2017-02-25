'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskAndUsersSchema = new _mongoose2.default.Schema({
    task_id: String,
    department: String,
    user_id: String,
    created_at: Date
});

var TaskAndUsers = _mongoose2.default.model('TaskAndUsers', taskAndUsersSchema);

exports.default = TaskAndUsers;
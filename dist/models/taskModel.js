'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskSchema = new _mongoose2.default.Schema({
    title: { type: String, required: true },
    content: String,
    file: String,
    type: String,
    start: Date,
    end: Date,
    questions: Array,
    created_at: Date,
    updated_at: Date
});

var Task = _mongoose2.default.model('Task', taskSchema);

exports.default = Task;
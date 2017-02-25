'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    work_number: String,
    department: String,
    birthday: Date,
    job: String,
    jobname: String,
    role: Number,
    belong: String,
    number: Number,
    created_at: Date,
    updated_at: Date
});

// 在Schema里添加自定义方法
userSchema.methods.capitalizeName = function () {
    this.name = this.name.toUpperCase();
    return this.name;
};

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;
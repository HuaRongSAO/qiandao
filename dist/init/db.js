'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function () {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connect(url);
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'mongodb://localhost:27017/qiaodao';
_mongoose2.default.Promise = _promise2.default;
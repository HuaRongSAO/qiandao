'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = uploadFile;

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sillyDatetime = require('silly-datetime');

var _sillyDatetime2 = _interopRequireDefault(_sillyDatetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uploadFile(req, callback) {
    var form = new _formidable2.default.IncomingForm();
    form.uploadDir = "./dist/public/files";
    var taskInfo = null,
        filePath = null;
    return form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        taskInfo = fields;
        var ttt = _sillyDatetime2.default.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = files.file.name;
        //执行改名
        var oldpath = files.file.path;
        //新的路径由三个部分组成：时间戳、随机数、拓展名
        // let newpath = __dirname + "../public/files/" + ttt + ran + extname;
        var newpath = _path2.default.normalize(__dirname + "/../../dist/public/files/" + ttt + ran + extname);
        var filePath = "/files/" + ttt + ran + extname;
        //改名
        _fs2.default.rename(oldpath, newpath, function (err) {
            if (err) {
                throw Error("改名失败");
            }

            console.log(taskInfo, filePath);
            return { taskInfo: taskInfo, filePath: filePath };
        });
    });
}
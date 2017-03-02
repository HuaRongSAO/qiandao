"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setArray = setArray;

//组合数组
function setArray(users, finish) {
    var user = {};
    var a = [];
    var b = [];
    var isSame = false;
    for (var _i = 0; _i < users.length; _i++) {
        for (var j = 0; j < finish.length; j++) {
            if (users[_i]._id == finish[j].user_id) {
                isSame = true;
                break;
            }
        }
        if (isSanme) {
            a.push(users[_i]);
            isSame = false;
        } else {
            b.push(users[_i]);
        }
    }
    for (var i in a) {
        b.push(a[i]);
    }
    console.log(b.length);
    return b;
}

exports.default = setArray;
import User from './../models/userModel'
import DBcontent from './../models/db'
DBcontent();

import Task from './../models/taskModel'

Task({
    title: '签到系统使用说明',
    content: '以后本系统将用来发布相关的文件和视频，用于交流学习，和任务发布等事情。请所有人注意签到！',
    start: new Date(),
    end: new Date().getTime()+2592000000,
    created_at: new Date(),
}).save()


import users from './users.json'
import md5 from 'md5'
let admin = User({
    username: 'admin',
    password: md5('123456'),
    work_number: 10000,
    role: 0
});


// save the user
admin.save().then(function (doc) {
    console.log('创建成功')
    console.log(doc)
}).catch(function (err) {
    console.log(err)
});
function zfill(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}
// console.log(users)
for (let i = 0; i < users.length; i++) {
    let work_number = zfill(i, 5)
    User({
        username: users[i].username,
        password: md5('123456'),
        work_number: work_number,
        department: users[i].department,
        birthday: users[i].birthday,
        job: users[i].job,
        jobname: users[i].jobname,
        role: 2,
        number: i,
        created_at: new Date(),
        updated_at: new Date()
    }).save().then(function (doc) {
        console.log('创建成功')
        console.log(doc)
    }).catch(function (err) {
        console.log(err)
    });
}

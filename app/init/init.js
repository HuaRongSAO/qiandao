import User from './../models/userModel'
import DBcontent from './../models/db'
DBcontent();

import Task from './../models/taskModel'

Task({
    title: '签到系统使用说明',
    content: '以后本系统将用来发布相关的文件和视频，用于交流学习，和任务发布等事情。请所有人注意签到！',
    start: new Date(),
    end: new Date().getTime() + 2592000000,
    questions: [{
        question: '修改密码按钮位置？管理员点击右上角管理员,用户点底部击个人中心',
        select: ['知道', '不知道'],
        answer: 0
    }],
    created_at: new Date(),
}).save()


import users from './users.json'
import md5 from 'md5'
User({
    username: 'admin01',
    password: md5('123456'),
    work_number: 'admin01',
    role: 0
}).save()
User({
    username: 'admin02',
    password: md5('123456'),
    work_number: 'admin02',
    role: 0
}).save()


for (let i = 0; i < users.length; i++) {

    User({
        username: users[i].username,
        password: md5('123456'),
        work_number: users[i].number,
        department: users[i].department,
        birthday: users[i].birthday,
        job: users[i].job,
        jobname: users[i].jobname,
        role: 2,
        number: i + 1,
        created_at: new Date(),
        updated_at: new Date()
    }).save().then(function (doc) {
        console.log('创建成功')
        console.log(doc)
    }).catch(function (err) {
        console.log(err)
    });
}

import User from './../models/userModel'
import Department from './../models/departmentModel'
import DBcontent from './../models/db'
import users from './users.json'

const db = DBcontent()
import md5 from 'md5'
import Task from './../models/taskModel'
// 创建第一条课程
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

// 批量导入用户

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

// 批量导入用户
for (let i = 0; i < users.length; i++) {
  User({
    username: users[i].username,
    password: md5('123456'),
    work_number: users[i].number,
    department: users[i].department,
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
  })
}
// 批量创建 科室

let departmentArry = ['护理部', '一区', '二区', '三区', '四区', '五区', '六区', '七区', '八区', '十区', '十一区', '十二区', '十三区', '十四区', '十五区', '十六区', '十七区', '十八区', '十九区', '二十区', '二十一区', '二十二区', 'ICU', 'N2', 'N3', '手术室', '麻醉科', '供应室', '门诊部', '内镜室', '影像科', '新院影像科', '急诊科', '新院急诊', '血透1', '血透2', 'N1肾内科', 'N4区', 'N5区', 'N6-7区产科', 'N8区妇科', 'N9区', 'N10区', 'N11区', 'N12区', 'N13区神外', 'N14区儿科', 'N15区消化科', 'N16区骨科', 'N17区普外', 'N18区', 'N19区呼吸内', 'N20区神内', 'N21区心内科', 'N22区心内科', 'N23区肿瘤科', 'N24', 'N26区干部病房', 'N27区特需病房', '体检中心', '社会发展部']

for (let i = 0; i < departmentArry.length; i++) {
  setTimeout(function () {
    (function (j) {
      Department({
        name: departmentArry[j],
        number: j + 1
      }).save().then((doc) => (console.log(doc))).catch(function (err) {
        console.log(err)
      })
    })(i)
  }, 50)
}
import express from 'express'
import md5 from 'md5'
import {findNewestTask} from './../controllers/taskController'
import {findUser, updateUser} from './../controllers/userController'
import {findRelation, createTaskAndUsers, updateRelation} from './../controllers/relationController'
let userRouter = express.Router()

//默认最新的课程
userRouter.get('/article/', function (req, res, next) {

    var p1 = new Promise(function (resolve, reject) {
        findNewestTask().then(function (task) {
            resolve(task);
        })
    });
    var p2 = new Promise(function (resolve, reject) {
        let json = {department: req.session.user.department}
        findUser(json).then(function (users) {
            resolve(users)
        })
    });
    Promise.all([p1, p2]).then(function (results) {
        let task = results[0];
        if (task == null) {
            task = {}
        }
        let users = results[1];
        let json = {task_id: task._id, department: req.session.user.department}
        findRelation(json).then(function (finish) {
            console.log(finish)
            res.render('article', {
                task: task,
                user: req.session.user,
                users: users,
                finish: finish
            })
        })
    }).catch(function (r) {
        console.log(r);
    });
});

userRouter.get('/article/finish/:taskid', function (req, res) {
    createTaskAndUsers({
        task_id: req.params.taskid,
        department: req.session.user.department,
        user_id: req.session.user._id
    }).then(function (task) {
        res.json({state: true, msg: '完成课程'})
    })
})
//退出
userRouter.get('/out', function (req, res) {
    req.session.user = '';
    res.redirect('/')
})
//修改密码

userRouter.post('/update/:uid', function (req, res) {
    let query = {_id: req.params.uid, password: md5(req.body.oldPassword)}
    let updateJson = {password: md5(req.body.newPassword)}

    updateUser(query, updateJson).then(function (result, resolve) {
        if (result.nModified == 0) {
            res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
        }
        res.json({state: true, data: '', msg: '修改成功！'})
    }).catch(function (err) {
        res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
    })
})

//做题
userRouter.post('/task/answer/:taskid', function (req, res) {

    let query = {user_id: req.session.user._id, task_id: req.params.taskid}
    let updateJson = {answer:JSON.parse(req.body.answer)};
    console.log(query)
    console.log(updateJson)
    updateRelation(query, updateJson).then(function (doc) {
        res.json({state: true, data: '', msg: ''})
    }).catch(function (err) {
        res.json({state: false, data: '', msg: '提交失败'})
    })
})


export default userRouter

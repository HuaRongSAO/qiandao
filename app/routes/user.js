import express from 'express'
import {findNewestTask} from './../controllers/taskController'
import {findUser} from './../controllers/userController'
import {findRelation, createTaskAndUsers} from './../controllers/relationController'
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
        if(task == null){
            task = {}
        }
        let users = results[1];

        let json = {task_id: task._id, department: req.session.user.department}
        findRelation(json).then(function (finish) {
            res.render('article', {task: task,
                user: req.session.user,
                users: users,
                finish: finish})
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

userRouter.get('/out',function (req, res)  {
    req.session.user = '';
    res.redirect('/')
})


export default userRouter

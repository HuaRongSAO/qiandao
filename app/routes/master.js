import express from 'express'
import  formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import sd from 'silly-datetime'
import {findTaskByPage, countTask, deleteTaskById, findTask, creatTask} from './../controllers/taskController'
import {countUsers, findUsersPage, deleteUser, findUser, updateUser} from './../controllers/userController'
import md5 from 'md5'
import {findRelation} from './../controllers/relationController'

let masterRouter = express.Router()
//管理员页面路由控制
//负责 管理课程 管理用户 添加课程

//退出登入


// 管理员页面 管理课程
masterRouter.get('/', function (req, res, next) {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    countTask().then(function (count) {
        findTaskByPage({page, limit}).then(function (tasks) {
            res.render('admin', {tasks: tasks, count: count - 1, page: page})
        })
    })
});
masterRouter.get('/out', function (req, res, next) {
    req.session.user = '';
    res.redirect('/')
});

//删除单条课程
masterRouter.get('/tasks/remove/:taskid', function (req, res, next) {
    let objectJson = {'_id': req.params.taskid}

    deleteTaskById(objectJson).then(function (doc) {
        res.json({state: true, msg: '成功删除'})
    }).catch((err) => (
        res.json({state: false, msg: '删除失败'})
    ))
});
//查找单条课程
masterRouter.get('/tasks/find/:taskid', function (req, res, next) {
    let objectJson = {'_id': req.params.taskid}
    findTask(objectJson).then(function (task) {
        res.json({state: true, msg: '查找到课程！', task: task})
    }).catch(function (err) {
        res.json({state: false, msg: '没有找到课程！'})
    })
});
//课程详细情形
masterRouter.get('/tasks/info/:taskid', function (req, res, next) {
    let objectJson = {'_id': req.params.taskid}
    var p1 = new Promise(function (resolve, reject) {
        findTask(objectJson).then(function (task) {
            resolve(task);
        })
    });
    var p2 = new Promise(function (resolve, reject) {
        findUser().then(function (users) {
            resolve(users)
        })
    });

    Promise.all([p1, p2]).then(function (results) {

        let task = results[0];
        if (task == null) {
            task = {}
        }
        let users = results[1];
        let json = {task_id: task[0]._id}
        findRelation(json).then(function (finish) {
            let user = {}
            let a = []//wancheng
            let b = []//weiwancheng
            let isSame = false;

            for (let i = 0; i < users.length; i++) {
                for (let j = 0; j < finish.length; j++) {
                    if (users[i]._id == finish[j].user_id) {
                        isSame = true;
                        user = users[i]
                        user.wan = finish[j].created_at
                        break
                    }
                }
                if (isSame) {
                    a.push(user)
                    isSame = false
                } else {
                    b.push(users[i])
                }
            }
            for (let i in a) {
                console.log(a[i])
                b.push(a[i]);
            }
            console.log(b[b.length - 1])
            return b
        }).then(function (arr) {


            res.render('courseProgress', {users: arr, task: task[0], user: req.session.user})
        })
    }).catch(function (r) {
        console.log(r);
    });


});
//课程页面
masterRouter.get('/tasks/add', function (req, res, next) {
    res.render('addCourse')
});

//创建新的课程
masterRouter.post('/tasks/new', function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = "./dist/public/files";
    form.parse(req, function (err, fields, files) {
        let title = fields.title || '';
        let content = fields.descript || '';
        let start = fields.start || '';
        let end = fields.end || '';

        if (err) {
            throw err;
        }
        console.log(files)
        if (files.file) {
            let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
            let ran = parseInt(Math.random() * 89999 + 10000);
            let extname = files.file.name;
            //执行改名
            let oldpath = files.file.path
            //新的路径由三个部分组成：时间戳、随机数、拓展名
            // let newpath = __dirname + "../public/files/" + ttt + ran + extname;
            let newpath = path.normalize(__dirname + "/../../dist/public/files/" + ttt + ran + extname);
            let filePath = "/files/" + ttt + ran + extname;
            //改名
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    throw Error("改名失败");
                }
                creatTask({
                    title: title,
                    content: content,
                    file: filePath,
                    start: start,
                    end: end,
                }).then(function (doc) {
                    console.log('创建成功')
                    console.log(doc)
                    res.json({state: true, msg: '创建成功'})
                }).catch(function (err) {
                    res.json({state: false, msg: '创建失败'})
                })
            });
        } else {
            creatTask({
                title: title,
                content: content,
                start: start,
                end: end,
            }).then(function (doc) {
                console.log('创建成功')
                console.log(doc)
                res.json({state: true, msg: '创建成功'})
            }).catch(function (err) {
                res.json({state: false, msg: '创建失败'})
            })
        }
    })

})


//管理员管理用户
masterRouter.get('/users', function (req, res, next) {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    countUsers().then(function (count) {
        findUsersPage({page, limit}).then(function (users) {
            res.render('users', {users: users, count: count - 1, page: page})
        })
    })

});

masterRouter.get('/users/remove/:userid', function (req, res, next) {
    let objectJson = {'_id': req.params.userid}
    deleteUser(objectJson).then(function (result) {
        res.json({state: true, msg: '删除成功！'})
    }).catch(function (err) {
        res.json({state: false, msg: '删除失败！'})
    })
});
masterRouter.get('/users/find/:userid', function (req, res, next) {
    let objectJson = {'_id': req.params.userid}
    findUser(objectJson).then(function (user) {
        res.json({state: true, msg: '查找到用户！', user: user})
    }).catch(function (err) {
        res.json({state: false, msg: '删除失败！'})
    })

});
masterRouter.get('/password', function (req, res, next) {
    res.render('password')
});
masterRouter.post('/password', function (req, res, next) {
    console.log(req.body)
    let oldP = md5(req.body.oldPassword);
    let newP = md5(req.body.newPassword);
    let query = {_id: req.session.user._id}
    let updateJson = {password: newP}
    console.log(query)
    console.log(updateJson)
    if (oldP != req.session.user.password) {
        res.json({state: false, data: '', msg: '原密码错误！'})
    }
    updateUser(query, updateJson).then(function (result) {
        if (result.nModified == 0) {
            res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
        }
        res.json({state: true, data: '', msg: '修改成功！'})
    }).catch(function (err) {
        res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
    })
});

masterRouter.post('/users/password', function (req, res, next) {
    console.log(req.body)
    let query = {_id: req.body.uid}
    let updateJson = {password: md5(req.body.password)}
    console.log(query + updateJson)
    updateUser(query, updateJson).then(function (result) {
        if (result.nModified == 0) {
            res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
        }
        res.json({state: true, data: '', msg: '修改成功！'})
    }).catch(function (err) {
        res.json({state: false, data: '', msg: '原密码错误！请重新输入或者联系管理员修改密码！'})
    })
});
export default masterRouter

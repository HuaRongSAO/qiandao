import DBcontent from './../models/db'
DBcontent();

import TaskAndUsers from './../models/taskAndUsersModel'

export {createTaskAndUsers}

function createTaskAndUsers(json) {
    return TaskAndUsers({
        task_id: json.task_id,
        department: json.department,
        user: json.user
    }).save().then(function (doc) {
        console.log(doc)
        return doc
    }).catch(function (err) {
        console.log(err)
        throw err
    });
}


    createTaskAndUsers({
        task_id: '58ae7a6dc639da5aacfee11a',
        department: '一区',
        user: '58ae8b3eada21669c107c219'
    })

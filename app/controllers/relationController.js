import TaskAndUsers from './../models/taskAndUsersModel'

export {createTaskAndUsers,findRelation}

function createTaskAndUsers(json) {
    return TaskAndUsers({
        task_id: json.task_id,
        department: json.department,
        user_id: json.user_id,
        created_at: new Date()
    }).save().then(function (doc) {
        console.log(doc)
        return doc
    }).catch(function (err) {
        console.log(err)
        throw err
    });
}
function findRelation(json) {
    return TaskAndUsers.find(json)
}


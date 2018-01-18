import TaskAndUsers from './../models/taskAndUsersModel'

export {createTaskAndUsers,findRelation,updateRelation}

function createTaskAndUsers(json) {
    return TaskAndUsers({
        task_id: json.task_id,
        department: json.department,
        user_id: json.user_id,
        created_at: new Date()
    }).save().then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err)
        throw err
    });
}
function findRelation(json) {
    return TaskAndUsers.find(json).sort({_id: 1}).catch(function (err) {
        console.log(err);
        throw err
    })
}

function updateRelation(query,json) {
    return TaskAndUsers.where(query).update(json).catch(function (err) {
        console.log(err);
        throw err
    })
}


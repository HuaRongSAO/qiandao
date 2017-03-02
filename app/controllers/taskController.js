import Task from './../models/taskModel'
import sd from 'silly-datetime'


export {creatTask, findAllTask, findTask, findTaskByPage, countTask,deleteTaskById,findNewestTask}

//创建课程
function creatTask(json) {
    return Task({
        title: json.title,
        content: json.content,
        file: json.file,
        start:json.start,
        end: json.end,
        created_at: sd.format(new Date(), 'YYYY-MM-DD')
    }).save().catch(function (err) {
        console.log(err);
        throw err
    })
}

//查找任务
function findTask(json) {
    return Task.find(json).then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
function findNewestTask() {
    return Task.findOne().sort({_id: -1}).then(function (task) {
        return task
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
//发现所有的任务
function findTaskByPage({page = 0, limit = 20}) {
    let _skip =( page-1) * limit;
    return Task.find().limit(limit).skip(_skip).sort({_id: -1}).then(function (tasks) {
        return tasks
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
function findAllTask() {
    return Task.find().then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
function countTask() {
    return Task.find().count().then(function (count) {
        return count
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
//删除课程
function deleteTaskById(objectid) {
    return  Task.remove(objectid).catch(function (err) {
        console.log(err);
        throw err
    })
}

// countTask()
// Task.counts().then((count)=>(console.log(count)))
// findAllTask()
// taskPage()
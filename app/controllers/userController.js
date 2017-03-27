import User from './../models/userModel'

export {
    saveUser,
    findUser,
    findAllUser,
    countUsers,
    findUsersPage,
    deleteUser,
    updateUser,
    findUserWorkNumber
}
// 创建用户
function saveUser(json) {
    return User({
        username: json.username,
        password:json.password,
        work_number: json.work_number,
        department: json.department,
        jobname:json.jobname,
        role: 2,
        created_at: new Date(),
        updated_at: new Date()
    }).save().catch(function (err) {
        console.log('错 误' + err)
        throw err
    })
}
// 查询用户
function findUser(queryJson) {
    return User.find(queryJson).sort({_id: 1}).then(function (user) {
        return user
    }).catch(function (err) {
        console.log('错 误' + err)
        throw err
    })
}
// 查询所有用户
function findAllUser() {
    return User.find().sort({"work_number": 1}).then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log('错误' + err)
        throw err
    })
}

//分页查询用户
function findUsersPage({page = 1, limit = 20}) {
    let _skip = ( page - 1) * limit;
    return User.find().limit(limit).skip(_skip).sort({"work_number": 1}).then(function (users) {
        return users
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}

//统计用户总数
function countUsers() {
    return User.find().count().then(function (count) {
        return count
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}

//更新用户信息
function updateUser(query, json) {
    return User.where(query).update(json).then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}

//删除用户
function deleteUser(objectid) {
    return User.remove(objectid).then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
//查询用户最大的work_number
function findUserWorkNumber(queryJson) {
    return User.findOne({'role':2}).sort({"work_number": -1}).then(function (user) {
        return user.work_number
    }).catch(function (err) {
        console.log('错 误' + err)
        throw err
    })
}
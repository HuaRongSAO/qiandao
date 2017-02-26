import User from './../models/userModel'

export {
    saveUser,
    findUser,
    findAllUser,
    countUsers,
    findUsersPage,
    deleteUser
}
// 创建用户
function saveUser(json) {
    return User({
        username: json.username,
        password: json.password,
        work_number: 1,
        role: 0
    }).save().then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log(err)
        throw err
    });
}
// 查询用户
function findUser(queryJson) {
    return User.find(queryJson).then(function (user) {
        return user
    }).catch(function (err) {
        console.log('错 误' + err)
        throw err
    })
}
// 查询所有用户
function findAllUser() {
    return User.find().then(function (doc) {
        return doc
    }).catch(function (err) {
        console.log('错误' + err)
        throw err
    })
}

//分页查询用户
function findUsersPage({page = 1, limit = 20}) {
    let _skip = ( page - 1) * limit;
    return User.find().limit(limit).skip(_skip).then(function (users) {
        return users
    }).catch((err) => (console.log("查找用户：" + err)))
}

//统计用户总数
function countUsers() {
    return User.find().count().then(function (count) {
        return count
    }).catch((err) => (console.log("统计用户：" + err)))
}

//更新用户信息
function updateUser(json, updata) {
    return User.update(json).then(function (doc) {
        console.log(doc)
        return doc
    })
}

//删除用户
function deleteUser(objectid) {
    return User.remove(objectid).then(function (doc) {
        return doc
    }).catch((err) => (console.log("删除用户：" + err)))

}

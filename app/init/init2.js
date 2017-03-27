import User from './../models/userModel'
import DBcontent from './../models/db'
DBcontent();



import users from './data-2.json'
import md5 from 'md5'


for (let i = 0; i < users.length; i++) {

    User({
        username: users[i].username,
        password: md5('123456'),
        work_number: users[i].number,
        department: users[i].department,
        jobname: users[i].jobname,
        role: 2,
        created_at: new Date(),
        updated_at: new Date()
    }).save().then(function (doc) {
        console.log(i)

    }).catch(function (err) {
        console.log(err)
    });
}

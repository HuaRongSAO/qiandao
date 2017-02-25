import mongoose from 'mongoose'
import User from './userModel'

let taskAndUsersSchema = new mongoose.Schema({
    task_id: String,
    department: String,
    user_id: String,
    created_at: Date
});


let TaskAndUsers = mongoose.model('TaskAndUsers', taskAndUsersSchema)

export default TaskAndUsers
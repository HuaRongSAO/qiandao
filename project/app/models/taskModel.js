import mongoose from 'mongoose'

let taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    file: String,
    type: String,
    start:Date,
    end: Date,
    questions:Array,
    created_at: Date,
    updated_at: Date
});


let Task = mongoose.model('Task', taskSchema)

export default Task
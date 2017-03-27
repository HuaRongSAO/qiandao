import mongoose from 'mongoose'

let departmentSchema = new mongoose.Schema({
    name: String,
    number:Number
});


let Department = mongoose.model('Department', departmentSchema)

export default Department
import mongoose from 'mongoose'

let fileSchema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: String,
    child: String,
    url: String,
    image:String,
    descript:String,
    backgroundColor:String,
    date: Date
});


let File = mongoose.model('File', fileSchema)

export default File
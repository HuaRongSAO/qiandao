import mongoose from 'mongoose'

let classifySchema = new mongoose.Schema({
    name: {type: String, required: true},
    belong: String,
});


let Classify = mongoose.model('Classify', classifySchema)

export default Classify
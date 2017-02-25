import mongoose from 'mongoose'
let url = 'mongodb://localhost:27017/qiaodao';
mongoose.Promise = Promise;
export default function () {
    mongoose.Promise = global.Promise
    mongoose.connect(url)
}
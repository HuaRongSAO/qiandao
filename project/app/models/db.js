import mongoose from 'mongoose'

let url = 'mongodb://localhost:27017/qiandao'
mongoose.Promise = Promise
export default function () {
  mongoose.Promise = global.Promise
  mongoose.connect(url, {useMongoClient: true})
  return mongoose
}
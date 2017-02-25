import mongoose from 'mongoose'


let userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    work_number: String,
    department:String,
    birthday:Date,
    job:String,
    jobname:String,
    role: Number,
    belong:String,
    number:Number,
    created_at: Date,
    updated_at: Date
});

// 在Schema里添加自定义方法
userSchema.methods.capitalizeName = function () {
    this.name = this.name.toUpperCase();
    return this.name;
};

let User = mongoose.model('User', userSchema)

export default User
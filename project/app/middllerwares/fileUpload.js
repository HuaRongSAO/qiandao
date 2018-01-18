import  formidable from 'formidable'
import  util from 'util'
import fs from 'fs'
import path from 'path'
import sd from 'silly-datetime'


export default function uploadFile(req, callback) {
    let form = new formidable.IncomingForm();
    form.uploadDir = "./dist/public/files";
    let taskInfo = null, filePath = null;
    return form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        taskInfo = fields;
        let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
        let ran = parseInt(Math.random() * 89999 + 10000)
        let extname = files.file.name
        //执行改名
        let oldpath = files.file.path
        //新的路径由三个部分组成：时间戳、随机数、拓展名
        // let newpath = __dirname + "../public/files/" + ttt + ran + extname;
        let newpath = path.normalize(__dirname + "/../../dist/public/files/" + ttt + ran + extname);
        let filePath = "/files/" + ttt + ran + extname;
        //改名
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw Error("改名失败");
            }

            console.log(taskInfo, filePath)
            return {taskInfo, filePath}
        })
    })

}

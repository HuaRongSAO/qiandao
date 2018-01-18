
//组合数组
export function setArray(users,finish) {
    let user = {}
    let a = []
    let b = []
    let isSame =false;
    for (let i=0;i<users.length;i++){
        for(let j=0;j<finish.length;j++){
            if(users[i]._id == finish[j].user_id){
                isSame = true
                break
            }
        }
        if(isSanme){
            a.push(users[i])
            isSame = false
        }else {
            b.push(users[i])
        }
    }
    for(var i in a){
        b.push(a[i]);
    }
    console.log(b.length)
    return b
}

export default setArray


import users from './users.json'
let departments = [];
let flag = false;
var k=0;
for(let i=0;i<users.length;i++){
    departments.push(users[i].department)
}

function unique(arr){
    var tmp = new Array();

    for(var m in arr){
        tmp[arr[m]]=1;
    }
    var tmparr = new Array();

    for(var n in tmp){
        tmparr.push(n);
    }
    return tmparr;
}

console.log(unique(departments))
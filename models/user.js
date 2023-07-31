const db = require('../util/datbase');

const User = class User{
constructor(name,email,number,dob,imageUrl,gender,password){
    this.name=name;
    this.email=email;
    this.number=number;
    this.dob = dob;
    this.imageUrl =imageUrl;
    this.gender = gender;
    this.password =password;
}

save(){
    return db.execute('INSERT INTO users(name,email,number,dob,imageUrl,gender,password) VALUES (?,?,?,?,?,?,?)',[this.name,this.email,this.number,this.dob,this.imageUrl,this.gender,this.password]);
}
static newFriend(id){
    return db.execute('select id,name,imageUrl from users where id not in(select fid from thisuserfriend where uid=?)',[id]);
}
static findAll(){
    return db.execute('select * from users');
}
static findById(id){
    return db.execute('select * from users where id= ?',[id]);
}
static update(id,name,email,number,dob,imageUrl,gender,password){
    return db.execute('update users set users.name=? ,users.email = ?,users.number=?,users.dob=?,users.imageUrl=?,users.gender=?,users.password=? where id = ? ',
    [name,email,number,dob,imageUrl,gender,password,id]);
}
static delete(id){
    return db.execute('delete from users where users.id = ?',[id]);
}
static login(name,password){
    return db.execute('select * from users where users.name= ? and users.password = ?',[name,password]);
}
}
module.exports = User ;

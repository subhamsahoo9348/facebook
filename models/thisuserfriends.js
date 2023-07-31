const db = require('../util/datbase');

const UserFriend = class UserFriend{
constructor(fid,name,imageUrl,uid){
    this.fid=fid;
    this.name=name;
    this.imageUrl =imageUrl;
    this.uid=uid;
}

save(){
    return db.execute('INSERT INTO thisuserfriend(fid,name,imageUrl, uid) VALUES (?,?,?,?)',[this.fid,this.name,this.imageUrl,this.uid]);
}
static findAll(uid){
    return db.execute('select * from thisuserfriend where uid=?',[uid]);
}
static remove(fid,uid){
    return db.execute('delete from thisuserfriend where fid=? and uid=?',[fid,uid]);
}
};

module.exports = UserFriend;
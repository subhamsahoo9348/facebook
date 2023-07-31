const User = require("../models/user");
const UserFriend = require("../models/thisuserfriends");

exports.getHome = async (req, res) => {
  const [user] = await User.findAll();
  res.render("home", { title: "Home", path: "/home", user: user });
};
exports.getVideo = (req, res) => {
  res.render("video", { title: "Video", path: "/video" });
};
exports.getFriend = async (req, res) => {
  const uid = req.user[0][0].id;
const [list] = await User.newFriend(uid);
res.render("friends", { title: "Friends", path: "/friend",friend: list});
};
exports.getLogin = (req, res) => {
  res.render("login", { title: "Log In", path: "/login" });
};
exports.getSign = (req, res) => {
  res.render("signup", { title: "Sign Up", path: "/signup" });
};
exports.postLogin = async (req, res) => {
  const userName = req.body.user;
  const password = req.body.password;
  const [user] = await User.login(userName,password);
  if(user[0]){
  req.session.user = user;
  req.session.isLog = true;
  res.redirect('/');
  }else{
    req.session.isLog = false;
    res.redirect('/login');
  }
  
};
exports.postSign = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const number = req.body.number;
  const dob = req.body.dob;
  const email = req.body.email;
  const imageUrl = req.body.imageUrl;
  const gender = req.body.gender;
  const user = new User(name,email,number,dob,imageUrl,gender,password);
  await user.save();
  res.redirect("/login");
};
exports.getProfile = async(req,res)=>{
  const uid = req.user[0][0].id;
  const users = req.user[0];
  const userName = users[0].name;
  const password = users[0].password;
  const [user] = await User.login(userName,password);
  const [friend] = await UserFriend.findAll(uid);
  res.render("profile", { title: "Profile", path: "/profile", user: user[0],friend: friend });
}
exports.postAddFriend = async (req,res)=>{
  const uid = req.user[0][0].id;
  const fid = req.params.fid;
  const [user] = await User.findById(fid);
  const name = user[0].name;
  const imageUrl = user[0].imageUrl;
 const friend =  new UserFriend(fid,name,imageUrl,uid);
  await friend.save();
  res.redirect('/friends');
};
exports.postRemoveFriend = async (req,res)=>{
  const fid = req.params.fid;
  const uid = req.user[0][0].id;
  await UserFriend.remove(fid,uid);
  res.redirect('/profile');
};
exports.logout=(req,res)=>{
  req.session.destroy((err)=>{
  console.log(err);
  res.redirect('/login');
})
}
exports.get404 = async(req, res) => {
  res.render("404", { title: "404", path: "/" });
};

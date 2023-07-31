const User = require("../models/user");
const path = require('path');

exports.getAdmin = async (req, res) => {
    const [user] = await User.findAll()
    res.render("admin", {
          path: "/admin",
          users: user,
          title: "Admin",
        });
  };

  exports.postDelete = async (req, res) => {
    const id = req.params.userId;
    await User.delete(id)
    res.redirect("/admin");
  };
  exports.getUpdate = async (req, res) => {
    const id = req.params.userId;
    const [user] = await User.findById(id);
    res.render("update", { title: "Update", path: "",user:user[0]});
  };
  exports.postUpdate = async (req, res) => {
    const id = req.params.userId;
    const name = req.body.name;
    const password = req.body.password;
    const number = req.body.number;
    const dob = req.body.dob;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
    const gender = req.body.gender;
    await User.update(id,name,email,number,dob,imageUrl,gender,password);
    res.redirect(req.baseUrl);
  };
  exports.getLogAdmin = (req,res)=>{
    res.render("adminLogin", {
      path: "/admin",
      title: "Admin"
    });
  };
  exports.postLogIn = (req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    if( name === "subham" && password === 'suvam123'){
      res.redirect('/admin')
    }
    else{

    }
  };
  
const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const path = require("path");
const homeRouter = require("./routes/home");
const adminRouter = require("./routes/admin");
const error = require("./controller/home");
const homeController = require("./controller/home");
const User = require('./models/user')
const session = require('express-session')
const mySQLStore = require('express-mysql-session')(session)
const options = {               
  host: 'localhost',
  user: 'root',
  password: 'suvam123',
  database: 'facebook1',
};

const sessionStore = new mySQLStore(options);

app.use(
  session({
      secret: 'cookie_secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,    
  })
);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({ extended: false }));

app.use(
  (req, res, next) => {
     if( ! req.session.user){
        return  next();
     }
     User.findById(
         req.session.user[0].id
         )
     .then(
         user=>{
             req.user = user;
             next();
         }
     )
 }
)
app.use((req,res,next)=>{
  res.locals.isAuth = req.session.isLog;
  next();
})

app.use("/admin", adminRouter);
app.use("/", homeRouter);
app.use("/", error.get404);


app.listen(5000);
  
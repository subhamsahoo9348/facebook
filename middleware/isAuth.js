module.exports = (req,res,next)=>{
    if( ! req.session.isLog){
        return res.redirect('/login');
    }
    next();
}
var express = require("express");
var router = express.Router();

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/about', (req, res) => {
    if(req.session.user){
        res.render('about', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard2', (req, res) => {
    if(req.session.user){
        res.render('dashboard2', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard3', (req, res) => {
    if(req.session.user){
        res.render('dashboard3', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard4', (req, res) => {
    if(req.session.user){
        res.render('dashboard4', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('login', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;
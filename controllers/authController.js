const {Router} = require('express');
const authService = require('../services/authService');
const router = Router();
const cookieName = 'USER_SESSION';
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const validator = require('validator');
const User = require('../models/user');

let isStrongPasswordMiddleware = function(req, res, next){
    let password = req.body.password;
    let isStrongPassword = validator.isStrongPassword(password, [{
        minLength: 5,
    }])
    if (!isStrongPassword) {
        return res.render('register', { error: {message: 'You must choose a stronger password!'}, username: req.body.username})
    }
    next();
}

router.get('/login', isGuest, (req, res) => {
    res.render('login');
})
router.post('/login',isGuest,async (req, res)=>{
    const {username, password} = req.body;

    try {
        let token = await authService.login({username, password})

        res.cookie(cookieName, token);
        res.redirect('/')
    } catch (error) {
        res.render('login', {error})
    }
})

router.get('/register',isGuest,(req, res) => {
    res.render('register', {title: 'Register user'});
})

router.post('/register',isGuest, async (req, res) => {
    const {email, username, password, rePassword } = req.body;
    if(password !== rePassword){
        res.render('register', {error: {message:'Passwords do not match!'}});
        return;
    }
    try {
        let user = await authService.register({username, password, email});
        try {
            let token = await authService.login({username, password})
    
            res.cookie(cookieName, token);
            res.redirect('/')
        } catch (error) {
            res.render('login', {error})
        } 
    } catch (err) {
        let error = Object.keys(err.errors).map(x => ({message: err.errors[x].message}))[0];

        res.render('register',  {error});
        return;
    }
})
router.get('/logout', isAuthenticated, (req, res)=>{
    res.clearCookie(cookieName);
    res.redirect('/')
})
router.get('/profile',isAuthenticated, (req, res) => {
    res.render('profile', {title: 'User profile', ...req.user});
})
module.exports = router;
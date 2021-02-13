const {Router} = require('express');
const authService = require('../services/authService');
const router = Router();
const cookieName = 'USER_SESSION';
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
//ВНИМАВАЙ С PATHNAME - ПРОМЕНИ ГИ В ПАПКА VIEWS СЛЕД КАТО ГИ ПОЛУЧИШ!!!
//ВТОРИЯТ ПАРАМЕТЪР НА .GET Е MIDDLEWARE - ВНИМАВАЙ ДАЛИ ГО ИЗПОЛЗВАШ!

router.get('/login', isGuest, (req, res) => {
    res.render('login');
})
router.post('/login',isGuest, async (req, res)=>{
    const {username, password} = req.body;

    try {
        let token = await authService.login({username, password})

        res.cookie(cookieName, token);
        res.redirect('/products')
    } catch (error) {
        res.render('login', {error})
    }
})

router.get('/register',isGuest, (req, res) => {
    res.render('register')
})

router.post('/register',isGuest, async (req, res) => {
    const {username, password, repeatPassword } = req.body;

    if(password !== repeatPassword){
        res.render('register', {message: 'Passwords do not match!'});
        return;
    }
    try {
        let user = await authService.register({username, password});
        res.redirect('/auth/login')
    } catch (error) {
        res.render('register', {error})
        return;
    }
})
router.get('/logout', isAuthenticated, (req, res)=>{
    res.clearCookie(cookieName);
    res.redirect('/products')
})
module.exports = router;
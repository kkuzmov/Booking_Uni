const {Router} = require('express');
const authService = require('../services/authService');
const router = Router();
const cookieName = 'USER_SESSION';
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
//ВНИМАВАЙ С PATHNAME - ПРОМЕНИ ГИ В ПАПКА VIEWS СЛЕД КАТО ГИ ПОЛУЧИШ!!!
//ВТОРИЯТ ПАРАМЕТЪР НА .GET Е MIDDLEWARE - ВНИМАВАЙ ДАЛИ ГО ИЗПОЛЗВАШ!

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login',async (req, res)=>{
    const {username, password} = req.body;

    try {
        let token = await authService.login({username, password})

        res.cookie(cookieName, token);
        res.redirect('/')
    } catch (error) {
        res.render('login', {error})
    }
})

router.get('/register',(req, res) => {
    res.render('register', {title: 'Register user'});
})

router.post('/register', async (req, res) => {
    const {email, username, password, rePassword } = req.body;
    if(password !== rePassword){
        res.render('register', {error: {message:'Passwords do not match!'}});
        return;
    }
    try {
        let user = await authService.register({username, password});
        try {
            let token = await authService.login({username, password})
    
            res.cookie(cookieName, token);
            res.redirect('/')
        } catch (error) {
            res.render('login', {error})
        } 
        // res.redirect('/auth/login')
    } catch (error) {
        res.render('register', {error})
        return;
    }
})
router.get('/logout', (req, res)=>{
    res.clearCookie(cookieName);
    res.redirect('/')
})
router.get('/profile', (req, res) => {
    res.render('profile', {title: 'User profile'});
})
module.exports = router;
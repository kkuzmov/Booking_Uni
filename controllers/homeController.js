//CHECKED!!!
const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(hotels =>{
            hotels = hotels.sort((a,b) => b['free-rooms'] - a['free-rooms']);
            res.render('home', { hotels })
        })
})


module.exports = router


// HOME CONTROLLER - ЗАРЕЖДА HOME И ABOUT PAGES
// ЧАСТ ОТ EXAM PACKAGE
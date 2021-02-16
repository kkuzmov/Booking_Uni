//CHECKED!!!
const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(hotels =>{
            hotels = hotels.sort((a,b) => b.freeRooms - a.freeRooms);
            res.render('home', {title: 'Hotels', hotels })
        })
})


module.exports = router


// HOME CONTROLLER - ЗАРЕЖДА HOME И ABOUT PAGES
// ЧАСТ ОТ EXAM PACKAGE
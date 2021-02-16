// CHANGE FILE/FOLDER NAMES

const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper');

router.get('/add-hotel', isAuthenticated, (req, res) => {
    res.render('create', {title: 'Add a hotel'})
})
router.post('/add-hotel', (req, res) => {
    let dataToSend = {...req.body, owner: req.user._id};
    productService.createHotel(dataToSend)
        .then(response =>{
            res.redirect('/');
        })    
        .catch(err =>{console.log(err)})
})
router.get('/:productId/details', (req, res)=>{
    // res.render('details', {id: req.params.productId}); - трябва да извиква хотел от базата и да го слага в Options
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;
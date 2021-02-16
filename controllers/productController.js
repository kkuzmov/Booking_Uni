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
router.get('/:productId/details', isAuthenticated, (req, res)=>{

    productService.getOne(req.params.productId)
        .then(hotel =>{
            let isCreator = req.user._id === hotel.owner;

            res.render('details', {...hotel, isCreator});
        })
})
router.get('/:productId/book', (req, res)=>{
        productService.getOne(req.params.productId)
            .then(hotel =>{
               hotel.usersBookedARoom.push(req.user._id);
               hotel.freeRooms--;
               productService.updateOne(req.params.productId, hotel)
                .then(response =>{
                    console.log(response)
                    res.redirect('/')
                })
            })
            .catch(err=>console.log(err))
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;
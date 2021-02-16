// CHANGE FILE/FOLDER NAMES

const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper');
const Hotel = require('../models/hotel');
router.get('/add-hotel', isAuthenticated, (req, res) => {
    res.render('create', {title: 'Add a hotel'})
})
router.post('/add-hotel',isAuthenticated, (req, res) => {
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
            let alreadyBooked = hotel.usersBookedARoom.includes(req.user._id);
            res.render('details', {title: 'Hotel details', ...hotel, isCreator, alreadyBooked});
        })
})
router.get('/:productId/book',isAuthenticated, (req, res)=>{
        productService.getOne(req.params.productId)
            .then(hotel =>{
               hotel.usersBookedARoom.push(req.user._id);
               hotel.freeRooms--;
               productService.updateOne(req.params.productId, hotel)
                .then(response =>{
                    res.redirect('/')
                })
            })
            .catch(err=>console.log(err))
})
router.get('/:productId/edit', isAuthenticated,(req, res)=>{
    productService.getOne(req.params.productId)
        .then(hotel =>{
            res.render('edit', {title: 'Edit hotel', ...hotel})
        })
})
router.post('/:productId/edit',isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
            .then(hotel =>{
               hotel = req.body;
               productService.updateOne(req.params.productId, hotel)
                .then(response =>{
                    res.redirect(`/products/${req.params.productId}/details`);
                })
            })
            .catch(err=>console.log(err))
})


module.exports = router;
// CHECK NAMES/PARAMETERS

const Hotel = require('../models/hotel');

async function getAll(query){
    let products = await Hotel.find({}).lean()


    if(query.search){
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }
    if(query.from){
        products = products.filter(x => Number(x.level) >= query.from);
    }
    if(query.to){
        products = products.filter(x => Number(x.level) <= query.to);
    }
    return products;
}
async function getOne(id){
    return Hotel.findById(id).lean();
}
 
function createHotel(data){
    let hotel = new Hotel({...data});
    return hotel.save()
}
// async function attachAccessory(productId, accessoryId){
//     let product = await Cube.findById(productId)
//     let accessory = await Accessory.findById(accessoryId)
//     product.accessories.push(accessory);
//     return product.save()
// }
// function getOneWithAccessories(id){
//     return Cube.findById(id).populate('accessories').lean();
// }
function updateOne(productId, productData){
    return Hotel.updateOne({_id: productId}, productData)
 }
 function deleteOne(productId){
     return Hotel.deleteOne({_id: productId})
 }
module.exports = {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createHotel
}
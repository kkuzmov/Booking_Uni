// CHECK NAMES/PARAMETERS


const Accessory = require('../models/accessory');

function create(data){
    // НЯМА ДА Е ACCESSORY!
let accessory = new Accessory(data);

return accessory.save()
}
function getAll(){
    // НЯМА ДА Е ACCESSORY
    return Accessory.find().lean();
}
function getAllWithout(ids){
    // НЯМА ДА Е ACCESSORY
    return Accessory.find({_id: {$nin: ids }}).lean()
}

module.exports = {
    create,
    getAllWithout,
    getAll,
}
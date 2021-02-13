const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config')
const {SALT_ROUNDS} = require('../config/config');


async function register({username, password}) {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);   
    const user = new User({username,password: hash}); 
    return await user.save();
}
async function login({username,password}){
    let user = await User.findOne({username})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Passwords do not match!'};
    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)

    return token
}

module.exports = {
    register,
    login
}
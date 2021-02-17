const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config');

async function register({username, password, email}) {
    let user = await User.findOne({username});
    if(!user){
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);   
    const user = new User({username, password: hash, email}); 
    return await user.save();
    }else {
        throw {message: 'Username already exists!'};
    }
    
}
async function login({username,password}){
    let user = await User.findOne({username})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Password incorrect!'};
    let token = jwt.sign({_id: user._id, username: user.username, email: user.email}, SECRET)

    return token;
}

module.exports = {
    register,
    login
}
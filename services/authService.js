const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config')

async function register({username, password, email}) {  
    let userExists = await User.findOne({username})
    if(!userExists){
        const user = new User({username,password, email}); 
        return await user.save();
    }else{
        throw {message: 'Username already in use!'};
    }
    
}
async function login({username,password}){
    let user = await User.findOne({username})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Password incorrect!'};
    let token = jwt.sign({_id: user._id, username: user.username, email: user.email}, SECRET)

    return token
}

module.exports = {
    register,
    login
}
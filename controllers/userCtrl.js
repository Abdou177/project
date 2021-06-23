const users = require('../modules/userModel');
const bcrypt = require('bcrypt');
// Require the json web token
const jwt = require('jsonwebtoken');
const userCtrl = {
    register: async (req,res)=>{
        try {
            const {name, email, password} = req.body;
            const user = await users.findOne({email})
            if(user)
            return res.status(400).json({msg: 'the eamil already exists .....'})
            if (password.length<8)
            return res.status(400).json({msg: 'Password is at least 8 characters long..'})

            // Password Encrption 
            const passwordhash = await bcrypt.hash(password, 10);
            const newUser = new users({name, email, password: passwordhash})
            // Save new user from mongodb
            await newUser.save();
            return res.status(200).json({msg: 'uwser register with succes',newUser})
        } catch (error) {
            return res.status(500).json({msg: 'errer server'});
            
        }
    },
    login: async (res,req)=>{
        try {
            // checking existing user
            let user = await users.findOne({email});
            if (!user){
                return res.status(400).json({msg: 'bad Credentials!!!'});
            }
            // checking password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({msg :'Bad Credentials!!!!!'});
            }
            // sing user
            const payload ={
                id: user._id,
            };
            // generate token 
            const token = await jwt.sign(payload,{
                expiresIn: '7 hours',
            });
            res.status(200).json({msg:'logged in with success',user,token});
        } catch (error) {
            res.status(500).json({msg:'error server'});
        }
    }
}
module.exports = userCtrl
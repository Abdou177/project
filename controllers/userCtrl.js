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
            if (password.length<8){
              return res.status(400).json({msg: 'Password is at least 8 characters long..'});
            }
            

            // Password Encrption 
            const passwordhash = await bcrypt.hash(password, 10);
            const User = new users({name, email, password: passwordhash})
           
            // Save new user from mongodb
            await User.save();
            return res.status(200).json({msg: 'user register with succes',User})
           }
         catch (error) {
            return res.status(500).json({msg: 'errer server'});
            
        }
    },
    login: async (req,res)=>{
        const {email, password} = req.body;
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
            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: "errer server"})
        }
    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = userCtrl
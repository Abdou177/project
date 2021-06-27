const router = require('express').Router();
const userCtrl =require('../controllers/userCtrl');

router.post('/register',userCtrl.register),
router.post('/login',userCtrl.login),
router.get('/getUser', userCtrl.getUser)



module.exports = router
const Router = require('express').Router();
const categoryCtrl =require('../controllers/categoryCtrl');
const router = require('./userRouter');


router.post('/createCategory',categoryCtrl.createCategory);
module.exports = router
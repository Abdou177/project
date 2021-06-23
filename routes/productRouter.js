const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');

// connect to data base  app.post('/user/all', function(req, res){ Controller.Create});

router.post('/products',function (req, res){productCtrl.CreateProduct});


module.exports = router
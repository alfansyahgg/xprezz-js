var express = require('express');
var router = express.Router();
var multer = require('multer');
var path          = require('path');

var currentTime = new Date()
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()

const storage = multer.diskStorage({    
	destination : path.join(__dirname  , '../public/images/'),    
	filename: function(req, file, cb){
		cb(null, year.toString() + month.toString() + day.toString() + '_' + file.originalname);
	    }});

const upload = multer({
	storage : storage}).array('pictures',10);

router.get('/', function(req, res, next) {
  res.render('uploadimage')
});


router.post('/uploadGambar', function(req, res, next) {
	upload(req,res,err =>{
		if(err){
			res.json({status:false,message:err.toString()})
			return;
		}

		res.json({status:true,message:'Success!'})
	});
});

module.exports = router;

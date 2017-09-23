var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', ensureAuthenticated,  function(req, res) {
	res.render('home');
});
/*
router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(req, res){
	if(req.body.action == 'login') {
		res.render('success');
		console.log(req.body.action);
		console.log(req.body.mail);
		console.log(req.body.pwd);
	} else if (req.body.action == 'register') {
		res.redirect('/register');
	} else {
		res.render('404');
	}
});

router.get('/register', function(req, res) {
	res.render('register');
});*/

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}


module.exports = router;

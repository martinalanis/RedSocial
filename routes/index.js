var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "RED SOCIAL" });
});

router.get('/registro', (req, res) => {
  res.render('register', { title: "RED SOCIAL" });
});

router.post('/register', (req, res) => {
	res.render('home');
});

router.get('/home', function(req, res){
	res.render('home', {
		email: req.body.email,
		pw: req.body.pw
	});
});

module.exports = router;

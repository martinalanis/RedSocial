'use strict'

var express = require('express');
var router = express.Router();


// var auth = function(req, res, next) {
// 	if(req.session )
// 		return next();
// 	else
// 		return res.render('index', {
// 			msg: "Necesitas iniciar sesión"
// 		});
// };

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/index', function(req, res, next) {
	res.render('index', {msg: req.session.msg});
});

router.get('/registro', (req, res) => {
	res.render('register',{ error: req.session.error});
});

router.post('/home', (req, res) => {
	res.render('home');
});

router.post('/register', (req, res) => {

	var u = req.body;

	if(u.pw == u.pw_confirm){
		
		var passCrypt = crypting(u.name, u.pw);

		db.User.findOne({ email: u.email}, function(error, user){

			if(!user) {

				let newUser = new db.User({

					name: u.name,
					paterno: u.paterno,
					materno: u.materno,
					email: u.email,
					password: passCrypt

				});

				newUser.save(function(error, user) {

					if(error) res.render('register', {
						error : "Ha ocurrido un error"
					});

						res.render('index', {
							msg : "Usuario creado con exito"
						});


					});			

			}else{
				res.render('register', {
					error : "El usuario ya existe"
				});
			}

		});

		

	}else{

		res.render('register', {
			error: 'La comprobación de contraseña no coincide'
		});

	}
	// res.render('register', { title: check});

});

router.post('/login', (req, res) => {

	db.User.findOne({email: req.body.email}, function(error, user){
		if(user){
			let pass = crypting(user.name, req.body.pw);
			if(user.password == pass) {
				req.session.name = user.name + ' ' + user.paterno + ' ' + user.materno;
				req.session.email = user. email;
				res.redirect('/home');
			}else{
				req.session.msg = 'Datos incorrectos';
				res.redirect('/index');
			}
		}else{
			req.session.msg = 'Datos incorrectos';
			res.redirect('/index');
		}
	});

});

router.get('/home', function(req, res){
	if(req.session.name){
		res.render('home', {
			email: req.session.email,
			name: req.session.name
		});
	}else{
		res.render('index', {
			msg: "Necesitas iniciar sesión"
		});
	}
	
});

router.get('/logout', (req, res) => {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	})
})

function crypting(user, pass) {
	var crypto = require('crypto');
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');
   return hmac;
}

module.exports = router;

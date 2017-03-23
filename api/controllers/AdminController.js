/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	connection: 'sqlserver',
	create: function(req, res, next)
	{
		//console.log("sdfgh");
		var objeto = {
			//id_adm: req.param('id_adm'),
			cedula: req.param('cedula'),
			contrasena: req.param('contrasena'),
		}
		Admin.create(objeto, function usuarioCreated(err,Admin)
		{
			if (err) return next(err);
			//res.redirect('/usuario/usuarioRegistrado/'+Usuario.IDUsuario);
		});
		function mandalo(a) 
		{
			Admin.findOne({Username: a}, function usuarioMandalo(err,user)
			{
				if (err) return next(err);
				if (!Admin) return next();
				res.redirect('dashboard.ejs');
				//res.redirect('/usuario/usuarioRegistrado/'+user.IDUsuario);
			})
		}
	},
	perfil: function(req,res,next){
		Admin.findOne({cedula:req.param('cedula')}).exec(function(err, resultado){
			if(resultado !== undefined)
			{
				console.log(req.param('contrasena'));
				console.log(resultado.contrasena);
				if (resultado.contrasena == req.param('contrasena')){
					console.log('heyyyyyy');}
					//res.view({Admin: resultado});
				    //res.redirect('/dashboard');}

				else{console.log("la contrasena es invalida");}

			}


			
			else
				{
					console.log("el usuario no existe");
				}
			
		});
	}
};


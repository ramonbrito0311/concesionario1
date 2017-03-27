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
				console.log("hdhai");
				if (err) return next(err);
				if (!Admin) return next();
			})
		}
	},
	perfil: function(req,res,next){

		Admin.findOne({cedula:req.param('cedula')}).exec(function(err, resultado){
			Admin.query('select contrasena from Admin where cedula =' + req.param('cedula') +';', function(err, results){
				

			if(resultado !== undefined)
			{
				console.log(req.param('contrasena'));
				console.log(resultado.contrasena);
                if (req.param('contrasena') == resultado.contrasena){
					console.log('heyyyyyy');
					res.redirect('dashboard');}



				else{console.log("la contrasena es invalida");}
			}

			else
				{
					console.log("el usuario no existe");
				}

             });
			
			
			
		});
	}
};


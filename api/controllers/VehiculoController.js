/**
 * VehiculoController
 *
 * @description :: Server-side logic for managing vehiculoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	connection: 'sqlserver',
	ver: function(req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado){
		console.log(req.param('cedula'));
		res.redirect('vehiculo/create/' +resultado.id_cli);
		});
		
	},
	create: function(req, res, next)
	{
		
		//console.log("sdfgh");
		res.view('registrarVehiculo');
			
			var objeto = {
			//id_vehiculo: req.param('id_vehiculo'),
			tipo: req.param('tipo'),
			placa: req.param('placa'),
			registro: req.param('registro'),
			cilindrada: req.param('cilindrada'),
			marca: req.param('marca'),
			modelo: req.param('modelo'),
			ano: req.param('ano'),
			id_cli: req.param('id_cli')
		}
		Vehiculo.create(objeto, function vehiculoCreated(err,Admin)
		{
			if (err) return next(err);
			//res.redirect('/usuario/usuarioRegistrado/'+Usuario.IDUsuario);
		});
		function mandalo(a) 
		{
			Vehiculo.findOne({placa: a}, function vehiculoMandalo(err,user)
			{
				if (err) return next(err);
				if (!Vehiculo) return next();
				//res.redirect('dashboard.ejs');
				//res.redirect('/usuario/usuarioRegistrado/'+user.IDUsuario);
			});
		}
			
		
		//var id_clie = localStorage.getItem('id_clie');
		
	}
};


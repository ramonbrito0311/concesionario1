/**
 * VehiculoController
 *
 * @description :: Server-side logic for managing vehiculoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	connection: 'sqlserver',
	registrarVehiculo: function(req, res, next){
		console.log(req.param('cedula'));
		Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado){

		console.log(resultado.id_cli);
		res.view('registrarVehiculo', {Cliente: resultado});
		//res.redirect('/registrarVehiculo?id_cli='+resultado.id_cli);
		//res.view({Cliente: resultado.id_cli});
		//res.redirect('vehiculo/create/' +resultado.id_cli);
		});
	},
	
	create: function(req, res, next)
	{
		/*Cliente.findOne({cedula: req.param('id_cli')}).exec(function (err, resultado){
		console.log(resultado.id_cli);
		//res.redirect('registrarVehiculo.ejs');
		//res.view({Cliente: resultado.id_cli});
		//res.redirect('vehiculo/create/' +resultado.id_cli);
		});*/
		//console.log("sdfgh");
		//res.view('registrarVehiculo');
			/*Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
				
			console.log(req.param('cedula'));
			console.log(Cliente.id_cli);
		});*/
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


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
		if (resultado !== undefined){
			console.log(resultado.id_cli);
			res.view('registrarVehiculo', {Cliente: resultado});
		}else{res.redirect("/dashboard");}
		});
	},


	create: function(req, res, next)
	{
		
			var objeto = {
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
			else res.redirect('/dashboard');
		});
		function mandalo(a) 
		{
			Vehiculo.findOne({placa: a}, function vehiculoMandalo(err,user)
			{
				if (err) return next(err);
				if (!Vehiculo) return next();
			});
		}

		
	},


	cuadroCliente:  function(req,res,next){
		console.log(req.param('cedula'));
		Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado){
		if (resultado !== undefined){
			console.log(resultado.id_cli);
			Cliente.query('SELECT a.nombre, a.cedula, b.marca, b.modelo, b.placa, b.ano, b.id_vehiculo FROM Cliente a INNER JOIN Vehiculo b ON a.id_cli = b.id_cli WHERE a.cedula ='+resultado.cedula+';'
			, function (err, result){
				if (err) return res.serverError(err);
				var string = JSON.stringify(result);
				var json = JSON.parse(string);
				resultado.Cliente = json;
				console.log(json);
				res.view({Cliente: resultado.Cliente, Cli: resultado});

			});
		}else{
			res.redirect("/verDetallesCliente");
		}
		});
	}
};


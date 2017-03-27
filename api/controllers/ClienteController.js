/**
 * ClienteController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	connection: 'sqlserver',
	create: function(req, res, next)
	{
		Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
			if (resultado===undefined){
			var objeto = {
			//id_cli: req.param('id_cli'),
			cedula: req.param('cedula'),
			nombre: req.param('nombre'),
			correo: req.param('correo'),
			direccion: req.param('direccion'),
			telefono: req.param('telefono'),
			contrasena: req.param('contrasena')
			}
		//console.log(id_cli);
		Cliente.create(objeto, function clienteCreated(err,Admin)
		{
			console.log(req.param('cedula'));
			if (err) return next(err);
			//else{return res.view('/Vehiculo/registrarVehiculo',{objeto});}
			else {res.redirect('/Vehiculo/registrarVehiculo?cedula='+req.param('cedula'));}
		});
		/*function mandalo(a) 
		{
			Cliente.findOne({cedula: a}, function clienteMandalo(err,user)
			{
				if (err) return next(err);
				if (!Cliente) return next();
				console.log(req.param('cedula'));
				
				//res.redirect('dashboard.ejs');
				//res.redirect('/usuario/usuarioRegistrado/'+user.IDUsuario);
			});
		}*/
		
		//res.redirect('/registrarVehiculo');
			}else{console.log("el cliente ya existe!"); res.redirect('/registrarCliente');}
		});
		//console.log("sdfgh");
		
		//localStorage.setItem("id_clie", req.param('id_cli'));
		//res.redirect('/Vehiculo/create/'+req.param('id_cli'));
	},
	asignar: function(req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
			if (resultado!==undefined){
				//cedula: req.param('cedula');
				res.redirect('/Vehiculo/registrarVehiculo?cedula='+req.param('cedula'));
			}else{console.log("el cliente NO existe!"); res.redirect('/buscarCliente');}
		});
	},
	buscar: function (req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
			if (resultado!==undefined){
				res.redirect('/Vehiculo/cuadroCliente?cedula='+req.param('cedula'));
				//AQUI HAY QUE REDIRIGIR A UNA TABLA
				//res.redirect('/Vehiculo/registrarVehiculo?cedula='+req.param('cedula'));
			}else{console.log("el cliente NO existe!"); res.redirect('/buscarCliente');}
		});
	},



	perfil: function(req,res,next){

		Cliente.findOne({cedula:req.param('cedula')}).exec(function(err, resultado){
			Cliente.query('select cedula, nombre, contrasena from Cliente where cedula =' + req.param('cedula') +';', function(err, results){
				

			if(resultado !== undefined)
			{
				console.log(req.param('contrasena'));
				console.log(resultado.contrasena);
                if (req.param('contrasena') == resultado.contrasena){
					res.redirect('Cliente/verCarros?cedula='+resultado.cedula);
				}



				else{console.log("la contrasena es invalida");
			          res.redirect('/ingresarU');  }
			}

			else
				{
					console.log("el usuario no existe");
					res.redirect('/ingresarU');
				}

             });
			
			
			
		});
	},

	verCarros: function (req, res, next){
		Cliente.findOne({cedula:req.param('cedula')}).exec(function(err, resultado){
			console.log(resultado.cedula);
			//res.view();
			Cliente.query('SELECT a.nombre, a.cedula, b.marca, b.modelo, b.placa, b.ano, b.id_vehiculo FROM Cliente a INNER JOIN Vehiculo b ON a.id_cli = b.id_cli WHERE a.cedula ='+resultado.cedula+';',
				function (err, result){
					if (err) return res.serverError(err);
					var string = JSON.stringify(result);
					var json = JSON.parse(string);
					resultado.Cliente = json;
					console.log(json);
					res.view({Cliente: resultado.Cliente, Cli: resultado});
				});
		});
	},
	verServicios: function (req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado1){

		Vehiculo.findOne({id_vehiculo: req.param('id_vehiculo')}).exec(function (err, resultado){

		if (resultado !== undefined){

			console.log(resultado.id_vehiculo);
			Vehiculo.query('SELECT a.status, b.nombre, b.precio, b.id_serv FROM Mantenimiento a inner join Servicio b on a.id_serv = b.id_serv WHERE id_vehiculo='+resultado.id_vehiculo+';', function(err, result){

				if (err) return res.serverError(err);
				console.log('epa');
				var stringt = JSON.stringify(result);
				var json = JSON.parse(stringt);
				resultado.Vehiculo = json;

				console.log(json);
				res.view({Vehiculo: resultado.Vehiculo, Vehi: resultado, Cli: resultado1});
			});
		}
		});

      });
	}

};


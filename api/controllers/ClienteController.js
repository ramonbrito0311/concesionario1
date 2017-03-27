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
			cedula: req.param('cedula'),
			nombre: req.param('nombre'),
			correo: req.param('correo'),
			direccion: req.param('direccion'),
			telefono: req.param('telefono'),
			contrasena: req.param('contrasena')
			}
		Cliente.create(objeto, function clienteCreated(err,Admin)
		{
			console.log(req.param('cedula'));
			if (err) return next(err);
			else {res.redirect('/Vehiculo/registrarVehiculo?cedula='+req.param('cedula'));}
		});
			}else{console.log("el cliente ya existe!"); res.redirect('/registrarCliente');}
		});
	},


	asignar: function(req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
			if (resultado!==undefined){
				res.redirect('/Vehiculo/registrarVehiculo?cedula='+req.param('cedula'));
			}else{console.log("el cliente NO existe!"); res.redirect('/buscarCliente');}
		});
	},


	buscar: function (req, res, next){
		Cliente.findOne({cedula: req.param('cedula')}).exec(function(err, resultado){
			if (resultado!==undefined){
				res.redirect('/Vehiculo/cuadroCliente?cedula='+req.param('cedula'));
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
				var stringt = JSON.stringify(result);
				var json = JSON.parse(stringt);
				resultado.Vehiculo = json;
				console.log(resultado.Vehiculo);
			
            Vehiculo.query('SELECT SUM(b.precio) as costo FROM Mantenimiento a inner join Servicio b on a.id_serv = b.id_serv WHERE id_vehiculo='+resultado.id_vehiculo+';', function(err, result2){
				if (err) return res.serverError(err);
				var stringt2 = JSON.stringify(result2);
				var json2 = JSON.parse(stringt2);
				result2.Cliente = json2;
				console.log(result2.Cliente);


            res.view({Vehiculo: resultado.Vehiculo, Vehi: resultado, x: result2.Cliente, Cli: resultado1});
           });
           });	
		}
		});

      });
	},


	reportes: function (req, res, next){
			Cliente.query('SELECT a.modelo, count(a.id_vehiculo) as VecesAtentido from Vehiculo a inner join Mantenimiento b on a.id_vehiculo = b.id_vehiculo group by a.modelo order by VecesAtentido desc;', function(err, resulta){
	           if (err) return res.serverError(err);
				var string = JSON.stringify(resulta);
				var json = JSON.parse(string);
				resulta.Cliente = json;
				console.log(resulta.Cliente);
            

            Cliente.query('SELECT b.nombre, count(a.id_serv) as CantidadRep from Mantenimiento a inner join Servicio b on a.id_serv = b.id_serv group by b.nombre order by CantidadRep desc;', function(err, resulta2){
	            if (err) return res.serverError(err);
				var string2 = JSON.stringify(resulta2);
				var json2 = JSON.parse(string2);
				resulta2.Vehiculo = json2;
				console.log(resulta2.Vehiculo);

			Cliente.query('SELECT b.nombre, SUM(b.precio) as Ingreso FROM Mantenimiento a inner join Servicio b on a.id_serv = b.id_serv group by b.nombre order by Ingreso desc;', function(err, resulta3){
            	if (err) return res.serverError(err);
				var string3 = JSON.stringify(resulta3);
				var json3 = JSON.parse(string3);
				resulta3.Cliente = json3;
				console.log(resulta3.Cliente);

                res.view({Rep1: resulta.Cliente, Rep2: resulta2.Vehiculo, Rep3: resulta3.Cliente});
            });
            });
            });
	}

};


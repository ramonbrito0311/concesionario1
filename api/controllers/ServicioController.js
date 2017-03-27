/**
 * ServicioController
 *
 * @description :: Server-side logic for managing servicios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	agregarServicio: function(req, res, next){

	Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado1){
		
		Vehiculo.findOne({id_vehiculo: req.param('id_vehiculo')}).exec(function (err, resultado){

		if (resultado !== undefined){
			console.log(resultado.id_vehiculo);
			Vehiculo.query('SELECT * FROM Servicio;', function(err, result){
				if (err) return res.serverError(err);
				var string = JSON.stringify(result);
				var json = JSON.parse(string);
				resultado.Vehiculo = json;
				console.log(json);
				res.view({Vehiculo: resultado.Vehiculo, Vehi: resultado, Cli: resultado1});
			});
		}
		});
      });
	},

	mantenimiento: function(req, res, next){

    Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado1){
		Vehiculo.findOne({id_vehiculo: req.param('id_vehiculo')}).exec(function (err, resultado){
		if (resultado !== undefined){
			console.log(resultado.id_vehiculo);
			Vehiculo.query('SELECT id_serv FROM Mantenimiento WHERE id_vehiculo='+resultado.id_vehiculo+' AND id_serv='+req.param('id_serv')+';',
			function(err, resultt){
				if (err) return res.serverError(err);
				var stringg = JSON.stringify(resultt);
				var jsonn = JSON.parse(stringg);
				var stringy = jsonn.toString();
				console.log(stringy);
				if(stringy == ""){
					Vehiculo.query('INSERT INTO Mantenimiento VALUES (\'En progreso\', '+req.param('id_serv')+', '+resultado.id_vehiculo+');',
					function(err, result){
					if (err) return res.serverError(err);
				    else res.redirect('Vehiculo/cuadroCliente?cedula='+resultado1.cedula);
				});
				}else{res.send('Ya existe este servicio asociado!');}

			});
			
		}
		});
	  });
	},

    actualizarStatus: function(req, res, next){
		
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
	},

	status: function(req, res, next){
    Cliente.findOne({cedula: req.param('cedula')}).exec(function (err, resultado1){

		Vehiculo.findOne({id_vehiculo: req.param('id_vehiculo')}).exec(function (err, resultado){

		if (resultado !== undefined){
			console.log(req.param('id_serv'));
			
				Mantenimiento.findOne({id_serv: req.param('id_serv'), id_vehiculo: req.param('id_vehiculo')}).exec(function (err, resultadoo){
					console.log(resultadoo.status);
					console.log(resultado.id_vehiculo);
					if (resultadoo.status == 'En progreso' && resultado.id_vehiculo == req.param('id_vehiculo')){

                    Vehiculo.query('UPDATE Mantenimiento SET status =\'Finalizado\' WHERE id_vehiculo='+resultado.id_vehiculo+' AND id_serv='+req.param('id_serv')+';',
					function(err, result){
					if (err) return res.serverError(err);
					else res.redirect('Vehiculo/cuadroCliente?cedula='+resultado1.cedula);
                      });
					}else{res.send('Ya el servicio fue actualizado!');}
				});



               }
					
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


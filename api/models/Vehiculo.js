/**
 * Vehiculo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'sqlserver',
  attributes: {
  	/*id_vehiculo:{
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true,
  		notNull:true
  	},*/
  	tipo:{
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	placa: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	registro: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	cilindrada:{
  		type: 'string',
  		notNull: true,
  		size: 50,
  		required: true
  	},
  	marca: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	modelo: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	ano: {
  		type: 'integer',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	id_cli:{
  		type: 'integer',
  		unique:true
  	}
  }
};


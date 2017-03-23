/**
 * Cliente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'sqlserver',
  attributes: {
  	id_cli:{
  		type: 'integer',
  		autoIncrement: true,
  		unique:true
  	},
  	cedula:{
  		type: 'integer',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	nombre: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	correo: {
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	direccion:{
  		type: 'string',
  		notNull: true,
  		size: 50,
  		required: true
  	},
  	telefono: {
  		type: 'integer',
  		notNull: true,
  		size: 20,
  		required: true
  	}

  }
};


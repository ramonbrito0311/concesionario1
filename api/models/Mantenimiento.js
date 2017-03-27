/**
 * Mantenimiento.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'sqlserver',
  attributes: {
  		status:{
  		type: 'string',
  		notNull: true
  	},
  	id_serv:{
  		type: 'integer',
  		notNull: true,
  		required: true
  	},
  	id_vehiculo: {
  		type: 'integer',
  		notNull: true,
  		required: true
  	},
  	id_mant: {
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true,
  		notNull: true,
  		required: true
  	}
  }
};


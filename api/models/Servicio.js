/**
 * Servicio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
connection: 'sqlserver',
  attributes: {
  	id_servicio:{
  		type: 'integer',
      primaryKey: true,
  		autoIncrement: true,
  		notNull: true
  	},
  	nombre:{
  		type: 'string',
  		notNull: true,
  		size: 20,
  		required: true
  	},
  	precio: {
  		type: 'integer',
  		notNull: true
  	}
  }
};


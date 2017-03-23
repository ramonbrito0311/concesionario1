/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'sqlserver',
  schema: true,
  attributes: {
  	/*id_adm: {
  		type: 'integer',
  		autoIncrement: true,
  		unique:true
  	},*/
  	cedula: {
  		type: 'integer',
  		//notNull: true,
  		size: 20
  		//required: true
  	},
  	contrasena: {
  		type: 'string',
  		//notNull: true,
  		size: 20
  		//required: true
  	}

  }
};


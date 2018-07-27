const mysql = require('mysql');
const errorInfo = require('./error');
const defaultOptions = require('../config');
exports.getConnection = function(config = defaultOptions){
	return mysql.createConnection({
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.password,
		database: config.database
	});
}

exports.promisify = function(fn, receiver){
	return (...args)=>{
		return new Promise((resolve, reject)=>{
			fn.call(receiver, ...args, function(err, results, fields){
				if (err) {
					reject(err);
				} 
				resolve(results);
			});
		});
	}
}

exports.formatResult = function(err, data = ''){
	return Object.assign({}, errorInfo[err], {data: data});
}
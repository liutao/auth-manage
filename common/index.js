const mysql = require('mysql');
const errorInfo = require('./error');
const userConfig = require('../config');

let defaultConfig = {
	host: '127.0.0.1',
	port: 3306,
	user: 'root'
}

exports.getConnection = function(){
	let config = Object.assign({}, defaultConfig, userConfig);
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
const {getConnection, promisify, formatResult} = require('../common');

exports.getAgList = async function(project){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where project is NULL or project = ?', [project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.getAuthList = async function(project){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where project is NULL or project = ?', [project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.getUgthList = async function(project){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from usergroup where project is NULL or project = ?', [project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}
const {getConnection, promisify, formatResult} = require('../common');

exports.getAgList = async function(){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where project is NULL or project = ?', [this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getAuthList = async function(){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where project is NULL or project = ?', [this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getUgthList = async function(){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from usergroup where project is NULL or project = ?', [this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}
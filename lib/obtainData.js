const {getConnection, promisify, formatResult} = require('../common');

exports.getProjectAgList = async function(){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where project = ?', [this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getProjectAuthList = async function(){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where project = ?', [this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getUserBelongsToGroups = async function(username){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from usergroup where ug_id in (select ug_id from user_ug where user_id = (select user_id from user where user_name = ?))', [username]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getAuthBelongsToGroups = async function(authname){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where ag_id in (select ag_id from auth_ag where auth_id = (select auth_id from auth where auth_name = ? and project = ?))', [authname, this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getUgMembers = async function(ug){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from user where user_id in (select user_id from user_ug where ug_id = (select ug_id from usergroup where ug_name = ?))', [ug]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

exports.getAgMembers = async function(ag){
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where auth_id in (select auth_id from auth_ag where ag_id = (select ag_id from authgroup where ag_name = ? and project = ?))', [ag, this._options.project]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		throw new Error(e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}
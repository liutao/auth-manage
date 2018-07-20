const {getConnection, promisify, formatResult} = require('../common');
const errorInfo = require('../common/error');

exports.addUser = async function(userInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from user where user_name = ?', [userInfo.user_name]);
		if (result.length > 0) {
			result = formatResult('USER_EXIST');
		} else {
			result = await query('insert into user (user_name, user_email) values(?, ?)', [userInfo.user_name, userInfo.user_email]);
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.clearData = async function(userInfo, usergroupInfo, authInfo, authgroupInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('delete from user where user_name = ?', [userInfo.user_name]);
		result = await query('delete from usergroup where ug_name = ?', [usergroupInfo.name]);
		result = await query('delete from auth where auth_name = ?', [authInfo.name]);
		result = await query('delete from authgroup where ag_name = ?', [authgroupInfo.name]);
		result = formatResult('SUCCESS');
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.addUsergroup = async function(usergroupInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from usergroup where ug_name = ?', [usergroupInfo.name]);
		if (result.length > 0) {
			result = formatResult('USERGROUP_EXIST');
		} else {
			result = await query('insert into usergroup (ug_name, ug_desc) values(?, ?)', [usergroupInfo.name, usergroupInfo.desc]);
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.addAuth = async function(authInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where auth_name = ?', [authInfo.name]);
		if (result.length > 0) {
			result = formatResult('AUTH_EXIST');
		} else {
			result = await query('insert into auth (auth_name, auth_desc) values(?, ?)', [authInfo.name, authInfo.desc]);
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.addAuthgroup = async function(authgroupInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where ag_name = ?', [authgroupInfo.name]);
		if (result.length > 0) {
			result = formatResult('AUTHGROUP_EXIST');
		} else {
			result = await query('insert into authgroup (ag_name, ag_desc) values(?, ?)', [authgroupInfo.name, authgroupInfo.desc]);
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}


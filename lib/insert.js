const {getConnection, promisify, formatResult} = require('../common');

exports.addUser = async function(userInfo){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from user where user_name = ?', [userInfo.user_name]);
		if (result.length > 0) {
			result = formatResult('USER_EXIST');
		} else {
			result = await query('insert into user set ?', userInfo);
			result = formatResult('SUCCESS', result);
		}
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
		result = await query('select * from usergroup where ug_name = ?', [usergroupInfo.ug_name]);
		if (result.length > 0) {
			result = formatResult('USERGROUP_EXIST');
		} else {
			result = await query('insert into usergroup set ?', usergroupInfo);
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
		result = await query('select * from auth where auth_name = ?', [authInfo.auth_name]);
		if (result.length > 0) {
			result = formatResult('AUTH_EXIST');
		} else {
			result = await query('insert into auth set ?', authInfo);
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
		result = await query('select * from authgroup where ag_name = ?', [authgroupInfo.ag_name]);
		if (result.length > 0) {
			result = formatResult('AUTHGROUP_EXIST');
		} else {
			result = await query('insert into authgroup set ?', authgroupInfo);
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.clearData = async function(user_name, ug_name, auth_name, ag_name){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		// result = await query('select user_id from user where user_name = ?', [user_name]);
		// let user_id = result[0].user_id;
		// result = await query('select ug_id from usergroup where ug_name = ?', [ug_name]);
		// let ug_id = result[0].ug_id;
		// result = await query('select auth_id from auth where auth_name = ?', [auth_name]);
		// let auth_id = result[0].auth_id;
		// result = await query('select ag_id from authgroup where ag_name = ?', [ag_name]);
		// let ag_id = result[0].ag_id;

		// result = await query('delete from user_ug where user_id = ? and ug_id = ?', [user_id, ug_id]);
		// result = await query('delete from user_auth where user_id = ? and auth_id = ?', [user_id, auth_id]);
		// result = await query('delete from user_ag where user_id = ? and ag_id = ?', [user_id, ag_id]);
		// result = await query('delete from ug_auth where ug_id = ? and auth_id = ?', [ug_id, auth_id]);
		// result = await query('delete from ug_ag where ug_id = ? and ag_id = ?', [ug_id, ag_id]);
		// result = await query('delete from auth_ag where auth_id = ? and ag_id = ?', [auth_id, ag_id]);

		// result = await query('delete from user where user_name = ?', [user_name]);
		// result = await query('delete from usergroup where ug_name = ?', [ug_name]);
		// result = await query('delete from auth where auth_name = ?', [auth_name]);
		// result = await query('delete from authgroup where ag_name = ?', [ag_name]);

		result = await query('delete from user_ug');
		result = await query('delete from user_auth');
		result = await query('delete from user_ag');
		result = await query('delete from ug_auth');
		result = await query('delete from ug_ag');
		result = await query('delete from auth_ag');

		result = await query('delete from user');
		result = await query('delete from usergroup');
		result = await query('delete from auth');
		result = await query('delete from authgroup');

		result = formatResult('SUCCESS');
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}
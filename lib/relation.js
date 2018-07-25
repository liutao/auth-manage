const {getConnection, promisify, formatResult} = require('../common');
const {getProject} = require('./project');

// establish relationships between users and usergroups
exports.linkUserAndUg = async function(username, ugname){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let user_id = 0;
	let ug_id = 0;
	try{
		result = await query('select user_id from user where user_name = ?', [username]);
		if (result.length === 0) {
			result = formatResult('USER_NOT_EXIST');
		} else {
			user_id = result[0].user_id;
			result = await query('select ug_id from usergroup where ug_name = ?', [ugname]);
			if (result.length === 0) {
				result = formatResult('USERGROUP_NOT_EXIST');
			} else {
				ug_id = result[0].ug_id;
				result = await query('select * from user_ug where user_id = ? and ug_id = ?', [user_id, ug_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into user_ug set ?', {user_id, ug_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		console.log(e);
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

// establish relationships between users and auths
exports.linkUserAndAuth = async function(username, authname){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let user_id = 0;
	let auth_id = 0;
	try{
		result = await query('select user_id from user where user_name = ?', [username]);
		if (result.length === 0) {
			result = formatResult('USER_NOT_EXIST');
		} else {
			user_id = result[0].user_id;
			result = await query('select auth_id from auth where auth_name = ? and project = ?', [authname, project]);
			if (result.length === 0) {
				result = formatResult('AUTH_NOT_EXIST');
			} else {
				auth_id = result[0].auth_id;
				result = await query('select * from user_auth where user_id = ? and auth_id = ?', [user_id, auth_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into user_auth set ?', {user_id, auth_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

// establish relationships between users and authgroups
exports.linkUserAndAg = async function(username, agname){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let user_id = 0;
	let ag_id = 0;
	try{
		result = await query('select user_id from user where user_name = ?', [username]);
		if (result.length === 0) {
			result = formatResult('USER_NOT_EXIST');
		} else {
			user_id = result[0].user_id;
			result = await query('select ag_id from authgroup where ag_name = ? and project = ?', [agname, project]);
			if (result.length === 0) {
				result = formatResult('AUTHGROUP_NOT_EXIST');
			} else {
				ag_id = result[0].ag_id;
				result = await query('select * from user_ag where user_id = ? and ag_id = ?', [user_id, ag_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into user_ag set ?', {user_id, ag_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

// establish relationships between usergroups and auths
exports.linkUgAndAuth = async function(ugname, authname){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let ug_id = 0;
	let auth_id = 0;
	try{
		result = await query('select ug_id from usergroup where ug_name = ?', [ugname]);
		if (result.length === 0) {
			result = formatResult('USERGROUP_NOT_EXIST');
		} else {
			ug_id = result[0].ug_id;
			result = await query('select auth_id from auth where auth_name = ? and project = ?', [authname, project]);
			if (result.length === 0) {
				result = formatResult('AUTH_NOT_EXIST');
			} else {
				auth_id = result[0].auth_id;
				result = await query('select * from ug_auth where ug_id = ? and auth_id = ?', [ug_id, auth_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into ug_auth set ?', {ug_id, auth_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

// establish relationships between usergroups and authgroups
exports.linkUgAndAg = async function(ugname, agname){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let ug_id = 0;
	let ag_id = 0;
	try{
		result = await query('select ug_id from usergroup where ug_name = ?', [ugname]);
		if (result.length === 0) {
			result = formatResult('USERGROUP_NOT_EXIST');
		} else {
			ug_id = result[0].ug_id;
			result = await query('select ag_id from authgroup where ag_name = ? and project = ?', [agname, project]);
			if (result.length === 0) {
				result = formatResult('AUTHGROUP_NOT_EXIST');
			} else {
				ag_id = result[0].ag_id;
				result = await query('select * from ug_ag where ug_id = ? and ag_id = ?', [ug_id, ag_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into ug_ag set ?', {ug_id, ag_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

// establish relationships between auths and authgroups
exports.linkAuthAndAg = async function(authname, agname){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	let auth_id = 0;
	let ag_id = 0;
	try{
		result = await query('select auth_id from auth where auth_name = ?', [authname]);
		if (result.length === 0) {
			result = formatResult('AUTH_NOT_EXIST');
		} else {
			auth_id = result[0].auth_id;
			result = await query('select ag_id from authgroup where ag_name = ? and project = ?', [agname, project]);
			if (result.length === 0) {
				result = formatResult('AUTHGROUP_NOT_EXIST');
			} else {
				ag_id = result[0].ag_id;
				result = await query('select * from auth_ag where auth_id = ? and ag_id = ?', [auth_id, ag_id]);
				if (result.length > 0) {
					result = formatResult('ROW_EXIST');
				} else {
					result = await query('insert into auth_ag set ?', {auth_id, ag_id});
					result = formatResult('SUCCESS', result);
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

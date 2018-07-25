const {getConnection, promisify, formatResult} = require('../common');
const {getProject} = require('./project');

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
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from auth where auth_name = ? and project = ?', [authInfo.auth_name, project]);
		if (result.length > 0) {
			result = formatResult('AUTH_EXIST');
		} else {
			result = await query('insert into auth set ?', Object.assign({}, authInfo, {project}));
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}

exports.addAuthgroup = async function(authgroupInfo){
	let project = getProject();
	if (!project) {
		return formatResult('PROJECT_REQUIRED');
	}
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from authgroup where ag_name = ? and project = ?', [authgroupInfo.ag_name, project]);
		if (result.length > 0) {
			result = formatResult('AUTHGROUP_EXIST');
		} else {
			result = await query('insert into authgroup set ?', Object.assign({}, authgroupInfo, {project}));
			result = formatResult('SUCCESS', result);
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}


const {getConnection, promisify, formatResult} = require('../common');
const errorInfo = require('../common/error');
const MYSQL_ERRNO = errorInfo.MYSQL_ERROR.errno;

exports.getRoleList = async function(project){
	return await runTask(function(connection){
		return new Promise(resolve => {
			connection.query('select * from role where userid = (select userid from user where username = ?) and usergroupid = (select usergroupid from usergroup where usergroup = ?)', [user, usergroup], function(error, results, fields){
				if (error) {
					throw error;
				}
				resolve(results.length > 0);
			});
		});
	});
}

exports.getUserInfo = async function(username){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
		result = await query('select * from user where user_name = ?', [userInfo.user_name]);
		result = formatResult('SUCCESS', result);
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	connection.end();
	return result;
}


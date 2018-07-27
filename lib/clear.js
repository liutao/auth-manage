const {getConnection, promisify, formatResult} = require('../common');

exports.clearData = async function(user_name, ug_name, auth_name, ag_name){
	let connection = getConnection();
	let result = null;
	let query = promisify(connection.query, connection);
	try{
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
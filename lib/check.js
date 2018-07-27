const {getConnection, promisify, formatResult} = require('../common');
const mysql = require('mysql');

exports.checkUserAuth = async function(username, authname){
	let project = this._options.project;
	let connection = this._connection || getConnection(this._options);
	let result = null;
	let query = promisify(connection.query, connection);
	let auth_id = 0;
	let user_id = 0;
	let uglist = [];
	let aglist = [];
	try{
		// get user_id
		result = await query('select user_id from user where user_name = ?', [username]);
		if (result.length === 0) {
			result = formatResult('USER_NOT_EXIST');
		} else {
			user_id = result[0].user_id;
			// get auth_id
			result = await query('select auth_id from auth where auth_name = ? and project = ?', [authname, project]);
			if (result.length === 0) {
				result = formatResult('AUTH_NOT_EXIST');
			} else {
				auth_id = result[0].auth_id;

				// check user_auth
				result = await query('select * from user_auth where user_id = ? and auth_id = ?', [user_id, auth_id]);
				if (result.length > 0) {
					result = formatResult('SUCCESS', true);
				} else {
					// get user_ug
					result = await query('select ug_id from user_ug where user_id = ?', [user_id]);
					if (result.length > 0) {
						uglist = result.map((ug)=>{
							return ug.ug_id;
						});
						// check ug_auth
						result = await query('select * from ug_auth where ug_id in (?) and auth_id = ?', [uglist, auth_id]);
						if (result.length > 0) {
							result = formatResult('SUCCESS', true);
						} else {
							// get user_ag
							result = await query('select ag_id from user_ag where user_id = ?', [user_id]);
							aglist = result.map((ag)=>{
								return ag.ag_id;
							});
							// get ug_ag
							result = await query('select ag_id from ug_ag where ug_id in (?)', [uglist]);
							aglist = aglist.concat(result.map((ag)=>{
								return ag.ag_id;
							}));
							aglist = [...new Set(aglist)];
							// get auth_ag
							result = await query('select * from auth_ag where ag_id in (?) and auth_id = ?', [aglist, auth_id]);
							if (result.length > 0) {
								result = formatResult('SUCCESS', true);
							} else {
								result = formatResult('SUCCESS', false);
							}
						}
					}
				}
			}
		}
	} catch (e){
		result = formatResult('MYSQL_ERROR', e);
	}
	if (!this._connection) {
		connection.end();
	}
	return result;
}

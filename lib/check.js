const {runTask} = require('../common');

exports.isMemberOfGroup = async function(user, usergroup){
	return await runTask(function(connection){
		return new Promise(resolve => {
			connection.query('select * from user_union_usergroup where userid = (select userid from user where username = ?) and usergroupid = (select usergroupid from usergroup where usergroup = ?)', [user, usergroup], function(error, results, fields){
				if (error) {
					throw error;
				}
				resolve(results.length > 0);
			});
		});
	});
}

exports.userExists = async function(user, email){
	return await runTask(function(connection){
		return new Promise(resolve => {
			connection.query('select userid from user where username = ? or useremail = ?', [user, email], function(error, results, fields){
				if (error) {
					throw error;
				}
				resolve(results.length > 0);
			});
		});
	});
}


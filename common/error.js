module.exports = {
	MYSQL_ERROR: {
		errno: -1,
		errmsg: 'mysql error'
	},
	SUCCESS: {
		errno: 0
	},
	USER_EXIST: {
		errno: 10000,
		errmsg: 'user is exist'
	},
	USERGROUP_EXIST: {
		errno: 10001,
		errmsg: 'usergroup is exist'
	},
	AUTH_EXIST: {
		errno: 10002,
		errmsg: 'auth is exist'
	},
	AUTHGROUP_EXIST: {
		errno: 10003,
		errmsg: 'authgroup is exist'
	},
	USER_NOT_EXIST: {
		errno: 10004,
		errmsg: 'user is not exist'
	},
	USERGROUP_NOT_EXIST: {
		errno: 10005,
		errmsg: 'usergroup is not exist'
	},
	AUTH_NOT_EXIST: {
		errno: 10006,
		errmsg: 'auth is not exist'
	},
	AUTHGROUP_NOT_EXIST: {
		errno: 10007,
		errmsg: 'authgroup is not exist'
	},
	ROW_EXIST: {
		errno: 10008,
		errmsg: 'record is exist'
	},
	PROJECT_REQUIRED: {
		errno: 10009,
		errmsg: 'projectname is required'
	},
	PROJECT_MUSTBE_STRING: {
		errno: 10010,
		errmsg: 'projectname muse be string'
	}
}
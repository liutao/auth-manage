const assert = require('assert');
const relation = require('./lib/relation');
const check = require('./lib/check');
const insert = require('./lib/insert');

const defaultOptions = require('./config');

function AuthManage(options){
	
	if (!(this instanceof AuthManage)) {
		return new AuthManage(options);
	}
	// if (AuthManage._instance) {
	// 	return AuthManage._instance;
	// }
	assert(options.project, 'project is required');

	if (options.connection) {
		this._connection = options.connection;
	} else {
		assert(options.host, 'mysql host is required');
		assert(options.user, 'mysql user is required');
		assert(options.password, 'mysql password is required');
		assert(options.database, 'mysql database is required');
	}
	this._options = Object.assign({}, defaultOptions, options);
}

Object.assign(AuthManage.prototype, {
	...relation,
	...check,
	...insert
});

module.exports = AuthManage;
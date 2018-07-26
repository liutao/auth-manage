const project = require('./lib/project');
const relation = require('./lib/relation');
const check = require('./lib/check');
const insert = require('./lib/insert');
const {formatResult} = require('./common');
const defaultOptions = require('./config');
function authManage(options){
	options = Object.assign({}, defaultOptions, options);
	if (options.project) {
		project.setProject(options.project);
	}
	return {
		...relation,
		...check,
		...insert,
		...project
	}
}

Object.assign(authManage, {
	...relation,
	...check,
	...insert,
	...project
});

module.exports = authManage;
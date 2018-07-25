const project = require('./lib/project');
const relation = require('./lib/relation');
const check = require('./lib/check');
const insert = require('./lib/insert');
const {formatResult} = require('./common');

function authManage(pro){
	if (pro) {
		project.setProject(pro);
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
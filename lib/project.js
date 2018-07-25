const {formatResult} = require('../common');

let project = null;
module.exports = {
	getProject: function(){
		return project;
	},
	setProject: function(pro){
		if (typeof pro !== 'string') {
			return formatResult('PROJECT_MUSTBE_STRING');
		}
		project = pro;
	}
}
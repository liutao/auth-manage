const {expect} = require('chai');
const errorInfo = require('../common/error');
const {authInfo1} = require('./data');

describe('project', async function() {

	describe('setProject', function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js');
		});
		it('setProject string', function() {
			authManage.setProject('project1')
			expect(authManage.getProject()).to.equal('project1');
		});
		it('setProject not string', function() {
			expect(authManage.setProject({}).errno).to.equal(errorInfo['PROJECT_MUSTBE_STRING'].errno);
		});
	});
});


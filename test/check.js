const {expect} = require('chai');
const errorInfo = require('../common/error');
const {userInfo, authInfo1, authInfo2, authInfo3, authInfo4, authInfo5} = require('./data');
const {clearData} = require('../lib/clear');

describe('relation ', async function() {
	let authManage = null;
	before(function(){
		authManage = require('../index.js')({project: 'test'});
	});
	it('user is not exist', async function() {
		const result = await authManage.checkUserAuth(+new Date, authInfo2.ug_name);
		expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
	});
	it('auth is not exist', async function() {
		const result = await authManage.checkUserAuth(userInfo.user_name, +new Date);
		expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
	});
	it('user-auth', async function() {
		const result = await authManage.checkUserAuth(userInfo.user_name, authInfo2.auth_name);
		expect(result.data).to.be.true;
	});
	it('user-ug-auth', async function() {
		const result = await authManage.checkUserAuth(userInfo.user_name, authInfo1.auth_name);
		expect(result.data).to.be.true;
	});
	it('user-ag-auth', async function() {
		const result = await authManage.checkUserAuth(userInfo.user_name, authInfo4.auth_name);
		expect(result.data).to.be.true;
	});
	it('user permission denied', async function() {
		const result = await authManage.checkUserAuth(userInfo.user_name, authInfo5.auth_name);
		expect(result.data).to.be.false;
	});
	describe('clearData', async function() {
		it('clearData', async function() {
			const result = await clearData();
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
	});
});


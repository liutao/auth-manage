const {expect} = require('chai');
const errorInfo = require('../common/error');
const {userInfo, usergroupInfo1, usergroupInfo2, authInfo1, authInfo2, authInfo3, authInfo4, authInfo5, authgroupInfo1, authgroupInfo2} = require('./data');

describe('insert ', async function() {
	describe('same project', async function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js')('test');
		});
		it('insert user', async function() {
			const result = await authManage.addUser(userInfo);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('insert user is exists', async function() {
			const result = await authManage.addUser(userInfo);
			expect(result.errno).to.equal(errorInfo['USER_EXIST'].errno);
		});

		it('insert usergroup', async function() {
			const result = await authManage.addUsergroup(usergroupInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('insert usergroup is exists', async function() {
			const result = await authManage.addUsergroup(usergroupInfo1);
			expect(result.errno).to.equal(errorInfo['USERGROUP_EXIST'].errno);
		});

		it('insert auth', async function() {
			const result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('insert auth is exists', async function() {
			const result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['AUTH_EXIST'].errno);
		});

		it('insert authgroup', async function() {
			const result = await authManage.addAuthgroup(authgroupInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('insert authgroup is exists', async function() {
			const result = await authManage.addAuthgroup(authgroupInfo1);
			expect(result.errno).to.equal(errorInfo['AUTHGROUP_EXIST'].errno);
		});
		after(async ()=>{
			await authManage.addUsergroup(usergroupInfo2);
			await authManage.addAuthgroup(authgroupInfo2);
			await authManage.addAuth(authInfo2);
			await authManage.addAuth(authInfo3);
			await authManage.addAuth(authInfo4);
			await authManage.addAuth(authInfo5);
		});
	});

	describe('different project', function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js')('insert2');
		});
		it('insert auth is exists but other project', async function() {
			const result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('insert authgroup is exists but other project', async function() {
			const result = await authManage.addAuthgroup(authgroupInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
	});
});


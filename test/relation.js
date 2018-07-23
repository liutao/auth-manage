const {linkUserAndUg, linkUserAndAuth, linkUserAndAg, linkUgAndAuth, linkUgAndAg, linkAuthAndAg} = require('../lib/relation');
const {expect} = require('chai');
const errorInfo = require('../common/error');
const {userInfo, usergroupInfo1, usergroupInfo2, authInfo1, authInfo2, authInfo3, authInfo4, authInfo5, authgroupInfo1, authgroupInfo2} = require('./data');

describe('relation ', async function() {
	describe('user & usergroup', async function() {
		it('user is not exist', async function() {
			const result = await linkUserAndUg(+new Date, usergroupInfo1.ug_name);
			expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
		});
		it('usergroup is not exist', async function() {
			const result = await linkUserAndUg(userInfo.user_name, +new Date);
			expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
		});
		it('user & usergroup success', async function() {
			const result = await linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('user & usergroup is exist', async function() {
			const result = await linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});
	
	describe('user & auth', async function() {
		it('user is not exist', async function() {
			const result = await linkUserAndAuth(+new Date, authInfo2.auth_name);
			expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
		});
		it('auth is not exist', async function() {
			const result = await linkUserAndAuth(userInfo.user_name, +new Date);
			expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
		});
		it('user & auth success', async function() {
			const result = await linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('user & auth is exist', async function() {
			const result = await linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});

	describe('user & authgroup', async function() {
		it('user is not exist', async function() {
			const result = await linkUserAndAg(+new Date, authgroupInfo2.ag_name);
			expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
		});
		it('authgroup is not exist', async function() {
			const result = await linkUserAndAg(userInfo.user_name, +new Date);
			expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
		});
		it('user & authgroup success', async function() {
			const result = await linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('user & authgroup is exist', async function() {
			const result = await linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});

	describe('usergroup & auth', async function() {
		it('usergroup is not exist', async function() {
			const result = await linkUgAndAuth(+new Date, authInfo1.auth_name);
			expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
		});
		it('auth is not exist', async function() {
			const result = await linkUgAndAuth(usergroupInfo1.ug_name, +new Date);
			expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
		});
		it('usergroup & auth success', async function() {
			const result = await linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('usergroup & auth is exist', async function() {
			const result = await linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});

	describe('usergroup & authgroup', async function() {
		it('usergroup is not exist', async function() {
			const result = await linkUgAndAg(+new Date, authgroupInfo1.auth_name);
			expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
		});
		it('authgroup is not exist', async function() {
			const result = await linkUgAndAg(usergroupInfo1.ug_name, +new Date);
			expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
		});
		it('usergroup & authgroup success', async function() {
			const result = await linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('usergroup & authgroup is exist', async function() {
			const result = await linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});

	describe('auth & authgroup', async function() {
		it('auth is not exist', async function() {
			const result = await linkAuthAndAg(+new Date, authgroupInfo1.ag_name);
			expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
		});
		it('authgroup is not exist', async function() {
			const result = await linkAuthAndAg(authInfo3.auth_name, +new Date);
			expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
		});
		it('auth & authgroup success', async function() {
			const result = await linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
		it('auth & authgroup is exist', async function() {
			const result = await linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
			expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
		});
	});

	after(async ()=>{
		await linkUserAndUg(userInfo.user_name, usergroupInfo2.ug_name);
		await linkAuthAndAg(authInfo4.auth_name, authgroupInfo2.ag_name);
	});
});


const {addUser, addUsergroup, addAuth, addAuthgroup} = require('../lib/insert');
const {expect} = require('chai');
const errorInfo = require('../common/error');
const {getConnection, promisify} = require('../common');
const {userInfo, usergroupInfo1, usergroupInfo2, authInfo1, authInfo2, authInfo3, authInfo4, authInfo5, authgroupInfo1, authgroupInfo2} = require('./data');

describe('insert ', async function() {
	it('insert user', async function() {
		const result = await addUser(userInfo);
		expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
	});
	it('insert user is exists', async function() {
		const result = await addUser(userInfo);
		expect(result.errno).to.equal(errorInfo['USER_EXIST'].errno);
	});

	it('insert usergroup', async function() {
		const result = await addUsergroup(usergroupInfo1);
		expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
	});
	it('insert usergroup is exists', async function() {
		const result = await addUsergroup(usergroupInfo1);
		expect(result.errno).to.equal(errorInfo['USERGROUP_EXIST'].errno);
	});

	it('insert auth', async function() {
		const result = await addAuth(authInfo1);
		expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
	});
	it('insert auth is exists', async function() {
		const result = await addAuth(authInfo1);
		expect(result.errno).to.equal(errorInfo['AUTH_EXIST'].errno);
	});

	it('insert authgroup', async function() {
		const result = await addAuthgroup(authgroupInfo1);
		expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
	});
	it('insert authgroup is exists', async function() {
		const result = await addAuthgroup(authgroupInfo1);
		expect(result.errno).to.equal(errorInfo['AUTHGROUP_EXIST'].errno);
	});

	after(async ()=>{
		await addUsergroup(usergroupInfo2);
		await addAuthgroup(authgroupInfo2);
		await addAuth(authInfo2);
		await addAuth(authInfo3);
		await addAuth(authInfo4);
		await addAuth(authInfo5);
	});
});


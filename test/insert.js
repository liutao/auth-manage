const {addUser, addUsergroup, addAuth, addAuthgroup, clearData} = require('../lib/insert');
const {expect} = require('chai');
const errorInfo = require('../common/error');
const {getConnection, promisify} = require('../common');
const {userInfo, usergroupInfo1, authInfo1, authgroupInfo1} = require('./data');

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

	// it('clearData', async function() {
	// 	const result = await clearData(userInfo.user_name, usergroupInfo1.ug_name, authInfo1.auth_name, authgroupInfo1.ag_name);
	// 	expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
	// });
});


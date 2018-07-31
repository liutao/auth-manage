const AuthManage = require('../index.js');
const {expect} = require('chai');
const errorInfo = require('../common/error');
const config = require('../config');
const mysql = require('mysql');
const {userInfo, usergroupInfo1, usergroupInfo2, authInfo1, authInfo2, authInfo3, authInfo4, authInfo5, authgroupInfo1, authgroupInfo2} = require('./data');
const {clearData} = require('../lib/clear');

describe('create Instance', function() {
	it('without new', function() {
		let authManage = AuthManage(config);
		expect(authManage.addUser).to.be.an.instanceof(Function);
		expect(authManage.linkUserAndUg).to.be.an.instanceof(Function);
		expect(authManage.checkUserAuth).to.be.an.instanceof(Function);
	});
	it('withnew', function() {
		let authManage = new AuthManage(config);
		expect(authManage.addUser).to.be.an.instanceof(Function);
		expect(authManage.linkUserAndUg).to.be.an.instanceof(Function);
		expect(authManage.checkUserAuth).to.be.an.instanceof(Function);
	});
});
describe('check options', function() {
	it('without project', function() {
		let cfg = Object.assign({}, config, {project: undefined});
		expect(AuthManage.bind(null, cfg)).to.throw('project is required');
	});
	it('without connection and host', function() {
		let cfg = Object.assign({}, config, {host: undefined});
		expect(AuthManage.bind(null, cfg)).to.throw('host is required');
	});
	it('without connection and user', function() {
		let cfg = Object.assign({}, config, {user: undefined});
		expect(AuthManage.bind(null, cfg)).to.throw('user is required');
	});
	it('without connection and password', function() {
		let cfg = Object.assign({}, config, {password: undefined});
		expect(AuthManage.bind(null, cfg)).to.throw('password is required');
	});
	it('without connection and database', function() {
		let cfg = Object.assign({}, config, {database: undefined});
		expect(AuthManage.bind(null, cfg)).to.throw('database is required');
	});
	it('have connection', function() {
		let connection = mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: config.database
		});
		expect(AuthManage.bind(null, {project: 'test', connection: connection})).to.not.throw();
		connection.end();
	});
});

describe('create connection', function() {
	let authManage = null;
	let startTime = 0;
	before(function(){
		startTime = Date.now();
		authManage = new AuthManage(config);
	});
	describe('insert ', async function() {
		describe('same project', async function() {
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
				authManage = new AuthManage(Object.assign({}, config, {project: 'insert2'}));
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

	describe('relation ', async function() {
		describe('user & usergroup', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndUg(+new Date, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('user & usergroup success', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & usergroup is exist', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});
		
		describe('user & auth', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndAuth(+new Date, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('auth is not exist', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('user & auth success', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & auth is exist', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('user & authgroup', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndAg(+new Date, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('user & authgroup success', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & authgroup is exist', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('usergroup & auth', async function() {
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUgAndAuth(+new Date, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('auth is not exist', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('usergroup & auth success', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('usergroup & auth is exist', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('usergroup & authgroup', async function() {
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUgAndAg(+new Date, authgroupInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('usergroup & authgroup success', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('usergroup & authgroup is exist', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('auth & authgroup', async function() {
			it('auth is not exist', async function() {
				const result = await authManage.linkAuthAndAg(+new Date, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('auth & authgroup success', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('auth & authgroup is exist', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		after(async ()=>{
			await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo2.ug_name);
			await authManage.linkAuthAndAg(authInfo4.auth_name, authgroupInfo2.ag_name);
		});
	});

	describe('check ', async function() {
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
	});

	describe('getData ', async function() {
		it('get authList', async function() {
			const result = await authManage.getProjectAuthList();
			expect(result.data).to.have.lengthOf(5);
		});

		it('get authgroup', async function() {
			const result = await authManage.getProjectAgList();
			expect(result.data).to.have.lengthOf(2);
		});

		it('get usergroup members', async function() {
			const result = await authManage.getUgMembers(usergroupInfo1.ug_name);
			expect(result.data[0]).to.have.nested.property('user_name', userInfo.user_name);
		});

		it('get authgroup members', async function() {
			const result = await authManage.getAgMembers(authgroupInfo1.ag_name);
			expect(result.data[0]).to.have.nested.property('auth_name', authInfo3.auth_name);
		});

		it('get usergroups that the user belongs to', async function() {
			const result = await authManage.getUserBelongsToGroups(userInfo.user_name);
			expect(result.data).to.have.lengthOf(2);
		});

		it('get authgroups that the auth belongs to', async function() {
			const result = await authManage.getAuthBelongsToGroups(authInfo3.auth_name);
			expect(result.data[0]).to.have.nested.property('ag_name', authgroupInfo1.ag_name);
		});
	});


	describe('clearData', async function() {
		it('clearData', async function() {
			const result = await clearData();
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
	});
	after(function(){
		console.log(Date.now() - startTime);
	});
});

describe('create connection', function() {
	let authManage = null;
	let connection = null;
	let startTime = 0;
	before(function(){
		startTime = Date.now();
		connection = mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: config.database
		});
		authManage = new AuthManage({project: 'test', connection: connection});
	});
	describe('insert ', async function() {
		describe('same project', async function() {
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
				authManage = new AuthManage(Object.assign({}, config, {project: 'insert2'}));
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

	describe('relation ', async function() {
		describe('user & usergroup', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndUg(+new Date, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('user & usergroup success', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & usergroup is exist', async function() {
				const result = await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo1.ug_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});
		
		describe('user & auth', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndAuth(+new Date, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('auth is not exist', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('user & auth success', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & auth is exist', async function() {
				const result = await authManage.linkUserAndAuth(userInfo.user_name, authInfo2.auth_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('user & authgroup', async function() {
			it('user is not exist', async function() {
				const result = await authManage.linkUserAndAg(+new Date, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['USER_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('user & authgroup success', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('user & authgroup is exist', async function() {
				const result = await authManage.linkUserAndAg(userInfo.user_name, authgroupInfo2.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('usergroup & auth', async function() {
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUgAndAuth(+new Date, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('auth is not exist', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('usergroup & auth success', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('usergroup & auth is exist', async function() {
				const result = await authManage.linkUgAndAuth(usergroupInfo1.ug_name, authInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('usergroup & authgroup', async function() {
			it('usergroup is not exist', async function() {
				const result = await authManage.linkUgAndAg(+new Date, authgroupInfo1.auth_name);
				expect(result.errno).to.equal(errorInfo['USERGROUP_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('usergroup & authgroup success', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('usergroup & authgroup is exist', async function() {
				const result = await authManage.linkUgAndAg(usergroupInfo1.ug_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		describe('auth & authgroup', async function() {
			it('auth is not exist', async function() {
				const result = await authManage.linkAuthAndAg(+new Date, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['AUTH_NOT_EXIST'].errno);
			});
			it('authgroup is not exist', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, +new Date);
				expect(result.errno).to.equal(errorInfo['AUTHGROUP_NOT_EXIST'].errno);
			});
			it('auth & authgroup success', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
			});
			it('auth & authgroup is exist', async function() {
				const result = await authManage.linkAuthAndAg(authInfo3.auth_name, authgroupInfo1.ag_name);
				expect(result.errno).to.equal(errorInfo['ROW_EXIST'].errno);
			});
		});

		after(async ()=>{
			await authManage.linkUserAndUg(userInfo.user_name, usergroupInfo2.ug_name);
			await authManage.linkAuthAndAg(authInfo4.auth_name, authgroupInfo2.ag_name);
		});
	});

	describe('check ', async function() {
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
	});

	describe('getData ', async function() {
		it('get authList', async function() {
			const result = await authManage.getProjectAuthList();
			expect(result.data).to.have.lengthOf(5);
		});

		it('get authgroup', async function() {
			const result = await authManage.getProjectAgList();
			expect(result.data).to.have.lengthOf(2);
		});

		it('get usergroup members', async function() {
			const result = await authManage.getUgMembers(usergroupInfo1.ug_name);
			expect(result.data[0]).to.have.nested.property('user_name', userInfo.user_name);
		});

		it('get authgroup members', async function() {
			const result = await authManage.getAgMembers(authgroupInfo1.ag_name);
			expect(result.data[0]).to.have.nested.property('auth_name', authInfo3.auth_name);
		});

		it('get usergroups that the user belongs to', async function() {
			const result = await authManage.getUserBelongsToGroups(userInfo.user_name);
			expect(result.data).to.have.lengthOf(2);
		});

		it('get authgroups that the auth belongs to', async function() {
			const result = await authManage.getAuthBelongsToGroups(authInfo3.auth_name);
			expect(result.data[0]).to.have.nested.property('ag_name', authgroupInfo1.ag_name);
		});
	});

	describe('clearData', async function() {
		it('clearData', async function() {
			const result = await clearData();
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
	});
	after(function(){
		connection.end();
		console.log(Date.now() - startTime);
	});
});
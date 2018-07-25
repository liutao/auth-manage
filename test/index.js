const authManage = require('../index.js');
const {expect} = require('chai');
const errorInfo = require('../common/error');
const {authInfo1} = require('./data');

describe('index ', function() {
	describe('require authManage without run', function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js');
		});
		it('check fn is exists', function() {
			expect(authManage.addUser).to.be.an.instanceof(Function);
			expect(authManage.linkUserAndUg).to.be.an.instanceof(Function);
			expect(authManage.checkUserAuth).to.be.an.instanceof(Function);
			expect(authManage.getProject).to.be.an.instanceof(Function);
		});
		it('project is null', function() {
			expect(authManage.getProject()).to.be.null;
		});
		it('project is required', async function() {
			let result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['PROJECT_REQUIRED'].errno);
		});
	});

	describe('require authManage and run it without project', function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js')();
		});
		it('check fn is exists', function() {
			expect(authManage.addUser).to.be.an.instanceof(Function);
			expect(authManage.linkUserAndUg).to.be.an.instanceof(Function);
			expect(authManage.checkUserAuth).to.be.an.instanceof(Function);
			expect(authManage.getProject).to.be.an.instanceof(Function);
		});
		it('project is null', function() {
			expect(authManage.getProject()).to.be.null;
		});
		it('project is required', async function() {
			let result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['PROJECT_REQUIRED'].errno);
		});
	});

	describe('require authManage and run it with project', function() {
		let authManage = null;
		before(function(){
			authManage = require('../index.js')('project');
		});
		it('check fn is exists', function() {
			expect(authManage.addUser).to.be.an.instanceof(Function);
			expect(authManage.linkUserAndUg).to.be.an.instanceof(Function);
			expect(authManage.checkUserAuth).to.be.an.instanceof(Function);
			expect(authManage.getProject).to.be.an.instanceof(Function);
		});
		it('project is project', function() {
			expect(authManage.getProject()).to.equal('project');
		});
		it('project is exists', async function() {
			let result = await authManage.addAuth(authInfo1);
			expect(result.errno).to.equal(errorInfo['SUCCESS'].errno);
		});
	});
});


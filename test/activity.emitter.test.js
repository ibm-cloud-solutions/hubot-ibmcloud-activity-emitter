/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
'use strict';

const path = require('path');
const Helper = require('hubot-test-helper');
const helper = new Helper('');
const expect = require('chai').expect;
const activityEmitter = require(path.resolve(__dirname, '..', 'index'));

// Passing arrow functions to mocha is discouraged: https://mochajs.org/#arrow-functions
// return promises from mocha tests rather than calling done() - http://tobyho.com/2015/12/16/mocha-with-promises/
describe('Test emitting of bot activity', function() {

	let room;
	let emitActivityCount;

	beforeEach(function() {
		emitActivityCount = 0;
		room = helper.createRoom();
		room.robot.on('bot.activity', function() {
			emitActivityCount++;
		});
	});

	afterEach(function() {
		room.destroy();
	});

	context('emit bot activities without required params', function() {
		it('should not emit activity if missing robot param', function() {
			let activity = {activity_id: 'activity.test'};
			let res = {robot: room.robot};

			activityEmitter.emitBotActivity(null, res, activity);
			expect(emitActivityCount).to.eql(0);
		});

		it('should not emit activity if missing activity param', function() {
			let res = {robot: room.robot};

			activityEmitter.emitBotActivity(room.robot, res);
			expect(emitActivityCount).to.eql(0);
		});

		it('should not emit activity if missing activity_id', function() {
			let activity = {};
			let res = {robot: room.robot};

			activityEmitter.emitBotActivity(room.robot, res, activity);
			expect(emitActivityCount).to.eql(0);
		});
	});

	context('emit bot activities all required params', function() {
		it('should emit activity if all params are provided', function() {
			let activity = {activity_id: 'activity.test'};
			let res = {robot: room.robot};

			activityEmitter.emitBotActivity(room.robot, res, activity);
			expect(emitActivityCount).to.eql(1);
		});

		it('should emit activity if res param is not provided', function() {
			let activity = {activity_id: 'activity.test'};

			activityEmitter.emitBotActivity(room.robot, null, activity);
			expect(emitActivityCount).to.eql(1);
		});
	});
});

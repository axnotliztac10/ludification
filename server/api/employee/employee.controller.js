/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /employee              ->  index
 * POST    /employee              ->  create
 * GET     /employee/:id          ->  show
 * PUT     /employee/:id          ->  update
 * DELETE  /employee/:id          ->  destroy
 */

 'use strict';

var Employee = require('../../models/Employee.js');
var Department = require('../../models/Department.js');
var Record = require('../../models/Record.js');

var fs = require('fs'),
	moment = require('moment');

exports.index = function(req, res) {

	var getRecordCount = function (label, records) {
		var count = 0;
		records.forEach(function (item) {
			if (item.timeLabel == label) count++;
		});
		return count;
	};

	var sendSocket = function (data) {
		req.app.get('io').sockets.emit('newArrival', data);
	};

	var setNew = function (new_id) {
		var NewEmployee = new Employee({
				EmployeeID: new_id,
				Name: 'Unknown'
			});

 		NewEmployee.save(function(err, res) {
 			if (err) throw err;
 			sendSocket(res);
 			console.log('User saved successfully!');
 		});
	};

	var getTimeLabel = function (department) {

		var resT = {
			time: moment()
		},
		arriveDueTime = (department.Schedule.arrive == 'created_at') ? moment().hours(9).minutes(0).seconds(0) : department.Schedule.arrive;

		if (resT.time.diff(arriveDueTime, 'minutes') <= 0) {
			resT.timeLabel = 'ontime';
		} else if (resT.time.diff(arriveDueTime, 'minutes') > 15) {
			resT.timeLabel = 'late';
		} else {
			resT.timeLabel = 'tolerancy';
		}

		return resT;
	};

	Employee.findOne({'EmployeeID': req.body.user_id}).exec(function(err, employee) {
		if (err) throw err;		
		if (!employee) {
			setNew(req.body.user_id);
			res.json({err: 'no employee'});
			return;
		};

		var newRecordBody = getTimeLabel(employee.Department),
			newRecord = new Record(newRecordBody);
		
		var photo = '../person.jpg',
			photoUrl = './client/assets/images/employees/' + employee.EmployeeID + '.jpg';

		if (fs.existsSync(photoUrl)) { photo = employee.EmployeeID + '.jpg'; }

		employee.Record.unshift(newRecord);
		employee.save(function (err, employeeUpdated) {
				var EmployeeRes = JSON.parse(JSON.stringify(employeeUpdated));

				EmployeeRes.Photo = 'http://' + req.headers.host + '/assets/images/employees/' + photo;
				EmployeeRes.Record[0].count = getRecordCount(newRecordBody.timeLabel, employeeUpdated.Record);
				sendSocket(EmployeeRes);
				res.json(EmployeeRes);
		});
	});
};

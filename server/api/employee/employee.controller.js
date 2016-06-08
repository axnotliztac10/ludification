/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /employee              ->  index
 * POST    /employee              ->  create
 * GET     /employee/:id          ->  show
 * PUT     /employee/:id          ->  update
 * DELETE  /employee/:id          ->  destroy
 */

 'use strict';

 var Employee = require('../../models/EmployeeModel.js');
 var fs = require('fs');
 var images  = [];

fs.readdir( './client/assets/images/employees', function (err, files) { 
	if (!err) {
		images = files;
	} else {
		throw err; 
	}
}); 

 exports.index = function(req, res) {

 	Employee.findOne({'EmployeeId': req.body.user_id}, function(err, employee) {
 		if (err) throw err;
 		if (!employee) {
 			res.json({err: 'no employee'});
 			return;
 		};

		var name = employee.Name.toLowerCase();
		var nameUpp = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		var photo = '../person.jpg';
		
		images.forEach(function (item) {
			if (item.search(nameUpp) > -1) photo = item;
		});

		var Employee = JSON.parse(JSON.stringify(employee));
		Employee.Photo = 'http://' + req.headers.host + '/assets/images/employees/' + photo;

 		res.json(Employee);
 		req.app.get('io').sockets.emit('newArrival', Employee)
 	});

 };

 exports.loadDump = function(req, res) {
 	var obj;

 	var setResults = function (employees) {
 		employees.forEach(function(item) {
	 		
 			var newEmployee = {
				EmployeeID: item.User_PIN,
				Name: item.Name
			};

	 		var NewEmployee = new Employee(newEmployee);

	 		NewEmployee.save(function(err) {
	 			if (err) throw err;
	 			console.log('User saved successfully!');
	 		});
	 	});
	 	res.json({
	 		result: 'ok'
	 	});
 	};

	fs.readFile(__dirname + '/../../models/data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  setResults(JSON.parse(data));
	});
 };

'use strict';

angular.module('ludificationApp')
  .controller('TeamCtrl', function ($scope) {

    $scope.persons = [
	    { time: '1288323623006', name: 'Sergio Perez', ontime: true, count: 3, timeLabel: 'late' },
	    { time: '1288323623006', name: 'Sausage', ontime: false, count: 2, timeLabel: 'tolerancy' },
	    { time: '1288323623006', name: 'Black Olives', ontime: true, count: 19, timeLabel: 'ontime' },
	    { time: '1288323623006', name: 'Green Peppers', ontime: false, count: 10, timeLabel: 'late' }
	 ];

	 $scope.$on('newPerson', function (cfg, data) {
	 	$scope.newPerson(data);
	 })

	$scope.newPerson = function (data) {
		var d = new Date();
		var n = d.getTime();
		var person = {time: '1288323623006', name: 'Josh Peppers', ontime: false, count: 5, timeLabel: 'late' };

		if (data) {
			person = {time: n, name: data.Name, ontime: false, count: 5, timeLabel: 'late' }
		}

		$scope.animateList = true;
		$timeout(function () {
			$scope.animateList = false;
			$scope.persons.unshift(person);
		}, 500);
	};
  });

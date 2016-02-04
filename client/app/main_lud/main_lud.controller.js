'use strict';

angular.module('ludificationApp')
  .controller('MainLudCtrl', function ($scope, $timeout) {
    $scope.message = 'Hello';

    $scope.persons = [
	    { name: 'Sergio Perez', ontime: true, count: 3 },
	    { name: 'Sausage', ontime: false, count: 2 },
	    { name: 'Black Olives', ontime: true, count: 19 },
	    { name: 'Green Peppers', ontime: false, count: 10 }
	 ];

	$scope.newPerson = function () {
		$scope.animateList = true;
		$timeout(function () {
			$scope.animateList = false;
			$scope.persons.unshift({ name: 'Josh Peppers', ontime: false, count: 5 });
		}, 500);
	};

  });

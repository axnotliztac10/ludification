'use strict';

angular.module('ludificationApp')
  .controller('MainLudCtrl', function ($scope, $timeout, SocketIO) {
    $scope.message = 'Hello';

    $scope.persons = [
	    { name: 'Sergio Perez', ontime: true, count: 3 },
	    { name: 'Sausage', ontime: false, count: 2 },
	    { name: 'Black Olives', ontime: true, count: 19 },
	    { name: 'Green Peppers', ontime: false, count: 10 }
	 ];

	 $scope.$on('newPerson', function () {
	 	$scope.newPerson();
	 })

	$scope.newPerson = function () {
		$scope.animateList = true;
		$timeout(function () {
			$scope.animateList = false;
			$scope.persons.unshift({ name: 'Josh Peppers', ontime: false, count: 5 });
		}, 500);
	};

  });

angular.module('ludificationApp')
  .service('SocketIO', function ($rootScope) {
  		var socket = io('http://localhost:7000');
	   	socket.on('newArrival', function (data) {
	    	$rootScope.$broadcast('newPerson', data);
	    });

	    return socket;
  });

  
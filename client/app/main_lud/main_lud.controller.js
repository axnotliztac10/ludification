'use strict';

angular.module('ludificationApp')
  .controller('MainLudCtrl', function ($scope, $timeout, SocketIO) {

    $scope.persons = [
	    
	 ];

	 $scope.$on('newPerson', function (cfg, data) {
	 	$scope.newPerson(data);
	 });

	var getCheckStatus = function () {
		
	};

	$scope.newPerson = function (data) {
		
		var d = new Date();
		var n = d.getTime();
		var person = {time: '1288323623006', name: 'Desconocido', ontime: false, count: 5, timeLabel: 'late' };

		if (data) {
			var status = getCheckStatus(data.Record);
			person = {time: n, name: data.Name, ontime: false, record: data.Record, timeLabel: 'late', user_id: data.User_PIN, photo: data.Photo}
		}

		$scope.animateList = true;
		$timeout(function () {
			$scope.animateList = false;
			$scope.persons.unshift(person);
		}, 500);
	};

  });

angular.module('ludificationApp')
  .service('SocketIO', function ($rootScope, AppConfig) {
  		var socket = io(AppConfig.socket);
	   	socket.on('newArrival', function (data) {
	    	$rootScope.$broadcast('newPerson', data);
	    });

	    return socket;
  });


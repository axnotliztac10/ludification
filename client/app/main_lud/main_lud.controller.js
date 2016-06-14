'use strict';

angular.module('ludificationApp')
  .controller('MainLudCtrl', function ($scope, $timeout, SocketIO) {

    $scope.persons = [];
    var audio = document.getElementById("myAudio"); 

	SocketIO.on('newArrival', function (data) {
    	$scope.newPerson(data);
    });

	$scope.newPerson = function (data) {
		$scope.animateList = true;
		$timeout(function () {
			audio.play();
			$scope.animateList = false;
			$scope.persons.unshift(data);
		}, 500);
	};

  });

angular.module('ludificationApp')
  .service('SocketIO', function ($rootScope, AppConfig) {
  		var socket = io(AppConfig.socket);

	    return socket;
  });

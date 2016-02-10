'use strict';

angular.module('ludificationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/deprecated',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
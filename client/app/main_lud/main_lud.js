'use strict';

angular.module('ludificationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main_lud', {
        url: '/main_lud',
        templateUrl: 'app/main_lud/main_lud.html',
        controller: 'MainLudCtrl'
      });
  });
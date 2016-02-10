'use strict';

angular.module('ludificationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main_lud', {
        url: '/',
        templateUrl: 'app/main_lud/main_lud.html',
        controller: 'MainLudCtrl'
      });
  });
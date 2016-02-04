'use strict';

angular.module('ludificationApp')
  .filter('ontimeLabel', function () {
    return function (input) {
      return input ? 'llego a horario' : 'llego tarde';
    };
  });

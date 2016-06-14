'use strict';

angular.module('ludificationApp')
  .filter('ontimeLabel', function () {
    return function (input) {
      var label = '';
      
      if (input == 'late') label = 'llego tarde';
      else if (input == 'tolerancy') label = 'llego justo a tiempo';
      else label = 'llego a tiempo';

      return label;
    };
  });

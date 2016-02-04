'use strict';

describe('Controller: MainLudCtrl', function () {

  // load the controller's module
  beforeEach(module('ludificationApp'));

  var MainLudCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainLudCtrl = $controller('MainLudCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

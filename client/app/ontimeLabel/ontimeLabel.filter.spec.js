'use strict';

describe('Filter: ontimeLabel', function () {

  // load the filter's module
  beforeEach(module('ludificationApp'));

  // initialize a new instance of the filter before each test
  var ontimeLabel;
  beforeEach(inject(function ($filter) {
    ontimeLabel = $filter('ontimeLabel');
  }));

  it('should return the input prefixed with "ontimeLabel filter:"', function () {
    var text = 'angularjs';
    expect(ontimeLabel(text)).toBe('ontimeLabel filter: ' + text);
  });

});

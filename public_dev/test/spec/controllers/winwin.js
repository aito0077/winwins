'use strict';

describe('Controller: WinwinCtrl', function () {

  // load the controller's module
  beforeEach(module('winwinsApp'));

  var WinwinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WinwinCtrl = $controller('WinwinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

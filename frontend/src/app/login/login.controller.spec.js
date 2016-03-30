(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var scope;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_ ) {
      scope = _$rootScope_.$new();

      vm = _$controller_('LoginController');
      scope.$apply();
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });
  });
})();
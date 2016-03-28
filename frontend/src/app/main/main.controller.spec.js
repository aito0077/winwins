(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var scope;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_ ) {
      scope = _$rootScope_.$new();

      var mockData = {
        sponsors: [{datos: 'prueba'}],
        winwins:  [{datos: 'prueba'}],
        miembros: [{datos: 'prueba'}],
        partners: [{datos: 'prueba'}]
      };
      vm = _$controller_('MainController', mockData );
      scope.$apply();
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

    it('should define at least 1 sponsor', function() {
      expect(angular.isArray(vm.sponsors)).toBeTruthy();
      expect(vm.sponsors.length >= 1).toBeTruthy();
    });

    it('should define at least 1 winwins', function() {
      expect(angular.isArray(vm.winwins)).toBeTruthy();
      expect(vm.winwins.length >= 1).toBeTruthy();
    });
    it('should define at least 1 miembros', function() {
      expect(angular.isArray(vm.miembros)).toBeTruthy();
      expect(vm.miembros.length >= 1).toBeTruthy();
    });
    it('should define at least 1 partners', function() {
      expect(angular.isArray(vm.partners)).toBeTruthy();
      expect(vm.partners.length >= 1).toBeTruthy();
    });
  });
})();

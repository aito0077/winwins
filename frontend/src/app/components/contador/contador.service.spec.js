(function() {
  'use strict';

  describe('service contador', function() {
    var contador;
    var $httpBackend;
    var ENV;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_contador_, _$httpBackend_, _ENV_) {
      contador = _contador_;
      $httpBackend = _$httpBackend_;
      ENV = _ENV_;
    }));

    it('should be registered', function() {
      expect(contador).not.toEqual(null);
    });

    describe('getList function', function() {
      it('should exist', function() {
        expect(contador.getList).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  ENV.apiBase + '/contador/').respond(200, [{pprt: 'value'}]);
        var data;
        contador.getList().then(function(list) {
          data = list;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length >= 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

    });

  });

})();

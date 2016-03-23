(function() {
  'use strict';

  describe('service miembro', function() {
    var miembro;
    var $httpBackend;
    var ENV;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_miembro_, _$httpBackend_, _ENV_) {
      miembro = _miembro_;
      $httpBackend = _$httpBackend_;
      ENV = _ENV_;
    }));

    it('should be registered', function() {
      expect(miembro).not.toEqual(null);
    });

    describe('getList function', function() {
      it('should exist', function() {
        expect(miembro.getList).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  ENV.apiBase + '/miembros/').respond(200, [{pprt: 'value'}]);
        var data;
        miembro.getList().then(function(list) {
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

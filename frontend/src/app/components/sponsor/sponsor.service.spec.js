(function() {
  'use strict';

  describe('service sponsor', function() {
    var sponsor;
    var $httpBackend;
    var ENV;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_sponsor_, _$httpBackend_, _ENV_) {
      sponsor = _sponsor_;
      $httpBackend = _$httpBackend_;
      ENV = _ENV_;
    }));

    it('should be registered', function() {
      expect(sponsor).not.toEqual(null);
    });

    describe('getMainList function', function() {
      it('should exist', function() {
        expect(sponsor.getMainList).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  ENV.apiBase + '/sponsors/main/').respond(200, [{pprt: 'value'}]);
        var data;
        sponsor.getMainList().then(function(list) {
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

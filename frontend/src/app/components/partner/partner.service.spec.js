(function() {
  'use strict';

  describe('service partner', function() {
    var partner;
    var $httpBackend;
    var ENV;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_partner_, _$httpBackend_, _ENV_) {
      partner = _partner_;
      $httpBackend = _$httpBackend_;
      ENV = _ENV_;
    }));

    it('should be registered', function() {
      expect(partner).not.toEqual(null);
    });

    describe('getList function', function() {
      it('should exist', function() {
        expect(partner.getList).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  ENV.apiBase + '/partners/').respond(200, [{pprt: 'value'}]);
        var data;
        partner.getList().then(function(list) {
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

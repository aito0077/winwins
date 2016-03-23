(function() {
  'use strict';

  describe('service winwin', function() {
    var winwin;
    var $httpBackend;
    var ENV;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_winwin_, _$httpBackend_, _ENV_) {
      winwin = _winwin_;
      $httpBackend = _$httpBackend_;
      ENV = _ENV_;
    }));

    it('should be registered', function() {
      expect(winwin).not.toEqual(null);
    });

    describe('getList function', function() {
      it('should exist', function() {
        expect(winwin.getList).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  ENV.apiBase + '/winwins/').respond(200, [{pprt: 'value'}]);
        var data;
        winwin.getList().then(function(list) {
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

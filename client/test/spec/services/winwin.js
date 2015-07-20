'use strict';

describe('Service: Winwin', function () {

  // load the service's module
  beforeEach(module('winwinsApp'));

  // instantiate service
  var Winwin;
  beforeEach(inject(function (_Winwin_) {
    Winwin = _Winwin_;
  }));

  it('should do something', function () {
    expect(!!Winwin).toBe(true);
  });

});

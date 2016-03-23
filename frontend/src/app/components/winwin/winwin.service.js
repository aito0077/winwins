(function() {
  'use strict';

  angular
      .module('winwins')
      .service('winwin', winwin);

  /** @ngInject */
  function winwin($log, Restangular) {

    var _winwin = {};

    var rWinwin = Restangular.all('winwins');

    _winwin.getList = function() {
      return rWinwin.getList();
    };

    return _winwin;
  }

})();

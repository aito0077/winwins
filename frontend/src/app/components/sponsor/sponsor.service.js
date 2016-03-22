(function() {
  'use strict';

  angular
      .module('winwins')
      .service('sponsor', sponsor);

  /** @ngInject */
  function sponsor($log, Restangular) {

    var _sponsor = {};

    var rSponsors = Restangular.all('sponsors');

    _sponsor.getMainList = function() {
      return rSponsors.customGET('main');
    }

    return _sponsor;
  }

})();

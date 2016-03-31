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
    };

    _sponsor.getList = function(page) {
      var offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset + '/';
      return rSponsors.customGET(paginateUrl);
    };

    return _sponsor;
  }

})();

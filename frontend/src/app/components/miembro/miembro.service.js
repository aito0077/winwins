(function() {
  'use strict';

  angular
      .module('winwins')
      .service('miembro', miembro);

  /** @ngInject */
  function miembro($log, Restangular) {

    var _miembro = {};

    var rMiembro = Restangular.all('users');

    _miembro.getList = function(page, offset) {
      var default_offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset;
      return rMiembro.customGET(paginateUrl);
    };

    return _miembro;
  }

})();

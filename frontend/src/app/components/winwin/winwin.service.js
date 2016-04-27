(function() {
  'use strict';

  angular
      .module('winwins')
      .service('winwin', winwin);

  /** @ngInject */
  function winwin($log, Restangular) {

    var _winwin = {};

    var rWinwin = Restangular.all('winwins');
    var rParametric = Restangular.all('parametric');

    _winwin.getInterests = function() {
      return rParametric.customGET('interests');
    };

    _winwin.getList = function(page, filter, offset) {
      var default_offset = 15;
      var default_page = 0;
      var default_list = 'all';

      page  = typeof page !== 'undefined' ? page : default_page;
      filter = typeof filter !== 'undefined' ? filter : default_list;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset + '/' + filter;
      return rWinwin.customGET(paginateUrl);
    };

    _winwin.getListByCategory = function(page, categories, offset) {
      var default_offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset;
      return rWinwin.customGET(paginateUrl, {categories: [categories]});
    };

    _winwin.getWinwin = function(id) {
      return Restangular.one('winwins', id).get();
    }

    return _winwin;
  }

})();

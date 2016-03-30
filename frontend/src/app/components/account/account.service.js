(function() {
  'use strict';

  angular
      .module('winwins')
      .service('account', account);

  /** @ngInject */
  function account($log, Restangular) {

    var _account = {};

    var rAccount = Restangular.one('me');

    _account.getProfile = function() {
      return rAccount.get();
    };

    return _account;
  }

})();
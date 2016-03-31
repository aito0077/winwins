(function() {
  'use strict';

  angular
      .module('winwins')
      .service('account', account);

  /** @ngInject */
  function account($log, Restangular, $rootScope) {

    var _account = {};

    var rAccount = Restangular.one('me');

    _account.getProfile = function() {
      if (!$rootScope.account) {
        $rootScope.account = rAccount.get();  
      }
      
      return $rootScope.account;
    };

    return _account;
  }

})();
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
      return  rAccount.get();
    };

    _account.uploadImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return rAccount
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    return _account;
  }

})();

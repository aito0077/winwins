(function() {
  'use strict';

  angular
      .module('winwins')
      .service('user', user);

  /** @ngInject */
  function user($log, Restangular) {

    var _user = {};

    _user.getUser = function(id) {
      return Restangular.one('users', id).get();
    };

    _user.saveProfile = function(user) {
      return Restangular.all('profile').post(user);
    };

    return _user;
  }

})();

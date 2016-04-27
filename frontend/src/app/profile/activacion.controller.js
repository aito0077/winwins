(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('ActivacionController', ActivacionController);

  /** @ngInject */
  function ActivacionController($auth, account) {
		var vm = this;

		vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    account.getProfile()
    .then(function(data) {
       vm.account = data.profile;
    });
  }

})();

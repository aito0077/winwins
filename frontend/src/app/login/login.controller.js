(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($auth, $state, $timeout) {
    var vm = this;

    vm.login = function() {
      $auth.login({ email: vm.email, password: vm.password })
      .then(function() {
        complete();      
      })
      .catch(function() {
        $state.go('login');
      });
    };

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function() {
        vm.provider = provider;
        complete();      
      })
      .catch(function() {
        $state.go('login');
      });
    };

    var complete = function() {
      vm.redirect_message = true;
      $timeout(function() {
        $state.go('home'); 
      }, 3000);
    };

  }

})();

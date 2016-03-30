(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($auth, $rootScope, $state, $timeout, account) {
    var vm = this;

    vm.login = function() {
      $auth.login({ email: vm.email, password: vm.password })
      .then(function(data) {
        complete(data);      
      })
      .catch(function(response) {
        $state.go('login');
      });
    };

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(data) {
        vm.provider = provider;
        complete(data);      
      })
      .catch(function(response) {
        $state.go('login');
      });
    };

    var complete = function(data){
      account.getProfile()
      .then(function(data) {
         $rootScope.account = data.profile;
      });
      vm.redirect_message = true;
      $timeout(function() {
        $state.go('home'); 
      }, 3000);
    };

  }

})();

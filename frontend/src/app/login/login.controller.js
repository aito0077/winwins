(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('LoginController', LoginController);

  function LoginController($mdDialog, $auth, $state, $timeout, account, $rootScope) {
    var vm = this;

    vm.login_status = 'login';

    vm.login = function() {
      $auth.login({ email: vm.login.email, password: vm.login.password })
      .then(function() {
        $rootScope.$broadcast('account_change');
        complete();
        vm.login_status = 'success';
      })
      .catch(function() {
        vm.login_status = 'error';
      });
    };

    vm.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function() {
        vm.provider = provider;
        $rootScope.$broadcast('account_change');
        complete();
        vm.login_status = 'success';
      })
      .catch(function() {
        vm.login_status = 'error';
      });
    };

    vm.register_status = 'register';

    vm.signup = function() {
      if (!vm.register.terms){
        vm.registerForm.terms.$setValidity("notTerms", false);
        return;
      }
      $auth.signup({
        username: vm.register.name,
        lastname: vm.register.lastname,
        email: vm.register.email,
        password: vm.register.password,
        name: vm.register.name,
        language_code: 'ES'
      })
      .then(function() {
        $auth.login({ email: vm.register.email, password: vm.register.password })
        .then(function() {
          $rootScope.$broadcast('account_change');
          complete('home.profile');
          vm.register_status = 'success';
        });
      })
      .catch(function(response) {
        vm.register_status = 'error';
        vm.message = "Error en su registracion";
        if(response.data) {
          if(response.data.message == 'email_already_taken') {
            vm.message = 'El correo ya existe';
          }
        }
      });
    };

    vm.change_pass_status = 'change_pass';

    var complete = function(redirect) {
      account.getProfile();
      $timeout(function() {
        $mdDialog.hide();
        if (redirect) {
          $state.go(redirect);
        }
      }, 3000);
    };
  }

  angular
    .module('winwins')
    .directive('passwordVerify', passwordVerify);

    /** @ngInject */
  function passwordVerify() {
    var directive = {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            ctrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                ctrl.$setValidity("passwordVerify", false);
                return undefined;
              } else {
                ctrl.$setValidity("passwordVerify", true);
                return viewValue;
              }
            });
          }
        });
      }
    };
    return directive;
  }

})();

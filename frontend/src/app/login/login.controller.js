(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('LoginController', LoginController);

  function LoginController($scope, $mdDialog, $auth, $state, $timeout) {
    $scope.login_status = 'login'

    $scope.login = function() {
      $auth.login({ email: $scope.login.email, password: $scope.login.password })
      .then(function() {
        complete();
        $scope.login_status = 'succes';
      })
      .catch(function() {
        $scope.login_status = 'error';
      });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function() {
        $scope.provider = provider;
        complete();
        $scope.login_status = 'succes';
      })
      .catch(function() {
        $scope.login_status = 'error';
      });
    };

    $scope.register_status = 'register';

    $scope.signup = function() {
      if (!$scope.register.terms){
        $scope.registerForm.terms.$setValidity("notTerms", false);
        return;
      }
      $auth.signup({
        username: $scope.register.name,
        lastname: $scope.register.lastname,
        email: $scope.register.email,
        password: $scope.register.password,
        name: $scope.register.name,
        language_code: 'ES'
      })
      .then(function() {
            $auth.login({ email: $scope.register.email, password: $scope.register.password })
            .then(function() {
              complete();
              $scope.register_status = 'success';
            });
      })
      .catch(function(response) {
        $scope.register_status = 'error';
        $scope.message = "Error en su registracion";
        if(response.data) {
          if(response.data.message == 'email_already_taken') {
            $scope.message = 'El correo ya existe';
          }
        }
      });
    };

    $scope.change_pass_status = 'change_pass';

    var complete = function() {      
      $timeout(function() {
        $mdDialog.hide(); 
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

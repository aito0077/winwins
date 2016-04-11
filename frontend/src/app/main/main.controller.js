(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsors, winwins, miembros, partners, gettextCatalog, gettext, $auth, $mdDialog) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    //vm.creationDate = 1458584706984;
    vm.sponsors = sponsors;
    vm.winwins = winwins;
    vm.miembros = miembros;
    vm.partners = partners;
    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.destacados = [
      {
        id: 11,
        members: 12,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },{
        id: 11,
        members: 12,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      }
    ];

    vm.showTabDialog = function(ev) {
      $mdDialog.show({
        controller: LoginController,
        templateUrl: 'app/main/login.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    };

  }

  function LoginController($scope, $mdDialog, $auth, $state, $timeout) {
    $scope.login = function() {
      $auth.login({ email: $scope.login.email, password: $scope.login.password })
      .then(function() {
        complete();
        $scope.redirect_message = true;  
      })
      .catch(function() {

      });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function() {
        $scope.provider = provider;
        complete();
        $scope.redirect_message = true;
      })
      .catch(function() {

      });
    };

    $scope.register_status = 'register'

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
              $scope.register_status = 'success'
            });
      })
      .catch(function(response) {
        $scope.register_status = 'error'
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

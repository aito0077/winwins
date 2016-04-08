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
      $auth.login({ email: $scope.email, password: $scope.password })
      .then(function() {
        complete();      
      })
      .catch(function() {

      });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function() {
        $scope.provider = provider;
        complete();      
      })
      .catch(function() {

      });
    };

    var complete = function() {
      $scope.redirect_message = true;
      $timeout(function() {
        $mdDialog.hide(); 
      }, 2000);
    };

    // $scope.hide = function() {
    //   $mdDialog.hide();
    // };
    // $scope.cancel = function() {
    //   $mdDialog.cancel();
    // };
    // $scope.answer = function(answer) {
    //   $mdDialog.hide(answer);
    // };
  }
})();

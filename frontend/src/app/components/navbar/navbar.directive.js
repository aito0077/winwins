(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $mdSidenav, $rootScope, ENV, $auth, account, $mdDialog, $document) {
      var vm = this;

      vm.imageServer = ENV.imageServer;

      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      var event1 = $rootScope.$on('account_change',function(event){
        if (vm.isAuthenticated) {
          account.getProfile()
          .then(function(data) {
             vm.account = data.profile;
          });
        }
      });

      $rootScope.$broadcast('account_change');

      vm.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.onChange = function(event, state) {
        var es = ENV.availableLangs[0];
        var en =  ENV.availableLangs[1];
        var args = ((state === true)? en : es);
        $rootScope.$emit(event, args);
      };

      vm.logout = function () {
        $auth.logout();
      };

      vm.showLoginDialog = function(ev) {
        $mdDialog.show({
          controller: 'LoginController',
          templateUrl: 'app/login/login.tmpl.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        });
      };
    }
  }

})();

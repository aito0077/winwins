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
    function NavbarController(moment, $mdSidenav, $rootScope, ENV, $auth, account) {
      var vm = this;

      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      if (vm.isAuthenticated) {
        account.getProfile()
        .then(function(data) {
           vm.account = data.profile;
        });
      }

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
    }
  }

})();

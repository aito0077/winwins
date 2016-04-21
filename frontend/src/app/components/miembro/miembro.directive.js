(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeMiembro', acmeMiembro);

  /** @ngInject */
  function acmeMiembro() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/miembro/miembro.html',
      scope: {
        items: '='
      },
      controller: MiembroController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MiembroController(ENV, $mdDialog, $document) {
      var vm = this;
      vm.imageServer = ENV.imageServer;
      
      vm.showLoginDialog = function(ev) {
        $mdDialog.show({
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'app/login/login.tmpl.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        });
      };
    }
  }

})();

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
      controller: ['ENV', MiembroController],
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function MiembroController(ENV) {
      var vm = this;
      vm.imageServer = ENV.imageServer;
    }
  }

})();

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

    function MiembroController() {
      //var vm = this;
    }
  }

})();

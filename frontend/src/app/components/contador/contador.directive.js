(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeContador', acmeContador);

  /** @ngInject */
  function acmeContador() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/contador/contador.html',
      scope: {
        items: '='
      },
      controller: ContadorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function ContadorController() {
      //var vm = this;
    }
  }

})();

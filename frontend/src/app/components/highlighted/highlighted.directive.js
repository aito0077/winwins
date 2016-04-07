(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeHighlighted', acmeHighlighted);

  /** @ngInject */
  function acmeHighlighted() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/highlighted/highlighted.html',
      scope: {
        items: '=',
        title: '=',
        icon: '='
      },
      controller: HighlightedController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function HighlightedController(ENV) {
      var vm = this;

      vm.imageServer = ENV.imageServer;
    }
  }

})();

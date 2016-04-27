(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmePartner', acmePartner);

  /** @ngInject */
  function acmePartner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/partner/partner.html',
      scope: {
        items: '='
      },
      controller: [ 'ENV', PartnerController ],
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function PartnerController(ENV) {
      var vm = this;
      vm.imageServer = ENV.imageServer;
    }
  }

})();

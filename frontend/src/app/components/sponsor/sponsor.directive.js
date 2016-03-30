(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeSponsor', acmeSponsor);

  /** @ngInject */
  function acmeSponsor() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sponsor/sponsor.html',
      scope: {
        items: '='
      },
      controller: SponsorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function SponsorController() {
      //var vm = this;
    }
  }

})();

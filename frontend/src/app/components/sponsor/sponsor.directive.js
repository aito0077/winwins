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
        items: '=',
        url: '@?'
      },
      controller: SponsorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function SponsorController() {
      var vm = this;
      var defaultUrl = '';
      vm.url = angular.isDefined(this.url) ? this.url : defaultUrl;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeFooter', acmeFooter);

  /** @ngInject */
  function acmeFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',
      scope: {
        items: '='
      },
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function FooterController() {
      //var vm = this;
    }
  }

  angular
    .module('winwins')
    .directive('scrollTop', function() {
    return {
      restrict: 'A',
      link: function(scope, $elm) {
        $elm.on('click', function() {
          angular.element("body").animate({scrollTop: angular.element("body").offset().top}, "slow");
        });
      }
    };
  });

})();

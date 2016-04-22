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

    /** @ngInject */
    function FooterController($window) {
      /*var vm = this;
      angular.element($window).bind("scroll", function() {
        vm.items = $window.scrollY > 300;
        vm.$apply();
        console.log(vm);
      });*/
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

  angular
    .module('winwins')
    .directive("scroll", function ($window, $document) {
    return function(scope, element, attrs) {
      angular.element($window).bind("scroll", function() {
        scope.boolChangeClass = this.pageYOffset >= 100 && $document[0].body.scrollHeight - this.pageYOffset - $window.innerHeight >= 260;
        scope.$apply();
      });
    };
  });

})();

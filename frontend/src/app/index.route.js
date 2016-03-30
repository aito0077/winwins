(function() {
  'use strict';

  angular
    .module('winwins')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          sponsors: function(sponsor) {
            return sponsor.getMainList();
          },
          winwins: function(winwin) {
            return winwin.getList();
          },
          miembros: function(miembro) {
            return miembro.getList();
          },
          partners: function(partner) {
            return partner.getList();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();

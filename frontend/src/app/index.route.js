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
        views: {
          'master': {
            templateUrl: 'app/master/master.html',
            containerClass: 'home'
          },
          'content@home': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            resolve: {
              partners: function(partner) {
                return partner.getList();
              }
            }
          }
        }
      })
      .state('home.login',{
        url: 'login',
        views: {
          'content@home': {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();

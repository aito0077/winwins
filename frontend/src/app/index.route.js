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
      .state('home.profile',{
        url: 'profile',
        views: {
          'content@home': {
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
          }
        }
      })
      .state('home.winwin',{
        url: 'winwin/:winwinId',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/winwin.html',
            controller: 'WinwinController',
            controllerAs: 'winwin'
          }
        }
      })
      .state('home.activacion',{
        url: 'activacion',
        views: {
          'content@home': {
            templateUrl: 'app/profile/activacion.html',
            controller: 'ActivacionController',
            controllerAs: 'activacion'
          }
        }
      })
      .state('home.crear-winwin',{
        url: 'crear-winwin',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/crear-winwin.html',
            controller: 'CrearWinwinController',
            controllerAs: 'winwin'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();

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
      });

    $urlRouterProvider.otherwise('/');
  }

})();

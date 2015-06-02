'use strict';

/**
 * @ngdoc overview
 * @name winwinsApp
 * @description
 * # winwinsApp
 *
 * Main module of the application.
 */
angular
  .module('winwinsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');


    $stateProvider.state('main',{
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).state('signUp',{
        url: '/signup',
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
      });
  });

'use strict';

/**
 * @ngdoc overview
 * @name winwinsApp
 * @description
 * # winwinsApp
 *
 * Main module of the application.
 */
angular.module('winwinsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'config',
    'zumba.angular-waypoints'
])
.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    $urlRouterProvider.otherwise('/');


    $stateProvider
    .state('main',{
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .state('signUp',{
        url: '/signup',
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
    })
    .state('winwin',{
        url: '/winwin',
        templateUrl: 'views/winwin.html',
        controller: 'WinwinCtrl'
    })
    /*.state('winwinMenu',{
    url: '/winwinmenu',
    templateUrl: 'views/winwinMenu.html',
    controller: 'WinwinMenuCtrl'
    })*/
    .state('createWW',{
        url: '/createww',
        templateUrl: 'views/createWW.html',
        controller: 'CreateWWCtrl'
    })
    .state('createWWid',{
        url: '/createwwid',
        templateUrl: 'views/createWWid.html',
        controller: 'CreateWWCtrl'
    })
    .state('signIn',{
        url: '/signin',
        templateUrl: 'views/signIn.html',
        controller: 'SignInCtrl'
    })
    .state('activateWW',{
        url: '/activate',
        templateUrl: 'views/activateWW.html',
        controller: 'ActivateWWCtrl'
    })
    .state('promote',{
        url: '/promote',
        templateUrl: 'views/promote.html',
        controller: 'ActivateWWCtrl'
    })
    .state('members',{
        url: '/members',
        templateUrl: 'views/members.html',
        controller: 'MembersCtrl'
    })
    .state('comments',{
        url: '/comments',
        templateUrl: 'views/comments.html',
        controller: 'WinwinCtrl'
    });


    $authProvider.facebook({
        clientId: '1082199191794840',
        scope: 'email,public_profile'
    });

    $authProvider.google({
        clientId: '313110710680-p22p1s5brqn7tfaqj9v16u67bic5smqk.apps.googleusercontent.com'
    });

    $authProvider.yahoo({
        clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
    });

    $authProvider.twitter({
        url: '/auth/twitter'
    });


  });

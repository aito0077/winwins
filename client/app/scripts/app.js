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
    'ngFileUpload',
    'ngSanitize',
    'ngTouch',
    'ngTagsInput',
    'ui.router',
    'ui.select',
    'satellizer',
    'config',
    'infinite-scroll',
    'zumba.angular-waypoints',
    'oitozero.ngSweetAlert',
    'pascalprecht.translate',
    'tmh.dynamicLocale'
])
.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
    .state('main',{
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .state('signUp',{
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl'
    })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
    })
    .state('account',{
        url: '/account',
        templateUrl: 'views/user/account.html',
        controller: 'MainCtrl'
    })
    .state('winwin',{
        url: '/winwin',
        templateUrl: 'views/winwin.html',
        controller: 'WinwinCtrl'
    })
    .state('winwin-new', {
        url: '/winwin-new',
        templateUrl: 'views/winwin/edit.html',
        controller: 'winwin-edit'
    })
    .state('winwin-first-post', {
        url: '/winwin-first-post/:winwinId',
        templateUrl: 'views/winwin/first_post.html',
        controller: 'winwin-first-post'
        
    })
    .state('winwin-list', {
        url: '/winwin-list',
        templateUrl: 'views/winwin/list.html',
        controller: 'winwin-list'
    })
    .state('winwin-search', {
        url: '/winwin-search',
        templateUrl: 'views/winwin/search.html',
        controller: 'winwin-search'
    })
    .state('winwin-view', {
        url: '/winwin-view/:winwinId',
        templateUrl: 'views/winwin/view.html',
        controller: 'winwin-view'
    })
    .state('winwin-view.muro', {
        url: '/winwin-view/:winwinId',
        templateUrl: 'views/winwin/muro.html',
        controller: 'winwin-muro'
    })
    .state('winwin-view.members', {
        url: '/winwin-view/:winwinId',
        templateUrl: 'views/winwin/participantes.html',
        controller: 'winwin-members'
    })
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
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
   .state('success-login',{
        url: '/success-login',
        templateUrl: 'views/login_success.html',
        controller: 'SuccessLogin'
    })
   .state('failure-login',{
        url: '/fail-login',
        templateUrl: 'views/login_failure.html',
        controller: 'FailureLogin'
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
    })
    .state('group-view', {
        url: '/group-view/:groupId',
        templateUrl: 'views/group/view.html',
        controller: 'group-view'
    })
    .state('group-new',{
        url: '/group-new',
        templateUrl: 'views/group/edit.html',
        controller: 'group-edit'
    })
    .state('group-list',{
        url: '/group-list',
        templateUrl: 'views/group/list.html',
        controller: 'group-list'
    })
    .state('sponsor-view', {
        url: '/sponsor-view/:sponsorId',
        templateUrl: 'views/sponsor/view.html',
        controller: 'sponsor-view'
    })
    .state('sponsor-list',{
        url: '/sponsor-list',
        templateUrl: 'views/sponsor/list.html',
        controller: 'sponsor-list'
    });

})
.config(function ($authProvider, api_host) {

    $authProvider.baseUrl = api_host+'/';
    $authProvider.httpInterceptor = true;

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


})
.config(function ($translateProvider, tmhDynamicLocaleProvider) {
    $translateProvider.useMissingTranslationHandlerLog();

    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });

    $translateProvider.preferredLanguage('es_ES');
    $translateProvider.useLocalStorage();
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');

})
.constant('LOCALES', {
    'locales': {
        'es_ES': 'Español',
        'en_US': 'English'
    },
    'preferredLocale': 'es_ES'
})
.controller("Ctrl", function ($scope, $location, $window) {
    $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
        $scope.startPath = $location.path();
        $scope.startNewUrl = newUrl;
        $scope.startOldUrl = oldUrl;
    });
    $scope.$on("$locationChangeSuccess", function (event, newUrl, oldUrl) {
        $scope.successPath = $location.path();
        $scope.successNewUrl = newUrl;
        $scope.successOldUrl = oldUrl;
    });
    $scope.back = function () {
        $window.history.back();
    };
    $scope.forward = function () {
        $window.history.forward();
    };
})
;

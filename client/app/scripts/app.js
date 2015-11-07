'use strict';

angular.module('winwinsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngMessages',
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
//    '720kb.background',
    'headroom',
    '720kb.socialshare',
    'truncate',
    'angular-loading-bar',
    'frapontillo.bootstrap-switch', 
    'tmh.dynamicLocale'
])
.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    //$locationProvider.html5Mode(true);

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
    .state('profile',{
        url: '/profile',
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileCtrl'
    })
    .state('profile_notificaciones',{
        url: '/notificaciones',
        templateUrl: 'views/user/user_notificaciones.html',
        controller: 'ProfileNotificaciones'
    })
    .state('cancel-account',{
        url: '/cancel-account',
        templateUrl: 'views/user/cancel_account.html',
        controller: 'cancel-account'
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
        controller: 'winwin-edit',
        resolve: {
          loginRequired: loginRequired
        }

    })
    .state('winwin-first-post', {
        url: '/winwin-first-post/:winwinId',
        templateUrl: 'views/winwin/first_post.html',
        controller: 'winwin-first-post'
        
    })
    .state('winwin-promote', {
        url: '/winwin-promote/:winwinId',
        templateUrl: 'views/winwin/promote.html',
        controller: 'winwin-promote'
        
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
        templateUrl: 'views/winwin-tabs/view.html',
        controller: 'winwin-tabs'
    })
    .state('_winwin-view', {
        url: '/winwin-view/:winwinId',
        //templateUrl: 'views/winwin/view.html',
        templateUrl: 'views/winwin-view/ww-winwin.html',
        controller: 'winwin-view'
    })
    .state('winwin-sponsored', {
        templateUrl: 'views/winwin-tabs/ww-sponsored.html',
        url: '/winwin-sponsored/:winwinId',
        controller: 'winwin-sponsored'
    })
    .state('group-sponsored', {
        templateUrl: 'views/group/group-sponsored.html',
        url: '/group-sponsored/:groupId',
        controller: 'group-sponsored'
    })
    .state('winwin-muro', {
        templateUrl: 'views/winwin-view/ww-wall.html',
        url: '/winwin-view/:winwinId',
        controller: 'winwin-muro'
    })
    .state('winwin-members', {
        templateUrl: 'views/winwin-view/ww-users.html',
        url: '/winwin-view/:winwinId',
        controller: 'winwin-members'
    })
    .state('winwin-sponsors', {
        templateUrl: 'views/winwin-view/ww-sponsors.html',
        url: '/winwin-view/:winwinId',
        controller: 'winwin-sponsors'
    })
    .state('admin_campanada', {
        templateUrl: 'views/winwin-view/ww-campanada.html',
        url: '/winwin-view/:winwinId',
        controller: 'winwin-campanada'
    })
    .state('winwin-view.admin_configuracion', {
        templateUrl: 'views/winwin/admin_configuracion.html',
        controller: 'winwin-configuracion'
    })
    .state('winwin-view.admin_patrocinio', {
        templateUrl: 'views/winwin/admin_solicitud_patrocinio.html',
        controller: 'winwin-patrocinio'
    })
    .state('winwin-view.admin_miembros', {
        templateUrl: 'views/winwin/admin_participantes.html',
        controller: 'winwin-miembros'
    })
    .state('winwin-view.winwin-sponsor-request', {
        templateUrl: 'views/winwin/admin_solicitud_patrocinio.html',
        controller: 'winwin-sponsor-request'
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
    .state('group-promote', {
        url: '/group-promote/:groupId',
        templateUrl: 'views/group/promote.html',
        controller: 'group-promote'
    })
    .state('group-list',{
        url: '/group-list',
        templateUrl: 'views/group/list.html',
        controller: 'group-list'
    })
    .state('user-view', {
        url: '/user-view/:userId',
        templateUrl: 'views/user/profile.html',
        controller: 'user-view'
    })
    .state('user-list',{
        url: '/user-list',
        templateUrl: 'views/user/list.html',
        controller: 'user-list'
    })
    .state('sponsor-view', {
        url: '/sponsor-view/:sponsorId',
        templateUrl: 'views/sponsor/view.html',
        controller: 'sponsor-view'
    })
    .state('search-list', {
        url: '/search/:query',
        templateUrl: 'views/search/list.html',
        controller: 'search-list'
    })
    .state('sponsor-list',{
        url: '/sponsor-list',
        templateUrl: 'views/sponsor/list.html',
        controller: 'sponsor-list'
    })
    .state('terms',{
        url: '/site/terms',
        templateUrl: 'views/site/terms.html'
    })
    .state('contact',{
        url: '/site/contact',
        templateUrl: 'views/site/contact.html',
        controller: 'contact-controller'
    })
    .state('how',{
        url: '/site/how',
        templateUrl: 'views/site/how.html'
    })
    .state('about',{
        url: '/site/about',
        templateUrl: 'views/site/about.html'
    })
    ;


    function loginRequired($q, $location, $auth, $state) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            console.dir($state);
            $location.path('/signin');
        }
        return deferred.promise;
    }

    
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
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
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
.directive('dynamicBackground', [function dynamicBackgroundDirective() {
  return {
    'restrict': 'A',
    'link': function linkingFunction($scope, element, attrs) {

      $scope.setBg = function manageSetBg() {

       angular.element(element[0]).css({
        'background-color': attrs.backgroundColor,
        'background-repeat': attrs.backgroundRepeat,
        'background-position': attrs.backgroundPosition,
        'background-attachment': attrs.backgroundAttachment,
        'background-origin': attrs.backgroundOrigin,
        'background-clip': attrs.backgroundClip,
        'background': 'linear-gradient( rgba(0, 0, 0, 9), rgba(154, 148, 120, 0.1)),url(' + attrs.backgroundImage + ')',
        'background-size': 'cover',
       });
      };
	  
      $scope.launchDynamicBg = function manageLaunchDynamicBg () {

        if (attrs.backgroundOnEvent) {

          angular.element(element[0]).bind(attrs.backgroundOnEvent, function onBackgroundEvent() {

            $scope.setBg();
          });
        } else {

          $scope.setBg();
        }
      };

      angular.forEach([
        'backgroundImage',
        'backgroundColor',
        'backgroundSize',
        'backgroundPosition',
        'backgroundClip',
        'backgroundAttachment',
        'backgroundOnEvent',
        'backgroundRepeat',
        'backgroundOrigin',
        'background'
        ], function iterator(value) {

        attrs.$observe(value, function onChange(val){

          if (val) {

            $scope.launchDynamicBg();
          }
        });
      });
    }
  };
}])
;

angular.module('wwApp', [
    'ngResource', 
    'ui.router', 
    'mgcrea.ngStrap', 
    'satellizer',
	'birth-day'
])
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
    })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
    })
    .state('winwin-new', {
        url: '/winwin-new',
        templateUrl: 'partials/winwin/edit.html',
        controller: 'winwin-edit'
    })
    .state('winwin-list', {
        url: '/winwin-list',
        templateUrl: 'partials/winwin/list.html',
        controller: 'winwin-list'
    })
    .state('winwin-view', {
        url: '/winwin-view/:winwinId',
        templateUrl: 'partials/winwin/view.html',
        controller: 'winwin-view'
    })
    .state('group-new', {
        url: '/group-new',
        templateUrl: 'partials/group/edit.html',
        controller: 'group-edit'
    })
    .state('group-list', {
        url: '/group-list',
        templateUrl: 'partials/group/list.html',
        controller: 'group-list'
    })
    .state('group-view', {
        url: '/group-view/:groupId',
        templateUrl: 'partials/group/view.html',
        controller: 'group-view'
    })
    .state('user-list', {
        url: '/user-list',
        templateUrl: 'partials/user/list.html',
        controller: 'user-list'
    })
    .state('user-view', {
        url: '/user-view/:userId',
        templateUrl: 'partials/user/view.html',
        controller: 'user-view'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            authenticated: function($q, $location, $auth) {
                var deferred = $q.defer();
                if (!$auth.isAuthenticated()) {
                    $location.path('/login');
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }
        }
    });

    $urlRouterProvider.otherwise('/');

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

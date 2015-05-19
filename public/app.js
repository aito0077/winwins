angular.module('wwApp', ['ngResource', 'ui.router', 'mgcrea.ngStrap', 'satellizer'])
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
        clientId: '603122136500203'
    });

    $authProvider.google({
        clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });

    $authProvider.yahoo({
        clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
    });

    $authProvider.twitter({
        url: '/auth/twitter'
    });
});

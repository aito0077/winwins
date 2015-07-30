(function () {
    'use strict';


    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            var routes, setRoutes;

            routes = [
                'dashboard',
                'notification',
                'users',
                'winwins',
                'translation',
                'parameters',
                'media',
                'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/signin', 'pages/signup'
            ]

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'views/' + route + '.html'
                };
                $stateProvider.state(route, config);
                return $stateProvider;
            };

            routes.forEach(function(route) {
                return setRoutes(route);
            });

            $urlRouterProvider
                .when('/', '/dashboard')
                .otherwise('/dashboard');

        }]
    );

})(); 

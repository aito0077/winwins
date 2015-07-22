'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$http', '$auth', 'Winwin', function($scope, $http, $auth, Winwin) {
    $scope.winwins = [];

    if($auth.isAuthenticated()) {
        Winwin.query(function(data) {
            $scope.winwins = data;
        });
    }

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

}]);

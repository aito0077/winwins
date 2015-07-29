'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$auth', 'WinwinPaginate', function($scope, $auth, WinwinPaginate) {
    $scope.winwins = [];

    if($auth.isAuthenticated()) {
        $scope.winwins = new WinwinPaginate();
    }

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

}]);

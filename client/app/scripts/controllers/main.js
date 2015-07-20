'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$http', 'Winwin', function($scope, $http, Winwin) {
    $scope.winwins = [];

    Winwin.query(function(data) {
        $scope.winwins = data;
    });

}]);

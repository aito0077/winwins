'use strict';

angular.module('winwinsApp')
.controller('search-list', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
    console.dir($stateParams); 
    $scope.hits = [];
    $scope.winwins = [];
    $scope.users = [];
    $scope.sponsors = [];
    $scope.groups = [];

    
    $http.get('/api/ww/search/', {
        params: {
            q: $stateParams.query
        }
    })
    .success(function(data) {
        $scope.hits = data;
        $scope.users = hits['users'] || [];
        $scope.winwins = hits['winwins'] || [];
        $scope.groups = hits['groups'] || [];
        $scope.sponsors = hits['sponsors'] || [];
    })
    .error(function(error) {
        console.log(error);
    });


}]);



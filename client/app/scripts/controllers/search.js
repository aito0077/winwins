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
        $scope.users = data['users'] || [];
        $scope.winwins = data['winwins'] || [];
        $scope.groups = data['groups'] || [];
        $scope.sponsors = data['sponsors'] || [];
    })
    .error(function(error) {
        console.log(error);
    });


}]);



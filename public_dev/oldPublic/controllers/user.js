angular.module('wwApp')
.controller('user-list', ['$scope','$http', 'User', function($scope, $http, User) {
        console.log('User list');

    $scope.users = [];

    var users = User.query(function(data) {
        $scope.users = data;
    });
    
}])
.controller('user-view', ['$scope','$http', '$state', '$stateParams', '$alert', 'User', function($scope, $http, $state, $stateParams, $alert, User) {

    $scope.getUser = function() {
        $scope.user = User.get({
            id: $stateParams.userId
        }, function(data) {

        });
    }

    $scope.getUser();

    $scope.follow = function() {
        $http.get('/api/users/follow/'+$scope.user.id).success(function(data) {
            $alert({
                content: 'You have started follow this User!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
            $scope.getUser();
        })
        .error(function(error) {
            $alert({
                content: error.message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
        });
    };




}]);

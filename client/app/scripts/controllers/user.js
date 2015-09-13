'use strict';

angular.module('winwinsApp')
.controller('user-list', ['$scope', '$state', '$http', '$auth', 'UserPaginate', function($scope, $state, $http, $auth, UserPaginate) {
   
    $scope.users = new UserPaginate();

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.view = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };


    $scope.follow = function(id) {
        $http.get('/api/users/follow/'+id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


 
}])
.controller('user-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'User', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, User) {

    $scope.getUser = function() {
        console.log('User id profile: '+$stateParams.userId);
        $scope.user = User.get({
            id: $stateParams.userId
        }, function(data) {
            $scope.user_detail = data;
        });
    }

    $scope.getUser();

    $scope.follow = function() {
        $http.get('/api/users/follow/'+$scope.user.id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.unfollow = function() {
        $http.get('/api/users/unfollow/'+$scope.user.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getUser();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


}])
.controller('ProfileCtrl', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'User', 'Account', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, User, Account) {

    $scope.getUser = function() {
        Account.getProfile().then(function(response) {
            $scope.account = response.data;

            User.get({
                id: $scope.account.user.id
            }, function(user_data) {
                $scope.user_detail = user_data;
            });

        });

    };

    $scope.getUser();

    $scope.follow = function(id) {
        $http.get('/api/users/follow/'+$scope.account.user.id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };



}]);


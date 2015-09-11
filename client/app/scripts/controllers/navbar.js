angular.module('winwinsApp')
.controller('NavController', function ($scope, $rootScope, $state, $location, $auth, $window, Account) {
    $scope.isCollapsed = true;
    $scope.unreadNotifications = 0;
    $scope.is_logged = false;
    $scope.profile = false;

    $scope.profile_image = 0;

    $scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
    });
    $scope.$on('$stateChangeStart', function(){
        $scope.isCollapsed = true;
        if($auth.isAuthenticated()) {
            Account.getStatus().then(function(response) {
                $scope.unreadNotifications = response.data.notifications_unread || 0;
            });
        } else {
            $scope.unreadNotifications = 0;
        }
    });

    $rootScope.$on('$stateChangeSuccess',function(data, other){
        if(other.name.lastIndexOf('winwin-view.', 0) === 0) {
        } else {
            $("html, body").animate({ scrollTop: 10 }, 200);

        }

    })


    $scope.isAuthenticated = function() {
        var is_authenticated = $auth.isAuthenticated();
        return is_authenticated;
    };


    $scope.fetching_profile = false;

    $scope.getProfile = function() {
        var is_authenticated = $auth.isAuthenticated();
        if(!$scope.fetching_profile && !$scope.profile && is_authenticated) {
            $scope.fetching_profile = true;
            Account.getProfile().then(function(response) {
                $scope.fetching_profile = false;
                $scope.profile = response.data.profile;
            });
        }
        return $scope.profile;
    };

    $scope.do_back = function() {
        $window.history.back();
    };

    $scope.goProfile = function() {
        $state.go('profile');
    };

});

angular.module('winwinsApp')
.controller('NavController', function ($scope, $rootScope, $location, $auth, $window, Account) {
    $scope.isCollapsed = true;
    $scope.unreadNotifications = 0;
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

    $rootScope.$on('$stateChangeSuccess',function(){
        $("html, body").animate({ scrollTop: 0 }, 200);
    })

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.do_back = function() {
        $window.history.back();
    };

});

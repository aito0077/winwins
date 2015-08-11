angular.module('winwinsApp')
.controller('NavController', function ($scope, $location, $auth, $window) {
    $scope.isCollapsed = true;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
    });
    $scope.$on('$stateChangeStart', function(){
        $scope.isCollapsed = true;
    });
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.do_back = function() {
        console.log('do back');
        $window.history.back();
    };

})
;

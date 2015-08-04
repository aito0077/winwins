angular.module('winwinsApp')
.controller('NavbarCtrl', function($scope, $auth, $window) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.do_back = function() {
        console.log('do back');
        $window.history.back();
    };
});

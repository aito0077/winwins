angular.module('winwinsApp')
.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
});

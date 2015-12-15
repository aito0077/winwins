angular.module('winwinsApp')
.controller('LogoutCtrl', function($auth, $rootScope, $state) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout().then(function() {
        $rootScope.$broadcast('is_logged', false);
        $state.go('main');
    });
});

angular.module('winwinsApp')
.controller('LogoutCtrl', function($auth) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout();
});

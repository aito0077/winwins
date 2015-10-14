'use strict';

angular.module('winwinsApp')
.controller('LoginCtrl', function($scope, $rootScope, $auth, $state, $timeout, SweetAlert) {
    $scope.show_login = true;
    $scope.redirect_message = false;

    $scope.login = function() {
        $auth.login({ email: $scope.email, password: $scope.password })
        .then(function(data) {
            $rootScope.currentUser = data;
            $rootScope.$broadcast('is_logged', true);
            /*
            SweetAlert.swal('success_title', 'success_subtitle', 'success', function() {
                $state.go('main');
            });
            */
            console.log('LOGIN');
            $scope.show_login = false;
            $scope.redirect_message = true;
            $timeout(function() {
                console.log('redirect');
                $state.go('main'); 
            }, 5000);

        })
        .catch(function(response) {
            SweetAlert.swal(response.data.message, 'try_again', 'warning', function() {
                $state.go('signin');
            });
        });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            /*
            SweetAlert.swal('success_title', 'success_subtitle', 'success', function() {
                $state.go('main');
            });
            */
        })
        .catch(function(response) {
            SweetAlert.swal(response.data.message, 'try_again', 'warning', function() {
                $state.go('signin');
            });

        });
    };

})
.controller('FailureLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

}])
.controller('SuccessLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
    $timeout(function() {
        $state.go('main');
    }, 3000);
}]);

'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:ForbiddenCtrl
 * @description
 * # ForbiddenCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
.controller('LoginCtrl', function($scope, $rootScope, $auth, $state, SweetAlert) {
    $scope.login = function() {
        console.log('Login!!');
        $auth.login({ email: $scope.email, password: $scope.password })
        .then(function(data) {
            $rootScope.currentUser = data;
            SweetAlert.swal('Genial!', 'Vamos a tu cuenta!', 'success', function() {
                $state.go('main');
            });
            //$state.go('success-login');
                //'You have successfully logged in',
        })
        .catch(function(response) {
            console.dir(response);
            SweetAlert.swal('Pasó algo!', response.data.message, 'warning', function() {
                $state.go('signin');
            });
            //$state.go('failure-login');
                //response.data.message,
        });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            SweetAlert.swal('Genial!', 'Vamos a tu cuenta!', 'success', function() {
                $state.go('main');
            });
            //$state.go('success-login');
                //'You have successfully logged in',
        })
        .catch(function(response) {
            //$state.go('failure-login');
            SweetAlert.swal('Pasó algo!', response.message+'<br/><span class="advertencia">Vuelve a inentar</span>', 'warning', function() {
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

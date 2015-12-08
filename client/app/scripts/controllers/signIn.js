'use strict';

angular.module('winwinsApp')
.controller('LoginCtrl', function($scope, $rootScope, $auth, $state, $timeout) {
    $scope.show_login = true;
    $scope.redirect_message = false;

    $scope.login = function() {
        $auth.login({ email: $scope.email, password: $scope.password })
        .then(function(data) {
            $rootScope.currentUser = data;
            $rootScope.$broadcast('is_logged', true);
            $scope.show_login = false;
            $scope.redirect_message = true;
            $timeout(function() {
                console.log('redirect');
                $state.go('main'); 
            }, 1000);

        })
        .catch(function(response) {
            swal({
                title: "ADVERTENCIA", 
                text: 'El usuario y/o password son incorrectos', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
            $state.go('signIn');
        });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(data) {
            $rootScope.currentUser = data;
            $rootScope.$broadcast('is_logged', true);
            $scope.show_login = false;
            $scope.redirect_message = true;
            $timeout(function() {
                console.log('redirect');
                $state.go('main'); 
            }, 1000);
        })
        .catch(function(response) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error en la autenticación con la red social', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
            $state.go('signin');

        });
    };

})
.controller('FailureLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

}])
.controller('SuccessLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
    $timeout(function() {
        $state.go('main');
    }, 1000);
}]);

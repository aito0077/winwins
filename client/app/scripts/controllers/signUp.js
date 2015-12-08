'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $state, $auth) {

    $scope.signup = function() {
        $auth.signup({
            username: $scope.name,
            email: $scope.email,
            password: $scope.password,
            birthdate: $scope.birthdate,
            name: $scope.name,
            lastname: $scope.lastname,
            language_code: 'ES' //ToDo: Obtener del sitio
        })
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
                text: 'Error en su registracion', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
            $state.go('signUp');
        });
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(data) {
            $rootScope.currentUser = data;
            $state.go('main');
        })
        .catch(function(response) {
            $state.go('failure-login');
            swal({
                title: "ADVERTENCIA", 
                text: 'Error en su autenticación', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


});

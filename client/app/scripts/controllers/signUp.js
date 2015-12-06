'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $auth) {

    $scope.signup = function() {
        $auth.signup({
            username: $scope.name,
            email: $scope.email,
            password: $scope.password,
            birthdate: $scope.birthdate,
            name: $scope.name,
            lastname: $scope.lastname,
            language_code: 'ES' //ToDo: Obtener del sitio
        }).catch(function(response) {
            swal({
                title: "ADVERTENCIA", 
                text: response, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
            $state.go('signup');
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
                text: response, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


});

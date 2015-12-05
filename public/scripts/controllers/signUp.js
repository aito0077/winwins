'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $auth, SweetAlert) {

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
            SweetAlert.swal(response.data.message, 'try_again', 'warning', function() {
                $state.go('signup');
            });
        });
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(data) {
            $rootScope.currentUser = data;
            SweetAlert.swal('success_title', 'success_subtitle', 'success', function() {
                $state.go('main');
            });
        })
        .catch(function(response) {
            $state.go('failure-login');
            SweetAlert.swal(response.data.message, 'try_again', 'warning', function() {
                $state.go('signup');
            });

        });
    };


});

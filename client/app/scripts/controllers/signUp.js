'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $auth, SweetAlert) {

    /*
    $scope.birthdate = new Date();
    $scope.birthdatechange = function(data){ 
        console.dir(data);
        $scope.birthdate = data;
    };
    */

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
            SweetAlert.swal('Pasó algo!', response.message, 'warning', function() {
                $state.go('signup');
            });
        });
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            $rootScope.currentUser = data;
            SweetAlert.swal('Genial!', 'Vamos a tu cuenta!', 'success', function() {
                $state.go('main');
            });
        })
        .catch(function(response) {
            $state.go('failure-login');
            SweetAlert.swal('Pasó algo!', response.message, 'warning', function() {
                $state.go('signup');
            });

        });
    };


});

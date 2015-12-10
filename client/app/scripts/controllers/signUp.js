'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $rootScope, $timeout, $state, $auth) {
    $scope.show_signup = true;
    $scope.redirect_message = false;

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
        .then(function(redata) {
            $auth.login({ email: $scope.email, password: $scope.password })
            .then(function(data) {
                $rootScope.currentUser = data;
                $rootScope.$broadcast('is_logged', true);
                $scope.show_signup = false;
                $scope.redirect_message = true;
                $timeout(function() {
                    if($rootScope.returnState) {
                        switch($rootScope.returnState.state) {
                            case 'ww-join': 
                                $state.go('winwin-view', {
                                    winwinId: $rootScope.returnState.parameters.winwinId,
                                    actionJoin: true
                                }); 
                                break;
                            default:
                                $state.go('main'); 
                        }
                    } else {
                        $state.go('main'); 
                    }
                }, 3000);
            });

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
            $rootScope.$broadcast('is_logged', true);
            $scope.show_signup = false;
            $scope.provider = provider;
            $scope.redirect_message = true;

            $timeout(function() {
                if($rootScope.returnState) {
                    switch($rootScope.returnState.state) {
                        case 'ww-join': 
                            $state.go('winwin-view', {
                                winwinId: $rootScope.returnState.parameters.winwinId,
                                actionJoin: true
                            }); 
                            break;
                        default:
                            $state.go('main'); 
                    }
                } else {
                    $state.go('main'); 
                }
            }, 3000);



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

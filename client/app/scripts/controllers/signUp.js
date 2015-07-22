'use strict';

angular.module('winwinsApp')
.controller('SignUpCtrl', function($scope, $auth) {

    $scope.birthdate = new Date();
    $scope.birthdatechange = function(data){ 
        console.dir(data);
        $scope.birthdate = data;
    };

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
            /*
            if (typeof response.data.message === 'object') {
                angular.forEach(response.data.message, function(message) {
                    $alert({
                        content: message[0],
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
            } else {
                $alert({
                    content: response.data.message,
                    animation: 'fadeZoomFadeDown',
                    type: 'material',
                    duration: 3
                });
            }
            */
        });
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            $state.go('success-login');
                //'You have successfully logged in',
        })
        .catch(function(response) {
                //response.data ? response.data.message : response,
            $state.go('failure-login');
        });
    };


});

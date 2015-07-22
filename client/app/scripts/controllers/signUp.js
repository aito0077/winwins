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

    $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };
});

'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:ForbiddenCtrl
 * @description
 * # ForbiddenCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
.controller('LoginCtrl', function($scope, $auth, $state) {
    $scope.login = function() {
        $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
            $state.go('success-login');
                //'You have successfully logged in',
        })
        .catch(function(response) {
            $state.go('failure-login');
                //response.data.message,
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

})
.controller('FailureLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

}])
.controller('SuccessLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
    $timeout(function() {
        $state.go('main');
    }, 3000);
}]);

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
                if($rootScope.returnState) {
                    switch($rootScope.returnState.state) {
                        case 'ww-join': 
                            var winwinId = $rootScope.returnState.parameters.winwinId;
                            $rootScope.returnState = null;
                            $state.go('winwin-view', {
                                winwinId: winwinId,
                                actionJoin: true
                            }); 
                            break;
                        case 'winwin-new-redirect': 
                            $rootScope.returnState = null;
                            $state.go('winwin-new-redirect'); 
                            break;
                        default:
                            $rootScope.returnState = null;
                            $state.go('main'); 
                    }
                } else {
                    $state.go('main'); 
                }
            }, 3000);

        })
        .catch(function(response) {
            $state.go('signIn');
        });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(data) {
            $rootScope.currentUser = data;
            $rootScope.$broadcast('is_logged', true);
            $scope.show_login = false;
            $scope.provider = provider;
            $scope.redirect_message = true;
            
            $timeout(function() {
                if($rootScope.returnState) {
                    switch($rootScope.returnState.state) {
                        case 'ww-join': 
                            var winwinId = $rootScope.returnState.parameters.winwinId;
                            $rootScope.returnState = null;
                            $state.go('winwin-view', {
                                winwinId: winwinId,
                                actionJoin: true
                            }); 
                            break;
                        case 'winwin-new-redirect': 
                            $rootScope.returnState = null;
                            $state.go('winwin-new-redirect'); 
                            break;
                        default:
                            $rootScope.returnState = null;
                            $state.go('main'); 
                    }
                } else {
                    $state.go('main'); 
                }
            }, 3000);

        })
        .catch(function(response) {
            $state.go('signin');
        });
    };

    $scope.goSignup = function() {
        $state.go('signUp');
    };

})
.controller('FailureLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

}])
.controller('SuccessLogin', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
    $timeout(function() {
        $state.go('main');
    }, 1000);
}]);

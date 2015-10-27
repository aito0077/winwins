(function () {
    'use strict';

    angular.module('app.users')
        .controller('users-list', ['$scope', '$window', '$state', 'User', usersList])
        .controller('users-edit', ['$scope', '$window', '$location', 'User', usersEdit])
        .controller('users-view', ['$scope', '$window', 'User', '$location', '$state', '$stateParams', usersView]);

    function usersList($scope, $window, $state, User) {
        $scope.users = [];

        User.query(function(data) {
            $scope.users = data;
        });

        $scope.view = function(id) {
            console.log('view '+id);
            $state.go('user-view', {
                userId: id
            }); 
        };



    }

    function usersEdit($scope, $window, $location, User) {
        $scope.user = new User({});

        $scope.canSubmit = function() {
            return $scope.user_form.$valid;
        };

        $scope.revert = function() {
            $scope.user = new User({});
        };

        $scope.submitForm = function() {
            $scope.user.$save(function() {
                console.log('guardado');
                $location.url('/slam/users/list');
            }).catch(function(response) {
                console.log('error: '+response);
            });
 



        };
    }

    function usersView($scope, $window, User, $location, $state, $stateParams) {
        $scope.user = {};
        $scope.competitions = [];

        console.log('User view id: '+$stateParams.userId);
        User.get({
            id: $stateParams.userId
        }, function(data) {
            $scope.user = data;
            $scope.competitions = $scope.user.competitions;
        });


        $scope.createCompetition = function() {
            console.log('create competition');
            $state.go('competition-new', {
                userId: $scope.user.id
            }); 
        };

    }


})(); 






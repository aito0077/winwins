'use strict';

angular.module('winwinsApp')
.controller('search-list', ['$scope', '$stateParams', '$state', '$http', '$auth', function($scope, $stateParams, $state, $http, $auth) {
    console.dir($stateParams); 
    $scope.hits = [];
    $scope.winwins = [];
    $scope.users = [];
    $scope.sponsors = [];
    $scope.groups = [];

    
    $http.get('/api/ww/search/', {
        params: {
            q: $stateParams.query
        }
    })
    .success(function(data) {
        $scope.hits = data;
        $scope.users = data['users'] || [];
        $scope.winwins = data['winwins'] || [];
        $scope.groups = data['groups'] || [];
        $scope.sponsors = data['sponsors'] || [];
    })
    .error(function(error) {
        console.log(error);
    });

    $scope.view = function(type, id) {
        console.log('Type: '+type+' - Id: '+id);
        switch(type) {
            case 'winwins':
                $state.go('winwin-view', {
                    winwinId: id
                }); 
                break;
            case 'users':
                $state.go('user-view', {
                    userId: id
                }); 
                break;
            default:
                $state.go('winwin-view', {
                    winwinId: id
                }); 
        }
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get('/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
                $scope.view(winwin_id);

            })
            .error(function(error) {
                swal({
                    title: "ADVERTENCIA", 
                    text: error.message, 
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
        } else {
            $state.go('signIn');
        }
    };



}]);



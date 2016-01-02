'use strict';

angular.module('winwinsApp')
.controller('search-list', ['$scope', '$stateParams', '$state', '$http', '$auth', 'api_host', function($scope, $stateParams, $state, $http, $auth, api_host) {
    console.dir($stateParams); 
    $scope.hits = [];
    $scope.winwins = [];
    $scope.users = [];
    $scope.sponsors = [];
    $scope.groups = [];

    
    $http.get(api_host+'/api/ww/search/', {
        params: {
            q: $stateParams.query,
            winwin: $stateParams.winwin,
            user: $stateParams.user,
            group: $stateParams.group,
            sponsor: $stateParams.sponsor
        }
    })
    .success(function(data) {
        $scope.hits = data;
        $scope.winwins =  $stateParams.winwin ? data['winwins'] || [] : [];
        $scope.users =  $stateParams.user ? data['users'] || [] : [];
        $scope.groups =  $stateParams.group ? data['groups'] || [] : [];
        $scope.sponsors =  $stateParams.sponsor ? data['sponsors'] || [] : [];
    })
    .error(function(error) {
        console.log(error);
    });

    $scope.view = function(type, id) {
        console.log('type: '+type+' - id: '+id);
        switch(type) {
            case 'winwins':
                $state.go('winwin-view', {
                    winwinid: id
                }); 
                break;
            case 'users':
                $state.go('user-view', {
                    userid: id
                }); 
                break;
            default:
                $state.go('winwin-view', {
                    winwinid: id
                }); 
        }
    };

    $scope.join = function(winwin_id) {
        if($auth.isauthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                        animation: false, 
                    closeonconfirm: true 
                });
                $scope.view(winwin_id);

            })
            .error(function(error) {
                swal({
                    title: "advertencia", 
                    text: error.message, 
                    type: "warning",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
            });
        } else {
            $state.go('signin');
        }
    };



}])
.controller('search-list-user', ['$scope', '$stateParams', '$state', '$http', '$auth', 'api_host', function($scope, $stateParams, $state, $http, $auth, api_host) {
    $scope.hits = [];
    $scope.users = [];

    $http.get(api_host+'/api/ww/search/', {
        params: {
            q: $stateParams.query,
            winwin: $stateParams.winwin,
            user: $stateParams.user,
            group: $stateParams.group,
            sponsor: $stateParams.sponsor
        }
    })
    .success(function(data) {
        $scope.hits = data;
        $scope.users =  data['users'];
    })
    .error(function(error) {
        console.log(error);
    });

    $scope.view = function(type, id) {
        $state.go('user-view', {
            userid: id
        }); 
    };

    $scope.join = function(winwin_id) {
        if($auth.isauthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                        animation: false, 
                    closeonconfirm: true 
                });
                $scope.view(winwin_id);

            })
            .error(function(error) {
                swal({
                    title: "advertencia", 
                    text: error.message, 
                    type: "warning",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
            });
        } else {
            $state.go('signin');
        }
    };



}])
;

'use strict';

angular.module('winwinsApp')
.controller('search-list', ['$scope', '$stateParams', '$state', '$http', '$auth', '$timeout', 'api_host', function($scope, $stateParams, $state, $http, $auth, $timeout, api_host) {
    console.dir($stateParams); 
    $scope.hits = [];
    $scope.winwins = [];
    $scope.users = [];
    $scope.sponsors = [];
    $scope.groups = [];
    $scope.show_no_results = false;

    $scope.entities = [];
    
    $scope.fetchGroupped = function() {
        $http.get(api_host+'/api/ww/search/', {
            params: {
                q: $stateParams.query,
                winwin: $stateParams.winwin,
                user: $stateParams.user,
                group: $stateParams.group,
                sponsor: $stateParams.sponsor,
                groupped: true
            }
        })
        .success(function(data) {
            $scope.hits = data;
            if(_.isEmpty($scope.hits)) {
                $scope.show_no_results = true;
            } else {
                $scope.winwins = data['winwins'];
                $scope.users =  $stateParams.user ? data['users'] : [];
                $scope.groups =  $stateParams.group ? data['groups'] : [];
                $scope.sponsors =  $stateParams.sponsor ? data['sponsors'] : [];
            }
            /*
            $scope.winwins =  $stateParams.winwin ? data['winwins'] : [];
            $scope.users =  $stateParams.user ? data['users'] : [];
            $scope.groups =  $stateParams.group ? data['groups'] : [];
            $scope.sponsors =  $stateParams.sponsor ? data['sponsors'] : [];
            */
        })
        .error(function(error) {
            console.log(error);
        });
    };

    $scope.fetch = function() {
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
            if(_.isEmpty($scope.hits)) {
                $scope.show_no_results = true;
            }
            $timeout(function () {
                jQuery('.grid-items').isotope({
                    itemSelector: '.item',
                    masonry: {
                        columnWidth: 380
                    }
                });
            });

        });
    };


    $scope.view = function(type, id) {
        console.log('type: '+type+' - id: '+id);
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

    $scope.fetch();

    $scope.doFilter = function(filter_by) {
        jQuery('.grid-items').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
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

'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$auth', '$http', '$state', 'Winwin', 'api_host', 'es_client', '$uibModal', function($scope, $auth, $http, $state, Winwin, api_host, es_client, $uibModal) {
    $scope.winwins = [];

    Winwin.query(function(data) {
        $scope.winwins = data;
    });

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.goControlPanel = function() {
        $state.go('account'); 
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true,
                }, function() {
                    $scope.view(winwin_id);
                });

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

    $scope.viewProfile = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewSponsor = function(id) {
        $state.go('sponsor-view', {
            sponsorId: id
        }); 
    };


    $scope.view = function(id) {
        console.log('view '+id);
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };


    $scope.openShare = function (winwin_id) {
        $('#socialModal').modal('show');
        console.log('winwin_id: '+winwin_id);
    };

    $scope.getEntities = function(query) {

        console.log('query: '+query);
        /*
        es_client.search({
            index: 'winwins',
            size: 999,
            body: {
                query: { 
                    bool: { 
                        must: [
                            {
                                query_string : {
                                    query : query
                                }
                            }
                        ]
                    },
                },
                aggs: {
                    history: {
                        "date_histogram": {
                            "field": "closing_date",
                            "interval": "day", 
                            "format": "dd-MM-yyyy" 
                        }
                    }
                },
                "sort": { "closing_date": { "order": "desc" }}
            }
        }).then(function(response) {
            console.dir(response);
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
    
        });
        */

    };

    $scope.openSocialModal = function(winwin) {
        $scope.toShare = winwin;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                }
            }
        });
    };

}])
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, toShare) {

  $scope.toShare = toShare;

})
.controller('contact-controller', ['$scope','$auth', '$http', '$state', 'api_host', function($scope, $auth, $http, $state, api_host) {

}]);
